import { IComments, IPost } from "@/types/interfaces";

export interface IPostsState {
    posts: IPost[]
    currentPost: IPost | null
}

export interface IAddCommentAction {
    postId: string
    comment: IComments
}