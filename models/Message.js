const moment = require("moment")

module.exports = function(sequelize, DataTypes){
    const Message = sequelize.define('Message',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            contents : { type: DataTypes.TEXT },
            sender : { type: DataTypes.STRING },
            recipient : { type: DataTypes.STRING }
        }
    );
    return Message;
} 