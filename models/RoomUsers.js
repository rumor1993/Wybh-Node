const moment = require("moment")

module.exports = function(sequelize, DataTypes){
    const RoomUsers = sequelize.define('RoomUsers',
        {
            room_id: {type: DataTypes.STRING },
            user_id: {type: DataTypes.STRING }
        }
    );
    
    return RoomUsers;
} 