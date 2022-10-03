import { model, Schema } from "mongoose";


const msgSchema = new Schema({
    
    text: {
        type: String , 
        required: true 
    } ,
    img: {
        type: String , 
        required: false ,
    } , 
    creatAt: {
        type: Date , 
        default: Date.now
    }

})


export default model('Msg' , msgSchema )