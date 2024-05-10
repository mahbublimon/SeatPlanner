var studentIDs = []; // Array to store student IDs
var studentNames = []; // Array to store student names
var emptySeats = []; // Array to store empty seat indices

function generateSeatPlan() {
    var courseName = document.getElementById("courseName").value;
    var section = document.getElementById("section").value;
    var totalStudents = parseInt(document.getElementById("totalStudents").value);
    var rows = parseInt(document.getElementById("rows").value);
    var columns = parseInt(document.getElementById("columns").value);
    var fileInput = document.getElementById("csvFile");

    // Check if file is selected
    if (fileInput.files.length === 0) {
        alert("Please select a CSV file.");
        return;
    }

    var reader = new FileReader();

    reader.onload = function(event) {
        var csvData = event.target.result;
        var studentData = csvData.split("\n").map(row => row.split(","));

        // Extracting student names and IDs
        studentIDs = [];
        studentNames = [];
        emptySeats = [];
        for (var i = 0; i < studentData.length; i++) {
            if (studentData[i].length >= 2) {
                studentIDs.push(studentData[i][0].trim());
                studentNames.push(studentData[i][1].trim());
            }
        }

        if (studentIDs.length !== totalStudents) {
            alert("Number of students in CSV file does not match the specified total number of students.");
            return;
        }

        shuffleArrays(studentIDs, studentNames); // Shuffle the student IDs and names

        // Generate empty seats
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                emptySeats.push([i, j]);
            }
        }

        // Generate and display seat plan
        generateAndDisplaySeatPlan(rows, columns);
    };

    reader.readAsText(fileInput.files[0]);
}

function generateAndDisplaySeatPlan(rows, columns) {
    // Generating seat plan HTML
    var seatPlanHTML = "<h2>Seat Plan:</h2><table>";
    var k = 0;
    for (var i = 0; i < rows; i++) {
        seatPlanHTML += "<tr>";
        for (var j = 0; j < columns; j++) {
            var seatIndex = i * columns + j;
            var isSeatOccupied = k < studentIDs.length;
            if (isSeatOccupied) {
                var studentID = studentIDs[k];
                var studentName = studentNames[k];
                seatPlanHTML += "<td id='seat_" + seatIndex + "'>" + studentID + "<br>" + studentName + " <button onclick='reseatStudent(" + k + ")'>Reseat</button></td>";
                k++;
            } else {
                if (emptySeats.length > 0) {
                    var emptySeat = emptySeats.shift();
                    seatPlanHTML += "<td class='empty-seat'>" + (seatIndex + 1) + " <button onclick='occupySeat(" + emptySeat[0] + ", " + emptySeat[1] + ")'>Occupy</button></td>";
                } else {
                    seatPlanHTML += "<td></td>"; // Add empty cell
                }
            }
        }
        seatPlanHTML += "</tr>";
    }
    seatPlanHTML += "</table>";

    // Displaying seat plan
    document.getElementById("seatPlanContainer").innerHTML = seatPlanHTML;
}

function occupySeat(row, column) {
    if (studentIDs.length < studentNames.length) return; // All students are already seated

    var seatIndex = row * parseInt(document.getElementById("columns").value) + column;
    var studentID = studentIDs.shift();
    var studentName = studentNames.shift();

    document.getElementById("seat_" + seatIndex).innerHTML = studentID + "<br>" + studentName + " <button onclick='reseatStudent(" + (studentNames.length) + ")'>Reseat</button>";
}

function reseatStudent(index) {
    if (emptySeats.length === 0) {
        alert("No empty seats available to reseat.");
        return;
    }

    var newSeat = emptySeats.shift();
    var newRow = newSeat[0];
    var newColumn = newSeat[1];
    var seatIndex = newRow * parseInt(document.getElementById("columns").value) + newColumn;

    var studentID = studentIDs[index];
    var studentName = studentNames[index];

    document.getElementById("seat_" + seatIndex).innerHTML = studentID + "<br>" + studentName + " <button onclick='reseatStudent(" + index + ")'>Reseat</button>";
}

function isSeatAvailable(row, column) {
    return emptySeats.some(seat => seat[0] === row && seat[1] === column);
}

function shuffleArrays(array1, array2) {
    var currentIndex = array1.length, randomIndex, tempValue1, tempValue2;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        tempValue1 = array1[currentIndex];
        array1[currentIndex] = array1[randomIndex];
        array1[randomIndex] = tempValue1;

        tempValue2 = array2[currentIndex];
        array2[currentIndex] = array2[randomIndex];
        array2[randomIndex] = tempValue2;
    }

    return array1;
}
