import { IPost } from "@/types/interfaces"
import axiosClassic from "./axiosClassic"

export const fetchPosts = () => {
    return axiosClassic.get<IPost[]>('/posts', { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const fetchPost = (id: string) => {
    return axiosClassic.get<IPost>(`/posts/${id}`, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const createPost = (body: string, image?: string) => {
    return axiosClassic.post<IPost>('/posts', {body, image}, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const updatePost = (id: string, body: string, image?: string) => {
    return axiosClassic.patch<IPost>(`/posts/${id}`, {body, image}, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const deletePost = (id: string) => {
    return axiosClassic.delete<IPost>(`/posts/${id}`, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const likePost = (id: string) => {
    return axiosClassic.put<IPost>(`/posts/likes/${id}`, {}, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const deleteLikePost = (id: string) => {
    return axiosClassic.delete<IPost>(`/posts/likes/${id}`, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}