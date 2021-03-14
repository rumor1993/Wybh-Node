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

exports.createMessage = ( req , res ) => {
    models.Message.findAll({
        where: { sender: req.body.sender, recipient: req.body.recipient }
    }).then((item) => {
        if ( item.length > 0) {
            req.body.room_id = item[0].room_id
            models.Message.create(req.body).then(() => {
                createUserRooms(req)
            })
        } else {
            models.Message.max("room_id").then((item) => {
                if( !item ) item = 0 
                req.body.room_id = item + 1
                models.Message.create(req.body).then(() => {
                    createUserRooms(req)
                })
            })
        }
    })
}

const findMaxRoomId = async () => {
    let result
    await models.Message.max("room_id").then((item) => {result = item})
    return result;
}

const createUserRooms = () => {
    models.UserRooms.create({
        user_id : req.body.sender,
        room_id : req.body.room_id,
        last_message : req.body.contents,
    })
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
