import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotificetionsState } from "./notificetions.interfaces";
import { INotifications } from "@/types/interfaces";


const initialState:INotificetionsState = {
    notifications: []
}

export const notificetionsSlice = createSlice({
    name: 'notificetions',
    initialState,
    reducers: {
        getNotificetions: (state, {payload}: PayloadAction<INotifications[]>) => {
            state.notifications = payload
        },
        updateNotificetions: (state) => {
            state.notifications.forEach(e => e.wasCheaked = true)
        }
    },
})

export const { getNotificetions, updateNotificetions } = notificetionsSlice.actions;
export const { reducer } = notificetionsSlice