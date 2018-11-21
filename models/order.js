module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    item: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER
  });

  Order.associate = function (models) {
    Order.belongsTo(models.Reservation, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  return Order;
};
