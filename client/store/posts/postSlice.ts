import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { IAddCommentAction, IPostsState } from "./posts.interface";
import { IComments, IPost } from "@/types/interfaces";

const initialState:IPostsState = {
   posts: [],
   currentPost: null
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: (state, {payload}: PayloadAction<IPost[]>) => {
            state.posts = payload
        },
        setCurrentPost: (state, {payload}: PayloadAction<IPost>) => {
            state.currentPost = payload
        },
        addPost: (state, {payload}: PayloadAction<IPost>) => {
            state.posts = [payload, ...state.posts]
        },
        deletePost: (state, {payload}: PayloadAction<string>) => {
            state.posts = state.posts.filter(i => i._id !== payload)
        },
        addComment: (state, {payload}: PayloadAction<IComments>) => {
            if (state.currentPost?.comments) {
                const stateClone = state.currentPost
                stateClone.comments = [payload ,...stateClone.comments]
                state.currentPost = stateClone
            }
        },
    },
})

export const { getPosts, addPost, setCurrentPost, addComment } = postSlice.actions;
export const { reducer } = postSlice