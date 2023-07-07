import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./currentUser.interface";

const initialState:IUserState = {
    _id: null,
    name: '',
    email: '',
    username: '',
    posts: [],
    comments: [],
    createdAt: '',
    profileImage: '',
    followingIds: [],
    notifications: [],
    followersCount: [],
    loggedIn: false
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        getUserMe: (state, {payload}: PayloadAction<IUserState>) => {
            state._id = payload._id
            state.createdAt = payload.createdAt
            state.email = payload.email
            state.followersCount = payload.followersCount
            state.followingIds = payload.followingIds
            state.name = payload.name
            state.notifications = payload.notifications
            state.posts = payload.posts
            state.username = payload.username
            state.profileImage = payload.profileImage
            state.coverImage = payload.coverImage
        },
        loginAction: (state) => {
            state.loggedIn = true
        },
        followToUser: (state, {payload}: PayloadAction<string>) => {
            state.followingIds = [payload, ...state.followingIds]
        },
        unFollowToUser: (state, {payload}: PayloadAction<string>) => {
            state.followingIds = state.followingIds.filter(id => id !== payload)
        },
        logOut: (state) => {
            state._id = null,
            state.createdAt = '',
            state.email = '',
            state.followersCount = [],
            state.followingIds = [],
            state.name = '',
            state.notifications = [],
            state.posts = [],
            state.username = '',
            state.profileImage = '',
            state.coverImage = ''
        }
    },
})

export const { getUserMe, unFollowToUser, followToUser, logOut, loginAction } = currentUserSlice.actions;
export const { reducer } = currentUserSlice