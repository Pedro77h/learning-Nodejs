import { messageInterface } from "@src/interface/message.interface";
import { messageUser, userInterface } from "@src/interface/user.interface";

// eslint-disable-next-line @typescript-eslint/class-name-casing
class messageService {

    public getResponseUser(messages: messageInterface[], user: userInterface): messageUser {
        return ({
            _id: user._id,
            name: user.name,
            img: user.img,
            lastMessage:messages[0]?.text || null,
            dateLastMessage:messages[0]?.creatAt || null
        })

    }

    public orderedMessages(userMessage: messageUser[]): messageUser[] {
        return userMessage.sort((a, b) => {
            return (a.dateLastMessage ? 0 : 1) - (b.dateLastMessage ? 0 : 1)
                || -(a.dateLastMessage > b.dateLastMessage)
                || +(a.dateLastMessage < b.dateLastMessage)
        })

    }
}

export default new messageService