// this file defines how any employee data will be kept

import mongoose from 'mongoose'

const EmployeesSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name required']},
    extension: {
        type: Number,
        required: [true, 'Extension required']
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    title: {
        type: String,
        required: [true, 'Title required']
    },
    dateHired: { type: Date, default: Date.now }, // don't need required since have a default
    currentlyEmployed: { // don't need required since have a default
        type: Boolean,
        default: true
    }
})

// export default EmployeesSchema // module 6 lecture 3 version
export default mongoose.model('Employee', EmployeesSchema) // changed in module 6 lecture 4

// export default mongoose.model('TestModule6', EmployeesSchema) // testing for module 6 quiz; when i ran the app with this line included, i found a new 'testmodule6' collection in my mongodb atlas AUTOMATICALLY
