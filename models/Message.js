module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    room_id: { type: DataTypes.INTEGER, primaryKey: true },
    contents: { type: DataTypes.TEXT },
    sender: { type: DataTypes.STRING },
    recipient: { type: DataTypes.STRING },
<<<<<<< HEAD
=======
    read_yn: { type: DataTypes.STRING },
>>>>>>> real-master
  });
  return Message;
};
