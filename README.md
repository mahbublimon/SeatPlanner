# Seat Planner

Seat Planner is a simple web-based application designed to help instructors generate seat plans for their classrooms. It allows instructors to assign seats to students randomly, ensuring a fair and organized seating arrangement.

## Features

- Generate random seat plans for classrooms.
- Upload a CSV file containing student names and IDs.
- Specify the course name, section, total number of students, rows, and columns.
- Automatically assign seats to students randomly.
- Reseat students with the click of a button.
- Prevent cheating by reseating students who attempt to cheat.

## Usage

1. Clone the repository or download the source code.
2. Open the `index.html` file in a web browser.
3. Fill in the required information:
   - Course name
   - Section
   - Total number of students
   - Number of rows and columns in the seating arrangement
   - Upload a CSV file containing student names and IDs
4. Click on the "Generate Seat Plan" button.
5. The seat plan will be displayed, showing the assigned seats for each student.
6. If a student attempts to cheat, click on the "Reseat" button next to their name to assign them a new seat.

## File Format

The CSV file should have the following format:

```
Student ID,Student Name
```

Ensure that the CSV file contains one row per student, with the student ID and name separated by a comma.

## Technologies Used

- HTML
- CSS
- JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
