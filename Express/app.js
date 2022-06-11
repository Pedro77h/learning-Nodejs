const express = require("express")
const { request } = require("http")
const {randomUUID} = require("crypto")
const { response } = require("express")
const fs = require("fs")

const app = express()
let products = []

fs.readFile("products.json" , "utf-8" , (err , data)=>{
    if(err){
        console.log(err)
    }else{
        products = JSON.parse(data)
    }
})

app.use(express.json())

app.post("/produtos" , (request , response) =>{
    
    const {name , price} = request.body
    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)

        

        productfile()
        return response.json(product)
})

    app.get("/produtos" , (request , response) =>{
        
        return response.json(products)
})

app.get("/produtos/:id" , (request , response)=>{
    const {id} = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})

app.put("/produtos/:id" , (request , response) =>{

    const {id} = request.params
    const { name , price} = request.body

    const productindex = products.findIndex(product => product.id === id)
    products[productindex] = {
        ...products[productindex] ,
        name , 
        price,
    }
    productfile()
    return response.json({
        message: "Produto alterado com sucesso" 
    })

})

app.delete("/produtos/:id" , (request , response) =>{
    const {id} = request.params
    const productindex = products.findIndex(product => product.id === id)

    products.splice(productindex , 1)

    return response.json({
        message: "Produto removido com sucesso"
    })
})

function productfile(){
    fs.writeFile( "products.json", JSON.stringify(products), (err) =>{
        if (err){
            console.log(err)
        }else{
            console.log("produto inserido com sucesso")
        }
    })

}

app.listen(4030 , ()=> console.log("Servidor esta rodando na porta 4030"))


