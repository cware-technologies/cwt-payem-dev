const Employees = require('../../models/Employee');

async function getEmployees(req, res, next) {
    Employees.findAll({
    }).then(data => {
        res.status(200).json({
            mesage: 'got employees',
            data: data
        })
    }).catch(err => {
        res.send("Error " + err);
    })
}

async function getEmployee(req, res, next) {
    Employees.findAll({
        where: { row_id: req.params.id }
    }).then(data => {
        res.status(200).json({
            messgae: 'got employee',
            iddd: req.params.id,
            data: data
        })
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function createEmployee(req, res, next) {
    console.log(req.body.data)
    Employees.create(
        req.body.data
    ).then(resp => {
        res.status(200).json({
            messgae: 'Employee was created',
            data: resp
        })
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function updateEmployee(req, res, next) {
    console.log("DAATAAAA", req.body.newData)
    Employees.findOne({
        where: { row_id: req.params.id }
    }).then(employee => {
        if (employee) {
            employee.update(
                req.body.newData
            ).then(employee => {
                console.log("UPDATED DATAAAA", employee)
                res.status(200).json({
                    data: employee,
                    messge: 'employee was updated'
                })
            }).catch(err => {
                console.log("ERRRRRRORRRR ", err)
                res.send("Error " + err)
            })
        }
    })
        .catch(err => {
            console.log("ERRRRRRRR " + err)
            res.send("Error " + err)
        })
}

async function deleteEmployee(req, res, next) {
    Employees.findOne({
        where: { row_id: req.params.id }
    }).then(employee => {
        if (employee) {
            employee.destroy({}).then(employee => {
                res.status(200).json({
                    messgae: 'employee was deleted'
                })
            })
        }
    }).catch(err => {
        res.send("Error " + err)
    })
}

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}