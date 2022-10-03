import { model, Schema } from "mongoose";


const userSchema = new Schema({
    
    name: {
        type: String , 
        required: true 
    } , 
    email: {
        type: String , 
        unique: true , 
        tolowercase : true , 
        require: true 
    } , 
    password: {
        type: String , 
        require: true 
    } , 
    img: {
        type: String , 
        required: false ,
    }

})


export default model('User' , userSchema )