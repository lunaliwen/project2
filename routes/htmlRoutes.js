var db = require("../models");

var path = require('path');

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Reservation.findAll({}).then(function(dbReservations) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       reservations: dbReservations
  //     });
  //   });
  // });

  app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

  // Load reservation page and pass in an reservation by id
  app.get("/reservations/:id", function(req, res) {
    db.Reservation.findOne({ where: { id: req.params.id } }).then(function(dbReservation) {
      res.render("reservation", {
        reservation: dbReservation
      });
    });
  });

  app.get("/reserve", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservations) {
      res.render("reserve", {
        reservations: dbReservations
      });
    });
  });

  app.get('/menu', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/menu/menu.html"));
  });
  
  app.get('/kitchen', function (req, res){
    res.sendFile(path.join(__dirname, "../public/kitchen/kitchen.html"));
  })

  // May need to be inluded somewhere else:
  
  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
