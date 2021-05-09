const { sequelize } = require("../../models")
const models = require("../../models")
const Message = require("../../models/Message")

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
            await models.Message.create(req.body)
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
            const createData = await models.Message.create(req.body)
        } else {
            let maxData = await models.Message.max("room_id")
            if( !maxData ) maxData = 0 
            req.body.room_id = maxData + 1
            findOrCreateUserRooms(req, res)
            const createData = await models.Message.create(req.body)
        }
    }
}


const findMaxRoomId = async () => {
    let result
    await models.Message.max("room_id").then((item) => {result = item})
    return result;
}

const findOrCreateUserRooms = (req, res, roomId) => {
    models.UserRooms.findOrCreate({
        where : {room_id : req.body.room_id}, defaults: {
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
                models.UserRooms.update({
                    last_message : req.body.contents,
                }, {where: {room_id : req.body.room_id}})
                res.send(rooms)
            }
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