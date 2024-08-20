const express = require('express')
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();
const authRoute = require('./routes/authRoute')
const cookie= require('cookie-parser')


const app=express()
const port = process.env.PORT || 8000;
 

app.use(express.json());
app.use(cookie());

const corsOption = {
    origin:"http://localhost:3000",
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['content-type', 'Authorization']
}

app.use(cors(corsOption));

//Routes
app.use('/',authRoute)

async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("connection to the databse established successfully");
    } catch (error) {
        console.error('unable to connect database',error)
    }
}
app.listen(port, async() =>{
    await connectDb();
    console.log(`server listening on ${port}`)
})