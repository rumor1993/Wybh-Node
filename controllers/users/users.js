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
        const jsonData = { "code": 200, "message": "성공적으로 데이터가 삽입되었습니다"}
        res.send(jsonData)
    }).catch((e) => {
        const jsonData = { "code": "", "message": "회원가입에 실패했습니다"} 
        res.send(jsonData)
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

    models.Users.findByPk(req.params.id).then((user) => {
        userRooms[0].room_user_list = user
        res.send(userRooms)
    }) 

}

exports.deleteUserRooms = (req, res) => {
    models.UserRooms.destroy()
}