/* eslint-disable @typescript-eslint/class-name-casing */
import { messageInterface } from "@src/interface/message.interface";
import { model, Schema } from "mongoose";

interface messageModel extends messageInterface , Document {}


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


export default model<messageModel>('Msg' , msgSchema )