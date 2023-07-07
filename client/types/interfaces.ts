export interface IUser {
    _id: string | null
    name: string
    username: string
    email: string
    image?: string
    bio?: string
    emailVerified?: boolean
    coverImage?: string
    profileImage: string
    createdAt: string
    updatedAt?: string
    followingIds: string[]
    posts: IPost[]
    hasNotification?: boolean
    comments: string[] | IComments[]
    notifications: string[] | IUser[]
    followersCount: string[]
    loggedIn: boolean
}

export interface IComments {
    _id: string
    body: string
    createdAt: string
    updatedAt?: string
    user: IUser
    post: IPost
}

export interface IPost {
    _id: string
    body: string
    createdAt: string
    updatedAt?: string
    user: IUser
    likedIds: string[]
    image: string
    comments: IComments[]
}

export interface INotifications {
    _id: string
    body: string
    createdAt: string
    user: string | IUser
    wasCheaked: boolean
}

export interface IToken {
    jwt: string
}