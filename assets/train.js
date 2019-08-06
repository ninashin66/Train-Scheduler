$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyAxmY6fH5N4ynncReufNRO0s0zJindnOc0",
    authDomain: "train-schedule-18684.firebaseapp.com",
    databaseURL: "https://train-schedule-18684.firebaseio.com",
    storageBucket: "train-schedule-18684.appspot.com"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $(".submit").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var trainTime = moment(
      $("#train-time")
        .val()
        .trim(),
      "HH:mm"
    ).format("X");
    console.log(trainTime);
    var frequency = $("#frequency")
      .val()
      .trim();
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      freq: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
    var nextTrain = "next";

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    // Prettify the employee start
    var nextTrainPretty = moment.unix(trainTime).format("HH:mm a");
    console.log(nextTrainPretty);

    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var nextTrain = moment().diff(moment(empStart, "X"), "months");
    // console.log(nextTraim);

    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrainPretty),
      $("<td>").text(nextTrain)
    );

    // Append the new row to the table
    $("tbody").append(newRow);
  });
});
