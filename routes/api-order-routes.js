var db = require("../models");

module.exports = function (app) {

  // GET route for getting all of the orders
  app.get("/api/orders", function (req, res) {
    db.Order.findAll({})
      .then(function (dbOrder) {
        res.json(dbOrder);
      });
  });

  // POST route for saving a new order. You can create a order using the data on req.body
  app.post("/api/orders", function (req, res) {
    console.log(req.body);
    db.Order.create({
      item: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    })
      .then(function(dbOrder) {
        res.json(dbOrder);
      });
  });

  // DELETE route for deleting orders. You can access the order's id in req.params.id
  app.delete("/api/orders/:id", function (req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbOrder) {
        res.json(dbOrder);
      });
  });

};