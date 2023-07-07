import { IToken, IUser } from "@/types/interfaces";
import axiosClassic from "./axiosClassic";

export const fetchCurrentUser = () => {
    return axiosClassic.get<IUser>(`/user/me`, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})}

export const updateCurrentUser = (name: string, username: string, bio: string, coverImage: string, profileImage:string) => {
    return axiosClassic.patch<IUser>(`/user/me`, {name, username, bio, coverImage, profileImage}, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})}

export const loginUser = (email: string, password: string) => {
    return axiosClassic.post<IToken>('http://localhost:8000/login', { email, password })}

export const registerUser = (email: string, password: string, username: string, name: string) => {
    return axiosClassic.post<IUser>('http://localhost:8000/register', { email, password, username, name })}