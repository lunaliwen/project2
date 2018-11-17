var db = require("../models");

module.exports = function(app) {
  // Get all reservations
  app.get("/api/reservations", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservations) {
      res.json(dbReservations);
    });
  });

  // Create a new reservation
  app.post("/api/reservations", function(req, res) {
    db.Reservation.create(req.body).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });

  // Delete an reservation by id
  app.delete("/api/reservations/:id", function(req, res) {
    db.Reservation.destroy({ where: { id: req.params.id } }).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });
};
