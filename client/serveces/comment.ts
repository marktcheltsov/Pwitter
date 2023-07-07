import { IComments } from "@/types/interfaces"
import axiosClassic from "./axiosClassic"

export const fetchComments = (id: string) => {
    return axiosClassic.get<IComments[]>(`/comments/${id}`, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})}

export const createComment = (body: string, id: string) => {
    return axiosClassic.post<IComments>(`/comments/${id}`, {body}, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})}

export const deletePost = (id: string) => {
    return axiosClassic.delete<IComments>(`/comments/${id}`, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}