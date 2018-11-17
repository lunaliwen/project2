var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservations) {
      res.render("index", {
        msg: "Welcome!",
        reservations: dbReservations
      });
    });
  });

  // Load reservation page and pass in an reservation by id
  app.get("/reservations/:id", function(req, res) {
    db.Reservation.findOne({ where: { id: req.params.id } }).then(function(dbReservation) {
      res.render("reservation", {
        reservation: dbReservation
      });
    });
  });

  // May need to be inluded somewhere else:
  
  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
