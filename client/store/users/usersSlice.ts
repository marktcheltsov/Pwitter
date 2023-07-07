import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUsersState } from "./users.interface";
import { IUser } from "@/types/interfaces";

const initialState:IUsersState = {
    users: null,
    isLoading: false
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers(state, {payload}: PayloadAction<IUser[]>) {
            state.users = payload
        }
    },
})

export const { getUsers } = usersSlice.actions;
export const { reducer } = usersSlice