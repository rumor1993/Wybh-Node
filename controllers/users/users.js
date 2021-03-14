const { includes } = require("../../models")
const models = require("../../models")
const Message = require("../../models/Message")

exports.findUsers = ( _ , res) => {
    models.Users.findAll({
    }).then((users) => {
        res.send(users)
    })
}

exports.findUsersById = ( req , res) => {
    models.Users.findByPk(req.params.id).then((user) => {
        res.send(user);
    }) 
}

exports.createUsers = ( req , res ) => {
    models.Users.create(req.body).then(() => {
        res.send("회원가입에 성공했습니다")
    }).catch((e) => {
        res.send(e)
    })
}

exports.updateUsers = ( req , res ) => {
    models.Users.update(
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
    ).then( (user) => {
        res.send(user);
    });
} 


exports.findMessageByUsersId = ( req , res) => {
    models.Users.findAll({
        where: {id : req.params.id}
    }).then((users) => {
        console.log(users)
        models.Message.findAll({
            where: {recipient : req.params.id}
        }).then((message)=>{
            //users.push(message[0])
            //res.send(users)
            res.send(message)
        })
    })
}