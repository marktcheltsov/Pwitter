import { INotifications } from "@/types/interfaces"
import axiosClassic from "./axiosClassic"

export const fetchNotifications = () => {
    return axiosClassic.get<INotifications[]>('/notifications', { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export const updateNotifications = () => {
    return axiosClassic.patch<INotifications[]>('/notifications', {}, { headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}