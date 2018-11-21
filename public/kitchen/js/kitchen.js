$(document).ready(function () {
  // Getting references to the name input and author container, as well as the table body

  var reservationList = $("tbody");
  var pendingList = $(".pending");
  var completedList = $(".completed");

  var reservationContainer = $(".reservation-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author

  $(document).on("click", ".delete", handleDeleteButtonPress);
  $(document).on("click", ".complete", toggleComplete);

  // Getting the initial list of Authors
  getReservation();


  // Function for creating a new list row for authors
  function createList(reservationData) {
    var newTr = $("<tr>");
    newTr.data("reservation", reservationData);
    newTr.append("<td class='text-center'>" + reservationData.name + "</td>");
    newTr.append("<td class='text-center'>" + reservationData.id + "</td>");
    newTr.append("<td class='text-center'>" + reservationData.Orders.length + "</td>");
    newTr.append("<td class='text-center'><a href='/api/orders/" + reservationData.id + "'>List of Orders</a></td>");
    newTr.append("<td class='text-center'><button class='delete btn btn-danger'>x</button></td>");
    newTr.append("<td class='text-center'><button class='complete btn btn-primary' value ='" + reservationData.complete + "'>✓</button></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getReservation() {

    $.get("/api/reservations", function (data) {
      var rowsToAddPending = [];
      var rowsToAddCompleted = [];

      for (var i = 0; i < data.length; i++) {
        console.log(data[i].complete)
        if (data[i].complete === false) {
          rowsToAddPending.push(createList(data[i]));

        } else if (data[i].complete === true) {
          rowsToAddCompleted.push(createList(data[i]));
        }

      }

      console.log(rowsToAddCompleted)
      renderPendingReservation(rowsToAddPending);
      renderCompletedReservation(rowsToAddCompleted);

      // console.log(rowsToAdd)

    });
  }

  // A function for rendering the list of authors to the page
  function renderPendingReservation(rows) {
    if (rows.length) {
      console.log(rows);
      pendingList.prepend(rows);
    }
  }

  function renderCompletedReservation(rows) {
    if (rows.length) {
      console.log(rows);
      completedList.prepend(rows);
    }
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("reservation");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/reservations/" + id
    })
      .then(window.location.href = "/kitchen");
  }

  // Toggles Complete
  function toggleComplete(event) {
    event.stopPropagation();
    var reservation = $(this).parent("td").parent("tr").data("reservation");
    reservation.complete = !reservation.complete;
    updateReservation(reservation);
  }


  function updateReservation(reservation) {
    $.ajax({
      method: "PUT",
      url: "/api/reservations",
      data: reservation
    }).then(location.reload());
  }
});
