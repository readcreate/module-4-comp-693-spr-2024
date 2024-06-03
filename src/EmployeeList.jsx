import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'
// import EmployeeTable from './employees.jsx'

// In Mod 3 Lec 5, we removed constructor from this EmployeeTable
// component, making it a STATELESS COMPONENT
// in mod 3 lec 7, we rewrite this as a function component since
// that's best for stateless components
// we don't need this.props.employees.map anymore; just props.employees.map
function EmployeeTable (props) {
    const employeeRows = props.employees.map(employee => 
        <EmployeeRow 
            key={employee._id} 
            employee={employee}
            deleteEmployee={props.deleteEmployee} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employeeRows}
            </tbody>
        </table>
    )
}
// above, we added EmployeeRow, which is the component below
// in EmployeeRow, ext is in curly braces which makes it a js expression
// in this case we want ext to be a number and not a string


// EmployeeRow component which is added to EmployeeTable
// We pass in notes as this.props.children instead of calling it notes specifically. It's the child text node
// (or something like that) of the EmployeeRow component in the rendering of the EmployeeTable component. 
// See component view in developer console in chrome by clicking on Components and then clicking on individual
// react components that show up. 
// this is a stateless component so in m3 lec 7 we change it to a function component
function EmployeeRow(props) {
    function onDeleteClick() {
        props.deleteEmployee(props.employee._id)
    }
    return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
            <td><button onClick={onDeleteClick}>DELETE</button></td>
        </tr>
    )
}
// with style we're passing in what would normally be html style code into the td tag



// create component with class syntax, creating a class component
export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData () {
        // const async myFetch = () => fetch('/api/employees') // this is one possible way, but we wont' use it
        console.log('loadData initiated')
        fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            console.log('HERE IS THE DATA')
            console.log(data)
            console.log('Total count of employees:', data.count) // could be data.count or data.employees, since those are the two properties in res.status(200).json({employees, count: employees.length}) in employees.js
            data.employees.forEach(employee => { // convert each date string to a new date object
                employee.dateHired = new Date(employee.dateHired)
            })
            this.setState({ employees: data.employees }) // take all the data and store it in state
        })
        .catch(err => {console.log(err)})
    }
    createEmployee(employee) {
        fetch('/api/employees', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(newEmployee => {
            newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({ employees: newEmployees })
            console.log('Total count of employees:', newEmployees.length)
        })
    }
    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                console.log('Failed to delete employee.')
            } else {
                console.log('Employee deleted, refreshing data...')
                this.loadData()
                console.log('loadData should have run or app should have stopped now.')
            }
        })
    }
    render() { 
        return (
            <React.Fragment>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <hr />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
                <hr />
                <EmployeeAdd createEmployee= {this.createEmployee} />
            </React.Fragment>
        )
    }
}