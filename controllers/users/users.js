const { includes } = require("../../models")
const models = require("../../models")
const Message = require("../../models/Message")
const { Op } = require("sequelize");

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
                },
            }
        ],
        // where: {
        //     room_user_list: req.params.id,
        // } 
    })

    res.send(userRooms)
}

exports.deleteUserRooms = (req, res) => {
    models.UserRooms.destroy()
}