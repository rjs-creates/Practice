import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./routes/workouts.js"

//express app
const app = express()

//configuring environment variables
dotenv.config()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', router)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    //listening for requests on Port
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
})
.catch((err) => console.log(err))

