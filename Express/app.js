const express = require("express")
const { request } = require("http")
const {randomUUID} = require("crypto")

const app = express()
const products = []

app.use(express.json())

app.post("/produtos" , (request , response) =>{
    
    const {name , price} = request.body
    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)

        return response.json(product)
    app.get("/produtos" , (request , response) =>{
        return response.json(products)
    })
})

app.listen(4030 , ()=> console.log("Servidor esta rodando na porta 4030"))

