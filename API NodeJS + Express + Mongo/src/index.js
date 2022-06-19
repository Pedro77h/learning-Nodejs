const express = require("express")
const bodyParser = require("body-parser")


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


require('./controls/authcontroller')(app);
require('./controls/projectcontrol')(app);


app.listen("4030", () => console.log("O servidor esta onlne"))