import { model, Schema  , Document} from "mongoose";
import bcrypt from "bcrypt";
import { userInterface } from "@src/interface/user.interface";

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface userModel extends  userInterface , Document{}


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


userSchema.pre<userModel>('save' ,  async function(next) {
    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash

    next()
})
export default model('User' , userSchema )