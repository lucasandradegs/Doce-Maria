require("express-async-errors")

const express = require("express")
const routes = require("./routes")
const AppError = require("./utils/AppError")
const database = require("./database/sqlite")

const app = express()

app.use(express.json())

app.use(routes)

database()

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))