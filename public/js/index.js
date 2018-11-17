// Get references to page elements
var $reservationName = $("#example-name");
var $reservationNumber = $("#example-number");
var $reservationDay = $("#example-day");
var $reservationTime = $("#example-time");
var $submitBtn = $("#submit");
var $reservationList = $("#reservation-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveReservation: function(reservation) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/reservations",
      data: JSON.stringify(reservation)
    });
  },
  getReservations: function() {
    return $.ajax({
      url: "api/reservations",
      type: "GET"
    });
  },
  deleteReservation: function(id) {
    return $.ajax({
      url: "api/reservations/" + id,
      type: "DELETE"
    });
  }
};

// refreshReservations gets new reservations from the db and repopulates the list
var refreshReservations = function() {
  API.getReservations().then(function(data) {
    var $reservations = data.map(function(reservation) {
      var $a = $("<a>")
        .text(reservation.name)
        .attr("href", "/reservations/" + reservation.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": reservation.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $reservationList.empty();
    $reservationList.append($reservations);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var reservation = {
    name: $reservationName.val().trim(),
    number: $reservationNumber.val().trim(),
    day: $reservationDay.val().trim(),
    time: $reservationTime.val().trim()
  };

  console.log(reservation.day, reservation.number);

  if (!reservation.name || !reservation.number) {
    alert("You must enter a name and phone number!");
    return;
  }

  API.saveReservation(reservation).then(function() {
    refreshReservations();
  });

  $reservationName.val("");
  $reservationNumber.val("");
  $reservationDay.val("");
  $reservationTime.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteReservation(idToDelete).then(function() {
    refreshReservations();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$reservationList.on("click", ".delete", handleDeleteBtnClick);
