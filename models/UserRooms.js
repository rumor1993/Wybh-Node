const moment = require("moment")

module.exports = function(sequelize, DataTypes){
    const UserRooms = sequelize.define('UserRooms',
        {
            user_id: {type: DataTypes.STRING },
            room_id: {type: DataTypes.STRING },
            last_message: {type: DataTypes.STRING },
            profile_image: {type: DataTypes.STRING },
            room_user_name: {type: DataTypes.STRING },
            room_user_list: {type: DataTypes.STRING }
        }
    );
    
    return UserRooms;
} 