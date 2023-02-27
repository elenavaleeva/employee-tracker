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
    name varchar(255) NULL,
    primary key (id)
);
create TABLE employee (
    id INT NOT NULL auto_increment,
    title varchar(255) NULL,
    last_name varchar(255) NULL,
    department_id int null,
    primary key (id)
);