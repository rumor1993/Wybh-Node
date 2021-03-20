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
    
    if (isRandom) {
        const randomUser = await models.Users.findAll({
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
            const createData = await models.Message.create(req.body)
            const roomId = createData.room_id
            findOrCreateUserRooms(req, res, roomId)
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
            const createData = await models.Message.create(req.body)
            const roomId = createData.room_id
            findOrCreateUserRooms(req, res, roomId)
        } else {
            let maxData = await models.Message.max("room_id")
            if( !maxData ) maxData = 0 
            req.body.room_id = maxData + 1
            const createData = await models.Message.create(req.body)
            const roomId = createData.room_id
            findOrCreateUserRooms(req, res, roomId)
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
        where : {room_id : roomId}, defaults: {
            user_id : req.body.sender,
            room_id : req.body.room_id,
            last_message : req.body.contents,
            room_user_list : req.body.recipient,    
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
            sex : req.body.price,
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
