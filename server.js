
const inquirer = require('inquirer');

const fs = require('fs');
// const departmentController = require('./controllers/departmentController');
// const employeeController = require('./controllers/employeeController');
// const roleController = require('./controllers/roleController');
// const allController = require('./controllers/allController');

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
            // "Update Employee Manager",
            "Delete Employee",
            "Delete Department",
            "Delete Role",
            "View Total Utilized Budget",

        ],

    })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees(mainMenu);

                    break;
                case "View All Departments":
                    viewAllDepartments(mainMenu);
                    break;
                case "View All Employees by Department":
                    viewAllEmployeesByDepartment(mainMenu);
                    break;
                case "View All Employees by Manager":
                    viewAllEmployeesByManager(mainMenu);
                    break;
                case "Add Employee":
                    addEmployee(mainMenu);
                    break;
                case "Add Department":
                    addDepartment(mainMenu);
                    break;
                case "Add Role":
                    addRole(mainMenu);
                    break;
                case "update Employee Role":
                    promptEmployeeRole(mainMenu);
                    break;
                // case "Update Employee Manager":
                //     updateEmployeeManager(mainMenu);
                //     break;
                case "Delete Employee":
                    promptDelete(mainMenu);
                    break;
                case "Delete Department":
                    deleteDepartment(mainMenu);
                    break;
                case "Delete Role":
                    deleteRole(mainMenu);
                    break;
                case "View Total Utilized Budget":
                    viewTotalUtilizedBudget(mainMenu);
                    break;
                default:
                    console.log("Invalid action");
                    break;
                case "Prompt Add Role":
                    promptAddRole(mainMenu);
                    break;
            }

        });
};

mainMenu();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
});

function viewAllEmployees() {
    console.log("View All Employees");
    const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
 role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'', manager.last_name)
  AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id" `;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("viewEmployees");

    })
}


function viewAllEmployeesByDepartment() {
    console.log("View All Employees by Department");
    const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
 role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',
  manager.last_name)`
        + ` FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id" `;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("viewEmployeesByDepartment");
        const departmentChoices = res.map(({ name }) => ({

        }));

    })
}


function viewAllEmployeesByManager() {
    console.log("View All Employees by Manager");

    inquirer
        .prompt([
            {
                type: "List",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: [
                    "None",
                    "John Doe",
                ]
            }
        ])
        .then((answer) => {
            const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
 role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`
                + ` manager.last_name)`
            connection.query(query, departmentId, function (err, res) {
                console.table("response", res);
                console.log("viewEmployeesByManager");

                mainMenu();

            })
        });
}



function addEmployee() {
    console.log("Add Employee");
    const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
 role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`

    connection.query(query, function (err, res) {
        if (err) throw err;
        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`


        }));

        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's last name?"
            },
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            },

        ]);

        then(function (answer) {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.roleId}", "${answer.manager}")`;
        },
            function (err, res) {
                if (err) throw err;
                console.log(res.inserted + " new employee added");

            })

    });
}




// function deleteEmployee() {
//     console.log("Remove Employee");
//     const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
//  role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`

//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         const deleteEmployee = res.map(({ id, first_name, last_name }) => ({
//             value: id,
//             name: `${first_name} ${last_name}`
//         }));
//         console.table(deleteEmployee);


//     })

// }

function promptDelete() {
    connection.query(query, function (err, res) {
        if (err) throw err;
        const deleteEmployee = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));





        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to delete?",
                    choices: deleteEmployee
                }
            ])
            .then((answer) => {
                const query = `DELETE FROM employee WHERE id = "${answer.employee}"`;
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee deleted");
                    mainMenu();
                })
            });
    })
}


// const employeeChoices = () => {
//     console.log("Update Employee Role");
//     const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
//  role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         const updateEmployee = res.map(({ id, first_name, last_name }) => ({
//             value: id,
//             name: `${first_name} ${last_name}`
//         }));
//     })
// }





// const roleChoices = () => {
//     const query = ` "SELECT role.id, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         const roleChoices = res.map(({ id, title, salary }) => ({
//             value: id,
//             title: `${title}`,
//             salary: `${salary}`
//         }));

//     })

// }



function promptEmployeeRole() {
    const employeeChoices = () => {
        console.log("Update Employee Role");
        const query = ` "SELECT employee.id, employee.first_name, employee.last_name 
     role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`
        connection.query(query, function (err, res) {
            if (err) throw err;
            const updateEmployee = res.map(({ id, first_name, last_name }) => ({
                value: id,
                name: `${first_name} ${last_name}`
            }));
        })
    }

    const roleChoices = () => {
        const query = ` "SELECT role.id, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',`
        connection.query(query, function (err, res) {
            if (err) throw err;
            const roleChoices = res.map(({ id, title, salary }) => ({
                value: id,
                title: `${title}`,
                salary: `${salary}`
            }));

        })

    }
    inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employeeChoices
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roleChoices
            }
        ])
        .then((answer) => {
            const query = `UPDATE employee SET role_id = "${answer.role}" WHERE id = "${answer.employee}"`;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee updated");
                mainMenu();
            })
        });
}



function addRole() {
    console.log("Add Role");
    const query = ` "SELECT employee.id, employee.first_name,
     employee.last_name 
 role.title, department.name AS department,
  role.salary, CONCAT(manager.first_name,'',`

    connection.query(query, function (err, res) {
        if (err) throw err;
        const departmentChoices = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
    })

}


function promptAddRole() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the role's title?"

            },
            {
                type: "input",
                name: "salary",
                message: "What is the role's salary?"
            },
            {
                type: "list",
                name: "departmentId",
                message: "What is the role's department?",
                choices: departmentChoices
            },

        ])
        .then((answer) => {
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.departmentId}")`;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res.inserted + " new role added");
                mainMenu();
            })
        }
        )

};
