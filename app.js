// Initialize Firebase
var config = {
    apiKey: "AIzaSyDk8HkJvYcnIm9IF8s_D3izGGxQ2Dz4maM",
    authDomain: "most-recent-user-ccec9.firebaseapp.com",
    databaseURL: "https://most-recent-user-ccec9.firebaseio.com",
    projectId: "most-recent-user-ccec9",
    storageBucket: "most-recent-user-ccec9.appspot.com",
    messagingSenderId: "238187807489"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// When submit click button pressed
$("#submit").on("click", function () {

    event.preventDefault();
    // Grab user INput
    var name = $("#name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format();
    var minutes = $("#min-input").val().trim();

    // Create var that will be pushed in to database
    var newTrain = {
        tName: name,
        tDestination: destination,
        tTime: time,
        tMinutes: minutes
    };

    // Push data into Firebase
    database.ref().push(newTrain);

    //Clear input values
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
})

//Create Firebase event for adding a child to the database
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var cs = childSnapshot.val();

    //convertions
    var nameFirebase = (cs.tName);
    var destinationFirebase = (cs.tDestination);
    var timeFirebase = (cs.tTime);
    var minutesFirebase = (cs.tMinutes);

    // First Train Time convertion
    var convertedTime = moment(timeFirebase, "HH:mm");
    var timeDif = moment().diff(moment(convertedTime), "minutes");
    var timeApart = (timeDif % minutesFirebase)*(-1);
    var nextTrain = moment().add(timeApart, "minutes");

    // Append to HTML
    $("#trainList").append("<tr><td>" + nameFirebase + "</td><td>" + destinationFirebase + "</td><td>" + minutesFirebase + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + timeApart + "</td></tr>")


})