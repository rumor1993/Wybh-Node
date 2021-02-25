const moment = require("moment")

module.exports = function(sequelize, DataTypes){
    const Users = sequelize.define('Users',
        {
            id: { type: DataTypes.STRING, primaryKey: true },
            name : { type: DataTypes.STRING },
            sex : { type: DataTypes.STRING },
            age : { type: DataTypes.STRING },
            area : { type: DataTypes.STRING }
        }
    );
    
    return Users;
} 