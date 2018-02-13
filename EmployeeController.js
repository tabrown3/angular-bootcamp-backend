var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let employees = [];
let nextId = 0;

// GET ALL Employees
router.get('/employees', function (req, res) {

    res.type('json');
    res.status(200).json(employees);
});

// GET SINGLE Employee
router.get('/employee/:id', function (req, res) {

    const outEmployee = employees.find(u => u.id === +req.params.id);

    if(outEmployee) {

        res.type('json');
        res.status(200).json(outEmployee);
    }
    else {

        res.type('html');
        res.status(404).send('<p>Not found</p>');
    }
});

// CREATE Employee
router.post('/employee', function (req, res) {

    const newEmployee = createEmployee(req.body);

    res.type('json');
    res.status(200).json(newEmployee);
});

// UPDATE Employee
router.put('/employee/:id', function (req, res) {

    const updatedEmployee = updateEmployee(req.params.id, req.body);

    if(updatedEmployee) {

        res.type('json');
        res.status(200).json(updatedEmployee);
    }
    else {
        
        res.type('html');
        res.status(404).send('<p>Not found</p>');
    }
});

router.delete('/employee/:id', function (req, res) {

    const deleteEmployeeIndex = employees.findIndex(u => u.id === +req.params.id);


    if(deleteEmployeeIndex !== -1) {

        const deletedEmployee = employees[deleteEmployeeIndex];
        

        employees.splice(deleteEmployeeIndex, 1);
        res.type('json');
        res.status(200).json(deletedEmployee);
    }
    else {
        res.type('html');
        res.status(404).send('<p>Not found</p>');
    }
});

function createEmployee(employeeConfig) {

    let newEmployee = {};
    
    Object.assign(newEmployee, {
        id: nextId
    }, employeeConfig);

    employees.push(newEmployee);
    nextId++;

    return newEmployee;
}

function updateEmployee(id, employeeConfig) {

    const updateEmployeeIndex = employees.findIndex(u => u.id === +id);

    if(updateEmployeeIndex === -1)
        return null;

    let updatedEmployee = {};
    
    Object.assign(updatedEmployee, employees[updateEmployeeIndex], employeeConfig);

    employees[updateEmployeeIndex] = updatedEmployee;

    return updatedEmployee;
}

module.exports = router;