/* eslint-disable @typescript-eslint/class-name-casing */
export interface userInterface { 
    _id: string | any, 
    name?: string , 
    password?: string | any | Promise<string> , 
    img?: string
}

export interface messageUser extends userInterface {

    lastMessage: string
    dateLastMessage:Date

}