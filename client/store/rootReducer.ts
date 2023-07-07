import { reducer as currentUserReducer } from "./user/currentUserSlice"
import { reducer as usersReducer } from "./users/usersSlice"
import { reducer as postsReducer } from "./posts/postSlice"
import { reducer as notificationsReducer } from "./notificetions/notificetionsSlice"

export const reducers = {
    currentUser: currentUserReducer,
    users: usersReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
}