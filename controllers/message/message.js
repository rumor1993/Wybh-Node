const { sequelize } = require("../../models")
const models = require("../../models")
const Message = require("../../models/Message")
const { Op } = require("sequelize");
const fcm = require("../fcm/index")

exports.findMessage = ( _ , res) => {
    models.Message.findAll({
    }).then((message) => {
        res.send(message)
    })
}

exports.findMessageById = ( req , res) => {
    models.Message.findByPk(req.params.id).then((message) => {
        res.send(message);
    }) 
}

exports.findMessageRoomsById = ( req, res) => {
    models.Message.findAll({
        where: {room_id: req.params.id}
    }).then((message) => {
        res.send(message)
    })
}

exports.createMessage = async ( req , res ) => {
    let isRandom = true

    if (req.body.recipient) {
        isRandom = false
    }

    if (!req.body.sender) {
        res.send("보낸사람이 없습니다")
        return false
    } 

    if (!req.body.sex) {
        res.send("성별이 없습니다")
        return false
    }
    
    if (isRandom) {
        const randomUser = await models.Users.findAll({
            where: {sex: req.body.sex},
            order: sequelize.random(),
            limit: 1
        })

        const message = await models.Message.findAll({
            where: {sender: req.body.sender, recipient: randomUser[0].id}
        })

        if (message.length === 0) {
            let maxData = await models.Message.max("room_id")
            if( !maxData ) maxData = 0 
            req.body.room_id = maxData + 1
            req.body.recipient = randomUser[0].id
            findOrCreateUserRooms(req, res)
        } else {
            res.send("이미 채팅방이 있는경우")
            // 이미 채팅방이 있는 사람
        }

    } else {
        const message = await models.Message.findAll({
            where: {sender: req.body.sender, recipient: req.body.recipient}
        })

        if (message.length > 0) {
            req.body.room_id = message[0].room_id
            findOrCreateUserRooms(req, res)
        } else {
            let maxData = await models.Message.max("room_id")
            if( !maxData ) maxData = 0 
            req.body.room_id = maxData + 1
            findOrCreateUserRooms(req, res)
        }
    }
}


const findMaxRoomId = async () => {
    let result
    await models.Message.max("room_id").then((item) => {result = item})
    return result;
}

const findOrCreateUserRooms =  (req, res, roomId) => {
    models.UserRooms.findOrCreate({
        where : {
            [Op.or]: [{
                user_id: req.body.sender, room_user_list: req.body.recipient
            }, {
                room_user_list: req.body.sender, user_id: req.body.recipient
            }],}, defaults: {
            user_id : req.body.sender,
            room_id : req.body.room_id,
            last_message : req.body.contents,
            room_user_list : req.body.recipient,   
            room_user_sex : req.body.sex 
        }
        }).spread((rooms, created) => {
            if (created) {
                res.send(rooms)
            } else {
                req.body.room_id = rooms.room_id
                models.UserRooms.update({
                    last_message : req.body.contents,
                }, {where: {room_id : req.body.room_id}})
                res.send(rooms)
            }
            models.Message.create(req.body).then(() => {
                
                // 토큰수 많큼 For문
                models.Fcm.findAll({
                    where: {user_id: req.body.recipient}
                }).then((data)=> {
                    data.forEach((ele)=>{
                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                            to: ele.fcm_id, 
                            
                            notification: {
                                title: '[별똥별] 쪽지가 왔습니다.', 
                                body: req.body.contents
                            }
                        };

                        fcm.send(message, function(err, response){
                            if (err) {
                                console.log("Something has gone wrong!");
                            } else {
                                console.log("Successfully sent with response: ", response);
                            }
                        });

                    })
                })

               
                    
            })
        }) 
}

exports.messageDelete = (req, res) => {
    models.Message.destroy()
}

exports.messageRoomValidation = ( req, res ) => {
    
}

exports.reandomSendMessage = (req, res) => {
    models.Message.create(req.body)
}

exports.updateMessage = ( req , res ) => {
    models.Message.update(
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
    ).then( (message) => {
        res.send(message);
    });
} 