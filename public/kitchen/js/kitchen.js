$(document).ready(function () {
  var pendingList = $(".pending");
  var completedList = $(".completed");
  var orderList = $(".orderList");


  // Adding event listeners to the form to create a new object, and the button to delete
  // an reservation

  $(document).on("click", ".delete", handleDeleteButtonPress);
  $(document).on("click", ".complete", toggleComplete);

  // adding a show event to create new table when modal is open
  $(document).on("click", ".modalLink", getOrders);

  $(document).on("click", ".close", refreshPage);

  // Getting the initial list of reservations
  getReservation();


  // Function for creating a new list row for reservations
  function createList(reservationData) {
    var newTr = $("<tr>");
    newTr.data("reservation", reservationData);
    newTr.append("<td class='text-center'>" + reservationData.name + "</td>");
    newTr.append("<td class='text-center'>" + reservationData.id + "</td>");
    newTr.append("<td class='text-center'>" + reservationData.Orders.length + "</td>");
    newTr.append("<td class='text-center'><a href='#' class='modalLink' data-toggle='modal' data-target='#orderModal' data-backdrop='static' id ='" + reservationData.id + "'>Show Orders</a></td>");
    newTr.append("<td class='text-center'><button class='delete btn btn-danger'>x</button></td>");
    newTr.append("<td class='text-center'><button class='complete btn btn-primary' value ='" + reservationData.complete + "'>✓</button></td>");
    return newTr;
  }

  // Function for retrieving reservations and getting them ready to be rendered to the page
  function getReservation() {

    $.get("/api/reservations", function (data) {
      var rowsToAddPending = [];
      var rowsToAddCompleted = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].complete === false) {
          rowsToAddPending.push(createList(data[i]));

        } else if (data[i].complete === true) {
          rowsToAddCompleted.push(createList(data[i]));
        }

      }

      renderPendingReservation(rowsToAddPending);
      renderCompletedReservation(rowsToAddCompleted);


    });
  }

  // function to create a table for the orders
  function createOrderList(orderData) {
    var newTr = $("<tr>");
    newTr.data("reservation", orderData);
    newTr.append("<td class='text-center'>" + orderData.ReservationId + "</td>");
    newTr.append("<td class='text-center'>" + orderData.item + "</td>");
    newTr.append("<td class='text-center'>" + orderData.quantity + "</td>");
    return newTr;
  }

  // to get data when list of order is clicked and append into the table in the modal
  function getOrders() {

    var listItemData = $(this).attr("id");
    console.log(listItemData)
    var ResvId = listItemData;

    $.get("/api/orders/" + ResvId, function (data) {

      rowsForOrders = [];

      for (var i = 0; i < data.length; i++) {

        rowsForOrders.push(createOrderList(data[i]));
      }

      orderList.prepend(rowsForOrders);

    });

  }

  function refreshPage() {
    location.reload()    
  }


  // A function for rendering the list of reservations to the page
  function renderPendingReservation(rows) {
    if (rows.length) {
      pendingList.prepend(rows);
    }
  }

  function renderCompletedReservation(rows) {
    if (rows.length) {
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

  // Update database when a reservation is completed
  function updateReservation(reservation) {
    $.ajax({
      method: "PUT",
      url: "/api/reservations",
      data: reservation
    }).then(location.reload());
  }
});
