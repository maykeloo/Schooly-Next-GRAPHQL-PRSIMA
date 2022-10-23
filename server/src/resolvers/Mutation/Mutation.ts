import { post } from "./post";
import { Comment } from "./comment";
import { Auth } from "./auth";

export const Mutation = {
    ...post,
    ...Auth,
    ...Comment,
}