import { Media } from "./profile"

export interface IJobInput {
    formData: FormData
}
export interface IJobCreate {
    name: string, 
    title: string
    avatar: FileList,
    description: string,
    application_deadline: string
}

export interface IGetAllJob {
    message: string,
    metadata: IJobItem[]
}
export interface IJobItem {
    _id: string,
    title: string
    name: string,
    avatar: Media,
    user_id: string,
    description: string,
    application_deadline: string,
}

export interface IGetJobDetail {
    message: string,
    metadata: IJobItem
}