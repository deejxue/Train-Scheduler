// makes sure I'm following strict JS rules
'use strict'

// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

var config = {
    apiKey: "AIzaSyAaOhqvjqtM9vpqRKG46CYlysPYU9Zbj9Q",
    authDomain: "cmon-ride-a-train-88b7d.firebaseapp.com",
    databaseURL: "https://cmon-ride-a-train-88b7d.firebaseio.com",
    projectId: "cmon-ride-a-train-88b7d",
    storageBucket: "cmon-ride-a-train-88b7d.appspot.com",
    messagingSenderId: "470715888928"
  };
  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

	var newName = "";
	var newDestination = "";
	var newFirstTime ;
	var newFrequency = 0;

// Submit button function, prevent default click functions before button clicked
// ...(something is broken, text clears on clicking in textbox :(  )
$("#userForm").on("click", "#add-train", function(event){
	event.preventDefault();
	// Variable holders to retrieve value from form
	newName = $("#train-name-input").val().trim();
	newDestination = $("#destination-input").val().trim();
	newFirstTime = $("#first-train-input").val().trim();
	newFrequency = $("#frequency-input").val().trim();



	// Create a new object for database
	var newTrain = {
		name: newName,
		dest: newDestination,
		first: newFirstTime,
		freq: newFrequency
	}

	// push said values to database
	database.ref().push(newTrain);


	// Clear form fields
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

	// Check via the console to see values being retained in variables
	console.log("newTrain: " + newTrain);
	console.log("Name: " + newTrain.name);
	console.log("Destination: " + newTrain.dest);
	console.log("First Time: " + newTrain.first);
	console.log("Frequency: " + newTrain.freq);



	// return false;
});

// add a new database key value
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	// Add to database using snapshot and child keys/values
	
	console.log("Child Snapshot Value: " + childSnapshot.val());

	var newName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var newFirstTime = childSnapshot.val().first;
	var newFrequency = childSnapshot.val().freq;

	console.log('newFirstTime', newFirstTime)
	console.log("newName: " + newName);
	console.log("newDestination: " + newDestination);
	console.log("newFrequency: " + newFrequency);

	var currentTime = moment();
	console.log(moment(currentTime).format("HH:mm"));

	var firstTimeConverted = moment(newFirstTime, "HH:mm").subtract(1, "days");
	
	// Get the difference between now and the time of the first train
	// by subtracting the current time from the first train time
	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + timeDiff);

	// Time difference
	var difference = timeDiff % newFrequency;
	console.log("Remainder: ", difference);

	// Minutes until the next train calculated by subtracting the differnce from frequency
	var mins = newFrequency - difference;
	console.log("Time Til Train: " + mins);

	// Calculate next train time by adding the current time to the mins difference
	var nextTrainTime = moment().add(mins, "minutes");
	console.log("Next arrival: " + moment(nextTrainTime).format("HH:mm"));

	$("#trainTable > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("HH:mm") + "</td><td>" + mins);

	// database.ref().on("child_added", function(snapshot) {
 //          console.log("this is the snapshot: " + snapshot)

 //      var row = $("<tr>");
 //       row.append("<td>" +  snapshot.val().newName + "</td>")
 //       row.append("<td>" +  snapshot.val().newDestination + "</td>");
 //       row.append("<td>" +  snapshot.val().newFrequency + "</td>");
 //       row.append("<td>" +  snapshot.val().moment(nextTrainTime).format("HH:MM") + "</td>");
 //       row.append("<td>" +  snapshot.val().minsUntilTrain + "</td>");
      
 //       $("#trains").prepend(row);

 		// return false;
	// });
});