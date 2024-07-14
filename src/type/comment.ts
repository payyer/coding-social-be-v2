import { Media } from "./profile"

export interface ICommentInput {
    message: string,
    post_id: string,
    commentParent?: string
}   
export interface ICreateCommentResponse {
    message: string,
    metadata: ICommentItem
}
export interface IGetAllCommentRespone {
    message: string,
    metadata: ICommentItem[]
}

export interface ICommentItem {
    _id: string,
    user_id_create: ICommentItemUser
    post_id: string,
    parent_id: string | null, 
    children: ICommentItem[],
    message: string
}

export interface ICommentItemUser {
    _id: string,
    user_name: string,
    user_avatar: Media
}