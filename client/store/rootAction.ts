import { getNotificetions, updateNotificetions } from "./notificetions/notificetionsSlice"
import { addPost, getPosts, setCurrentPost, addComment } from "./posts/postSlice"
import { getUserMe, unFollowToUser, followToUser, logOut, loginAction } from "./user/currentUserSlice"
import { getUsers } from "./users/usersSlice"

export const allActions = {
    updateNotificetions,
    loginAction,
    logOut,
    getNotificetions,
    addComment,
    setCurrentPost, 
    getPosts, 
    addPost,
    getUserMe,
    getUsers,
    unFollowToUser,
    followToUser
}