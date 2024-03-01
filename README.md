
Job Portal Website
This repository contains the code for a simple job portal website with an in-memory array as the data source. The front end is rendered using HTML, CSS, and Bootstrap, utilizing EJS templates. The application follows the Model-View-Controller (MVC) architecture to maintain a clean and organized codebase.

Features
In-Memory Array: The website uses an in-memory array to store job data, allowing for quick and easy testing and development without the need for a database.

EJS Templates: The front end is designed using EJS templates, making it dynamic and easy to update. EJS allows for seamless integration of JavaScript within HTML, enhancing the overall user experience.

Bootstrap for Responsive Design: Bootstrap is incorporated to ensure a responsive and visually appealing design across various devices and screen sizes.

MVC Architecture: The application is structured following the Model-View-Controller architecture. This separation of concerns enhances maintainability and scalability.

Project Structure
views Folder: Contains the EJS templates for rendering the front end.

public Folder: Houses static assets such as CSS files and client-side JavaScript.

controllers Folder: Manages the application logic and handles user inputs.

models Folder: Defines the data models and interacts with the in-memory array.

app.js File: The main entry point of the application where the server is configured and routes are defined.

Getting Started
Clone the repository: git clone https://github.com/your-username/job-portal.git
Navigate to the project directory: cd job-portal
Install dependencies: npm install
Run the application: node app.js
Open your browser and visit http://localhost:3000 to view the job portal website.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow the contribution guidelines.
