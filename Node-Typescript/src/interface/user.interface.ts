/* eslint-disable @typescript-eslint/class-name-casing */
export interface userInterface { 
    id: string | any, 
    name?: string , 
    password?: string | any | Promise<string> , 
    img?: string
}