// install mongoose with  npm i mongoose
// go back to main folder, which is module05 probably, with cd..
import mongoose from 'mongoose'

// mongoose
//     .connect(process.env.DB) // this returns a promise, so we add .then, which accepts callback function to perform when connection successful. we can also access catch to display errors if there is one. 
//     .then(() => console.log('Connected to the database'))
//     .catch((err) => console.log(err))

// above is all we need to connect to database
// now go back to app.js and import connection to db. 
// added to app.js: import {} from './db/connect.js'
// then run npm run dev and see we're successfully connected to database

// better way to write above, since we're working with promises now, we can use async await instead of try/catch:
const connectDB = (url) => { // a function to handle connections now and in future if need to connect to multiple databases
    return mongoose.connect(url)
}

export default connectDB // export to be used within app.js

// now go back to app.js