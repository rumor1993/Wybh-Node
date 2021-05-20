const moment = require("moment")

module.exports = function(sequelize, DataTypes){
    const Fcm = sequelize.define('Fcm',
        {
            user_id: { type: DataTypes.STRING, primaryKey: true},
            fcm_id:  { type: DataTypes.STRING, primaryKey: true }
        }
    );
    return Fcm;
} 