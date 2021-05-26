const { includes } = require("../../models")
const models = require("../../models")
const Message = require("../../models/Message")
const { Op } = require("sequelize");

/**
 * @api {get} /users 모든 유저 조회
 * @apiName GetUsers
 * @apiGroup User
 *
 *
 * @apiSuccess {String} id 유저 아이디
 * @apiSuccess {String} name 유저 이름 
 * @apiSuccess {String} sex 성별
 * @apiSuccess {String} age  나이
 * @apiSuccess {String} area  지역
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 */

exports.findUsers = ( _ , res) => {
    models.Users.findAll({
    }).then((users) => {
        res.send(users)
    })
}

/**
 * @api {get} /users/:id 특정 유저 조회
 * @apiName GetUsersById
 * @apiGroup User
 *
 * @apiParam {String} id 유저 아이디
 
 * @apiSuccess {String} id 유저 아이디
 * @apiSuccess {String} name 유저 이름 
 * @apiSuccess {String} sex 성별
 * @apiSuccess {String} age  나이
 * @apiSuccess {String} area  지역
 * @apiSuccess {String} createdAt  생성일
 * @apiSuccess {String} updateAt  수정일
 */

exports.findUsersById = ( req , res) => {
    models.Users.findByPk(req.params.id).then((user) => {
        res.send(user);
    }) 
}

/**
 * @api {post} /users 회원가입
 * @apiName CreateUsers
 * @apiGroup User
 *
 * @apiParam {String} id 유저 아이디
 * @apiParam {String} name 유저 이름
 * @apiParam {String} sex 유저 성별
 * @apiParam {String} age 유저 나이
 * @apiParam {String} area 유저 지역
 * @apiParam {String} token 유저 푸시 토큰
 * 
 * @apiSuccess {Number} code 200: 성공
 * @apiSuccess {String} message API Code 내용 
 */

exports.createUsers = ( req , res ) => {
    models.Users.create(req.body).then(() => {
        const jsonData = { "code": 200, "message": "성공적으로 데이터가 삽입되었습니다"}
        res.send(jsonData)
    }).catch((e) => {
        const jsonData = { "code": "", "message": "회원가입에 실패했습니다"} 
        res.send(jsonData)
    })

    if (req.body.token) {
        console.log("토큰이 있음")
        models.Fcm.create({user_id: req.body.id, fcm_id: req.body.token})
    } else {
        console.log("토큰이 없음")
    }
}

exports.updateUsers = ( req , res ) => {
    models.Users.update(
        {
            id : req.body.id,
            name : req.body.name,
            sex : req.body.sex,
            age : req.body.age,
            area : req.body.area
        }, 
        { 
            where : { id: req.params.id } 
        }
    ).then( (user) => {
        res.send(user);
    });
} 

/**
 * @api {get} /users/rooms/:user_id 특정 사용자 채팅방 리스트
 * @apiName GetUserRooms
 * @apiGroup User
 *
 * @apiParam {String} id 유저 아이디
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

exports.findMessageByUsersId = async ( req , res) => {
    let list = []
    const userRooms = await models.UserRooms.findAll({
        include: [
            {
                model: models.Message,
                where: {
                    [Op.or]: [{
                        sender: req.params.id,
                    }, {
                        recipient: req.params.id
                    }],
                }, limit: 1
            }
        ],
        where: {
            [Op.or]: [{
                user_id: req.params.id
            }, {
                room_user_list: req.params.id
            }],
        }
    })

    for (const key in userRooms) {
        if (Object.hasOwnProperty.call(userRooms, key)) {
            const element = userRooms[key];

            if (element.room_user_list = req.params.id) {
                let user_id = element.user_id
                await models.Users.findByPk(user_id).then((user) => {
                    element.room_user_list = user
                }) 
                element.user_id = user_id
            } else {
                await models.Users.findByPk(element.room_user_list).then((user) => {
                    element.room_user_list = user
                }) 
            }

          
        }
    }
    res.send(userRooms)
}

exports.deleteUserRooms = (req, res) => {
    models.UserRooms.destroy()
}