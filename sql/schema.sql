drop DATABASE if EXISTS employeeDB;
create DATABASE employeeDB;
USE employeeDB;
create TABLE department (
    id INT NOT NULL auto_increment,
    name varchar(255) NULL,
    primary key (id)
);
create TABLE role (
    id INT NOT NULL auto_increment,
    title varchar(255) NULL,
    salary decimal not NULL,
    department_ID INT,
    FOREIGN KEY (department_ID) REFERENCES department(id) ON DELETE CASCADE,
    primary key (id)
);
create TABLE employee (
    id INT NOT NULL auto_increment,
    first_name varchar(255) NULL,
    last_name varchar(255) NULL,
    role_id int null,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
    set null,
        primary key (id)
);