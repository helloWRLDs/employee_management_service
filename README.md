# Employee Management System
## About
Testing REST Api basic CRUD operations with implementation of ReactJS.
## Prerequisites
Before running the application, make sure you have the following installed:
- Java Development Kit (JDK)
- npm and nodeJS
- MySQL Database 
## Setup
1. Open [server](./server/) folder
2. Configure database connection [properties](./server/src/main/resources/) in '.env' file.
3. Install all dependencies using Maven package builder.
4. Run the Spring Boot Application.
5. Navigate to [react-ems](./react-ems/).
6. Install dependecies
    ```bash
    npm install
    ```
7. Start the react application
    ```
    npm start
    ```
8. Check functions in browser [http://localhost:3000](http://localhost:3000/)
## Usage
Visit http://localhost:3000 (or any other port which you set in react .env file) in your browser to access the application. You can perform basic CRUD operations for managing employees:
- View the list of employees and departments.
- Add a new employees and departments.
- Update employee and department details.
- Perform removing of departments and employees.
## Project Structure
- 'server': Spring Boot backend
- 'react-ems': ReactJS frontend with tailwind CSS styles
## Frameworks used:
- Spring Boot
- ReactJS
- TailwindCSS
