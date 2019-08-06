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

    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      freq: frequency
    };

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

  // 3. Create Firebase event
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    var trainPretty = moment.unix(trainTime).format("HH:mm a");
    console.log(trainPretty);

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var timeDiff = moment()
      .subtract(trainTime)
      .format("mm");
    // console.log(timeDiff);
    var remainder = timeDiff % frequency;
    // console.log(remainder);
    var nextTrain = frequency - remainder;
    // console.log(nextTrain);
    var nextTrainTime = moment()
      .add(nextTrain, "minutes")
      .format("hh:mm a");
    console.log(nextTrainTime);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrainTime),
      $("<td>").text(nextTrain)
    );

    // Append the new row to the table
    $("tbody").append(newRow);
  });
});
