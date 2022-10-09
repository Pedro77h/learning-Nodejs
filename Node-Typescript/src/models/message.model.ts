import { model, Schema } from "mongoose";


const msgSchema = new Schema({
    
    text: {
        type: String , 
        required: true 
    } ,
    assignedTo: {
        type: Schema.Types.ObjectId ,
        ref: 'User' , 
        required: true ,
    } , 
    receiver:{
        type: Schema.Types.ObjectId ,
        ref: 'User' ,
        require: true , 
    } , 

    creatAt: {
        type: Date , 
        default: Date.now
    }

})


export default model('Msg' , msgSchema )