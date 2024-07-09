import { Media } from "./profile"

export interface IChatRoomRespone {
    message: string,
    metadata: IChatRoom[]
}

export interface IChatRoom {
    _id: string ,
    members: IChatRoomMember[]
}

export interface IChatRoomMember {
    _id: string,
    user_name: string,
    user_avatar: Media
}

export interface ICreateChatRoomRespone {
    message: string,
    metadata: {
        _id: string,
        members: string[],
    }
}