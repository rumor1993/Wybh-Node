const { sequelize } = require("../../models");
const models = require("../../models");
const Message = require("../../models/Message");
const { Op } = require("sequelize");
const fcm = require("../fcm/index");

/**
 * @api {get} /message 모든 메시지 정보 조회
 * @apiName GetMessages
 * @apiGroup Message
 *
 * @apiSuccess {Number} message_id 메시지 ID.
 * @apiSuccess {Number} room_id  채팅방 ID.
 * @apiSuccess {String} contents 메시지 내용.
 * @apiSuccess {String} sender  송신자
 * @apiSuccess {String} recipient 수신자
 * @apiSuccess {String} createdAt  생성일
 */

exports.findMessage = (_, res) => {
  models.Message.findAll({
    order: [["createdAt", "desc"]],
  }).then((message) => {
    res.send(message);
  });
};

/**
 * @api {get} /message/:id 특정 메시지 조회(ID)
 * @apiName GetMessageById
 * @apiGroup Message
 *
 * @apiParam {Number} id Messages unique ID.
 *
 * @apiSuccess {Number} message_id 메시지 ID.
 * @apiSuccess {Number} room_id  채팅방 ID.
 * @apiSuccess {String} contents 메시지 내용.
 * @apiSuccess {String} sender  송신자
 * @apiSuccess {String} recipient 수신자
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 */

exports.findMessageById = (req, res) => {
  models.Message.findByPk(req.params.id).then((message) => {
    res.send(message);
  });
};

/**
 * @api {get} /message/rooms/:id" 특정 채팅방 메시지 조회 (ROOM_ID)
 * @apiName GetMessageByRoomId
 * @apiGroup Message
 *
 * @apiParam {Number} id Messages Room unique ID.
 *
 * @apiSuccess {Number} message_id 메시지 ID.
 * @apiSuccess {Number} room_id  채팅방 ID.
 * @apiSuccess {String} contents 메시지 내용.
 * @apiSuccess {String} sender  송신자
 * @apiSuccess {String} recipient 수신자
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 */

exports.findMessageRoomsById = (req, res) => {
  models.Message.findAll({
    where: { room_id: req.params.id },
  }).then((message) => {
    res.send(message);
  });
};

/**
 * @api {post} /message 메시지 보내기
 * @apiName createMessage
 * @apiGroup Message
 *
 * @apiParam {String} contents 메시지 내용
 * @apiParam {String} sender 송신자
 * @apiParam {String} recipient 수신자 (값이 없으면 랜덤으로 지정)
 * @apiParam {Number} room_id 채팅방 ID (값이 없으면 랜덤으로 지정)
 * @apiParam {String} sex 성별 (남자,여자).
 *
 * @apiSuccess {String} user_id 사용자 ID.
 * @apiSuccess {Number} room_id  채팅방 ID.
 * @apiSuccess {String} last_message 메시지 내용.
 * @apiSuccess {String} profile_image 프로필 이미지
 * @apiSuccess {String} room_user_name 상대방 이름 ( 삭제 예장 )
 * @apiSuccess {String[]} room_user_list  상대방 정보
 * @apiSuccess {String} room_user_sex  상대방 성별 ( 삭제 예정 )
 * @apiSuccess {String} room_user_list  상대방 정보
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 */

exports.createMessage = async (req, res) => {
  let isRandom = true;

  if (req.body.recipient) {
    isRandom = false;
  }

  if (!req.body.sender) {
    res.send("보낸사람이 없습니다");
    return false;
  }

  if (!req.body.sex) {
    res.send("성별이 없습니다");
    return false;
  }

  if (isRandom) {
    const randomUser = await models.Users.findAll({
      where: { sex: req.body.sex },
      order: sequelize.random(),
      limit: 1,
    });

    const message = await models.Message.findAll({
      where: { sender: req.body.sender, recipient: randomUser[0].id },
    });

    if (message.length === 0) {
      let maxData = await models.Message.max("room_id");
      if (!maxData) maxData = 0;
      req.body.room_id = maxData + 1;
      req.body.recipient = randomUser[0].id;
      findOrCreateUserRooms(req, res);
    } else {
      res.send("이미 채팅방이 있는경우");
      // 이미 채팅방이 있는 사람
    }
  } else {
    const message = await models.Message.findAll({
      where: { sender: req.body.sender, recipient: req.body.recipient },
    });

    if (message.length > 0) {
      req.body.room_id = message[0].room_id;
      findOrCreateUserRooms(req, res);
    } else {
      let maxData = await models.Message.max("room_id");
      if (!maxData) maxData = 0;
      req.body.room_id = maxData + 1;
      findOrCreateUserRooms(req, res);
    }
  }
};

/**
 * @api {POST} /message/:id" 특정 채팅방 메시지 읽음처리 (ROOM_ID)
 * @apiName GetMessageByRoomId
 * @apiGroup Message
 *
 * @apiParam {Number} id Messages Room unique ID.
 *
 * @apiSuccess {Number} message_id 메시지 ID.
 * @apiSuccess {Number} room_id  채팅방 ID.
 * @apiSuccess {String} contents 메시지 내용.
 * @apiSuccess {String} sender  송신자
 * @apiSuccess {String} recipient 수신자
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 * @apiSuccess {String} read_yn  읽음여부 (수신자기준)
 */

exports.readMessage = (req, res) => {
  models.Message.update(
    {
      read_yn: "Y",
    },
    {
      where: { message_id: req.params.id },
    }
  );
};

const findMaxRoomId = async () => {
  let result;
  await models.Message.max("room_id").then((item) => {
    result = item;
  });
  return result;
};

const findOrCreateUserRooms = (req, res, roomId) => {
  models.UserRooms.findOrCreate({
    where: {
      [Op.or]: [
        {
          user_id: req.body.sender,
          room_user_list: req.body.recipient,
        },
        {
          room_user_list: req.body.sender,
          user_id: req.body.recipient,
        },
      ],
    },
    defaults: {
      user_id: req.body.sender,
      room_id: req.body.room_id,
      last_message: req.body.contents,
      room_user_list: req.body.recipient,
      room_user_sex: req.body.sex,
    },
  }).spread((rooms, created) => {
    if (created) {
      res.send(rooms);
    } else {
      req.body.room_id = rooms.room_id;
      models.UserRooms.update(
        {
          last_message: req.body.contents,
        },
        { where: { room_id: req.body.room_id } }
      );
      res.send(rooms);
    }
    models.Message.create(req.body).then(() => {
      // 토큰수 많큼 For문
      models.Fcm.findAll({
        where: { user_id: req.body.recipient },
      }).then((data) => {
        data.forEach((ele) => {
          var message = {
            //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: ele.fcm_id,

            notification: {
              title: "[별똥별] 쪽지가 왔습니다.",
              body: req.body.contents,
            },
          };

          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!");
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
        });
      });
    });
  });
};

exports.messageDelete = (req, res) => {
  models.Message.destroy();
};

exports.messageRoomValidation = (req, res) => {};

exports.reandomSendMessage = (req, res) => {
  models.Message.create(req.body);
};

exports.updateMessage = (req, res) => {
  models.Message.update(
    {
      id: req.body.id,
      name: req.body.name,
      sex: req.body.sex,
      age: req.body.age,
      area: req.body.area,
    },
    {
      where: { id: req.params.id },
    }
  ).then((message) => {
    res.send(message);
  });
};
