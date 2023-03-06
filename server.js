
const inquirer = require('inquirer');

const fs = require('fs');
const departmentController = require('./controllers/departmentController');
const employeeController = require('./controllers/employeeController');
const roleController = require('./controllers/roleController');
const allController = require('./controllers/allController');

const mainMenu = async () => {
    console.log("Welcome to the Employee Tracker!");

    await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Employees by Department",
            " View All Employees by Manager",
            "Add Employee",
            "Add Department",
            "Add Role",
            "update Employee Role",
            "Update Employee Manager",
            "Delete Employee",
            "Delete Department",
            "Delete Role",
            "View Total Utilized Budget",

        ],

    })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    allController.viewAllEmployees(mainMenu);

                    break;
                case "View All Departments":
                    allController.viewAllDepartments(mainMenu);
                    break;
                case "View All Employees by Department":
                    departmentController.viewAllEmployeesByDepartment(mainMenu);
                    break;
                case "View All Employees by Manager":
                    employeeController.viewAllEmployeesByManager(mainMenu);
                    break;
                case "Add Employee":
                    employeeController.addEmployee(mainMenu);
                    break;
                case "Add Department":
                    departmentController.addDepartment(mainMenu);
                    break;
                case "Add Role":
                    roleController.addRole(mainMenu);
                    break;
                case "update Employee Role":
                    employeeController.updateEmployeeRole(mainMenu);
                    break;
                case "Update Employee Manager":
                    employeeController.updateEmployeeManager(mainMenu);
                    break;
                case "Delete Employee":
                    employeeController.deleteEmployee(mainMenu);
                    break;
                case "Delete Department":
                    departmentController.deleteDepartment(mainMenu);
                    break;
                case "Delete Role":
                    roleController.deleteRole(mainMenu);
                    break;
                case "View Total Utilized Budget":
                    allController.viewTotalUtilizedBudget(mainMenu);
                    break;
                default:
                    console.log("Invalid action");
                    break;
            }

        });
};

mainMenu();