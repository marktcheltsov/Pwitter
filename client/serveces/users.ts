import { IUser } from "@/types/interfaces";
import axiosClassic from "./axiosClassic";



export const fetchUsers = () => {
    return axiosClassic.get<IUser[]>('/users', { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const fetchUser = (id: string) => {
    return axiosClassic.get<IUser>(`/users/${id}`, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})
}

export const followUser = (id: string) => {
    return axiosClassic.put<string>(`/users/follow/${id}`, null, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

export const unFollowUser = (id: string) => {
    return axiosClassic.delete<string>(`/users/follow/${id}`, { headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
}})
}