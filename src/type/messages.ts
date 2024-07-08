export interface IMessagesRespone {
    message: string,
    metadata: IMessage[]
}

export interface IMessage {
    _id :string,
    senderId: string,
    text:string
}

export interface ICreateMessage {
    chatRoomId: string,
    text:string,
    file: FileList
}
