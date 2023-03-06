-- SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO department (name)
VALUES ("sales");
INSERT INTO department (name)
VALUES ("engineering");
INSERT INTO department (name)
VALUES ("finance");
INSERT INTO department (name)
VALUES ("legal");
INSERT INTO role (title, salary, department_id)
values ("sales lead", 10000, 1);
INSERT INTO role (title, salary, department_id)
values ("lead engineer", 10500, 2);
INSERT INTO role (title, salary, department_id)
values ("software ingineer", 10200, 3);
INSERT INTO role (title, salary, department_id)
values ("legal team", 10700, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Roy", "ley", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Joe", "Doe", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("John", "Lenoh", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Paul", "Smith", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Daniel", "Garner", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Irina", "Smith", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Elena", "Valev", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Ross", "King", 8, 3);