const express = require("express")
const bodyParser = require("body-parser")


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


require('./app/controls/index')(app);



app.listen("4030", () => console.log("O servidor esta onlne"))