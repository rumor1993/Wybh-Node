const models = require("../../models")

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
    models.Message.create(req.body).then(() => {
        res.send("메시지를 성공적으로 보냈습니다")
    }).catch((e) => {
        res.send(e)
    })
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
