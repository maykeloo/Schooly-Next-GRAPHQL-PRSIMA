import {userLoader} from "../loaders/userLoader";

interface PostParent {
    userId: number;
}

export const Comment = {
    user: (parent: PostParent) => {
        return userLoader.load(parent.userId);
    },
}