require("dotenv").config()
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB= require('./db/connect.js')

const productsRouter = require('./routes/products.js')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


app.use(express.json())


//routes

app.get('/', (req,res)=>{
    res.send('<h1>Store Api</h1><a href="api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter )


//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)



const port = process.env.PORT || 3000

console.log(port)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()