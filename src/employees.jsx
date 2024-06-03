// This is Anshul Kumar's Module 4 assignment
// for Comp 693 at SDCCE in spring 2024


import React from 'react'
// import ReactDOM from 'react-dom'
import EmployeeList from './EmployeeList.jsx'
// import EmployeeAdd from './EmployeeAdd.jsx'
// import EmployeeFilter from './EmployeeFilter.jsx'

/////////////////////////////////////////////////////////
////////////// NOTE ON POSSIBLE ERROR ///////////////////
/////////////////////////////////////////////////////////
// IF WE GET A REACT ERROR IN THE ERRORS SECTION OF THE CONSOLE,
// IT MIGHT BE DUE TO ReactDom.render below being problematic on
// specific builds/machines. Here's how to fix it:

// run this:
import { createRoot } from 'react-dom/client'

// no longer run this:
// import ReactDOM from 'react-dom'

// new render:
const root = createRoot(document.getElementById('content'))
root.render(
    <React.StrictMode>
        <EmployeeList/>
    </React.StrictMode>    
) 

/////////////////////////////////////////////////////////
////////// END OF NOTE ON POSSIBLE ERROR ////////////////
/////////////////////////////////////////////////////////



// render EmployeeList and put it in 'content' in index.html
// ReactDOM.render(
//     <React.StrictMode>
//         <EmployeeList/>
//     </React.StrictMode>,
//     document.getElementById('content')
// ) 
