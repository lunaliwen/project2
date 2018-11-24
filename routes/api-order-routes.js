var db = require("../models");

module.exports = function (app) {

  // GET route for getting all of the orders
  app.get("/api/orders", function (req, res) {
    db.Order.findAll({})
      .then(function (dbOrder) {
        res.json(dbOrder);
      });
  });

  app.get("/api/orders/:ResvId", function (req, res) {
    db.Order.findAll({
      where: {
        ReservationId: req.params.ResvId
      }
    })
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
      quantity: req.body.quantity,
      ReservationId: req.body.ReservationId
    })
      .then(function (dbOrder) {
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
      .then(function (dbOrder) {
        res.json(dbOrder);
      });
  });

  // Update route to change when an order is completed
  app.put("/api/orders/", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Reservation.update({
      complete: req.body.complete
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbReservation) {
        res.json(dbReservation);
      });
  });
};