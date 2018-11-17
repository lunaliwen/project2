module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING
  });
  return Reservation;
};
