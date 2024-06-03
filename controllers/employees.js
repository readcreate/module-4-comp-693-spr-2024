// don't need to import express. this is pure js code. 

// we'll make 5 functions to handle all CRUDs

// added in module 6 lec 4:
import Employee from '../models/Employee.js' 
// initially, this only worked with lowercase E, but file is uppercase E , Employees.js
// after restart vscode and close/open folder, it works with capital E

// below is all from mod 4 i think: 

// mod 4 version
// const getAllEmployees = (req, res) => {
//     res.send('Get all employees')
// }

// mod 6 version (see modification in comments from mod 7)
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}) // finds everything
        // res.render('index', { 
        //     title: 'Home', 
        //     employees,
        //     message: req.flash('message') // added mod 7 lec 9
        // }) // added in mod 7 lec 6 (moved from app.js)
        res.status(200).json({employees, count: employees.length}) // another possible return - returns all employees and also count of employees
        // res.status(200).json({employee}) // returns everything; commented out in mod 7 lec 6
        //     res.send('Get all employees')
    } catch (err) {
        res.status(500).json({msg: err})
    }
}

// mod 4 version
// const getEmployee = (req, res) => {
//     res.send('Get a single employee')
// }

// mod 6 version
const getEmployee = async (req, res) => {
    try {
        // let id = req.params // didn't work so we do below. id is too generic, Prof Ruvalcaba reckons in the lecture video
        let {id:employeeId} = req.params // employeeId is an alias for id; we need to assign id to help us find the employee
        const employee = await Employee.findOne({ _id: employeeId })
        if (!employee) { // if employee is not null
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({ employee })
    } catch (err) {
        res.status(500).json({msg:err})
    }
}

// const createEmployee = (req, res) => {
//     res.send('Create a new employee')
// }

// new version in module 6 lec 7 initially:
// const createEmployee = async (req, res) => {
//     const employee = await Employee.create(req.body) // create function does the work for us
//     // as long as json data from body has name, ext, title, email, and it's valid, it'll be created/inserted in mongodb collection for this schema
//     res.status(201).json({employee}) // 201 means success
// }

// const createEmployeeView = async (req,res) => ( // added in mod 7 lec 7
//     res.render('add', { 
//         title: 'Add Employee',
//         message: req.flash('message') // added in mod 7 lec 8
//     })
// )

// new version in module 6 lec 7 at the end, added try-catch block:
// we can add try-catch since we have async function
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ employee })
        // res.status(201).json({ msg: 'Employee added successfully' })
        // res.send('Create a new employee')
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}


// mod 4 version
// const updateEmployee = (req, res) => {
//     res.send('Update an existing employee')
// }

// const updateEmployeeView = async (req,res) => {
//     try {
//         let {id:employeeId} = req.params
//         const employee = await Employee.findOne({ _id: employeeId })
//         if (!employee) {
//             return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
//         }
//         res.render('update', {
//             title: 'Update Employee',
//             employee,
//             message: req.flash('message')
//         })
//         // res.status(200).json({ employee }) // eventually we'd want to make an error message for this 
//     } catch (err) {
//         res.status(500).json({msg:err})
//     }
// }

// mod 6 version
const updateEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params
        const employee = await Employee.findOneAndUpdate({_id:employeeId}, req.body, {
            new: true,
            runValidators: true
        }) // find an employee in first parameter, then new update information in req.body. third paramater: new=true returns newly updated object. if we didn't set new=true, we'll update the record but it won't return teh updated document as an object back to our application. runvalidators=true means run all the validators from our schema. 
        if (!employee) {
            return res.status(404).json({ msg: `No employee with id ${employeeId} found`})
        }
        res.status(200).json({msg:'Successfully updated employee'}) // commented out on mod 7 lec 10
        res.flash('message', 'Successfully updated employee')
        res.redirect('/update/', employeeId)
    } catch (err) {
        res.status(500).json({msg:err})
    }
}

// mod 4 version
// const deleteEmployee = (req, res) => {
//     res.send('Delete an employee')
// }

// mod 6 version
const deleteEmployee = async (req, res) => {
    try {
        // let id = req.params // didn't work so we do below. id is too generic, Prof Ruvalcaba reckons in the lecture video
        let {id:employeeId} = req.params // employeeId is an alias for id; we need to assign id to help us find the employee
        const employee = await Employee.findOneAndDelete({ _id: employeeId })
        if (!employee) { // if employee is not null
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({ msg: 'Employee successfully deleted' }) // remove in mod 7 lec 9
        req.flash ('message', 'Employee successfully deleted')
        res.redirect('/')
    } catch (err) {
        res.status(500).json({msg:err})
    }
}

// now need to export all these functions individually from this controller, instead of doing export default
// it'd be easier to export if all functions were in a single class. but we need to export them all individually since they're separate functions

export {
    getAllEmployees,
    getEmployee,
    // createEmployeeView, // added in mod 7 lec 7
    createEmployee,
    // updateEmployeeView, // added in mod 7 lec 10
    updateEmployee,
    deleteEmployee
}