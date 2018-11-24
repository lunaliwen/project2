var db = require("../models");

module.exports = function (app) {
  // Get all reservations
  app.get("/api/reservations", function (req, res) {
    db.Reservation.findAll({
      include: [db.Order]
    }).then(function (dbReservations) {
      res.json(dbReservations);
    });
  });

  // Create a new reservation
  app.post("/api/reservations", function (req, res) {
    db.Reservation.create(req.body).then(function (dbReservation) {
      res.json(dbReservation);
    });
  });

  // Delete an reservation by id
  app.delete("/api/reservations/:id", function (req, res) {
    db.Reservation.destroy({ where: { id: req.params.id } }).then(function (dbReservation) {
      res.json(dbReservation);
    });
  });

  // Update route to change when a reservation is completed
  app.put("/api/reservations/", function (req, res) {
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
