/* eslint-disable @typescript-eslint/class-name-casing */
import { messageInterface } from "@src/interface/message.interface";
import { Document, DocumentQuery, Model, model, Query, Schema,  } from "mongoose"


interface messageModel extends messageInterface, Document { }

interface messageStatic extends Model<messageModel> {
    searchChat(idUserLogged: string, idUserChat: string): DocumentQuery<messageModel[] , messageModel>
}


const msgSchema = new Schema({

    text: {
        type: String,
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    creatAt: {
        type: Date,
        default: Date.now
    }

})


msgSchema.statics.searchChat = function (idUserLogged: string, idUserChat: string): DocumentQuery<messageModel[] , messageModel> {
    return this.find({
        $or: [
            { $and: [{ user: idUserLogged }, { receiver: idUserChat }] },
            { $and: [{ user: idUserChat }, { receiver: idUserLogged }] }
        ]
    })
}

export default model<messageModel, messageStatic>('msg', msgSchema)