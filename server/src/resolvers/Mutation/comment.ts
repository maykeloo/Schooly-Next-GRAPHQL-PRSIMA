import {Context} from "../../index";

interface Comment {
    comment: {
        content: string,
        postId: string,
        userId: string
    }
}

export const Comment = {
    commentCreate: async (_: any, { comment }: Comment, { prisma }: Context) => {
        const { content, postId, userId } = comment
        if(!content) {
            return {
                comment: null,
                userErrors: [
                    {
                        message: "No content text."
                    }
                ]
            }
        }

        if(!postId) {
            return {
                comment: null,
                userErrors: [
                    {
                        message: "Post not found."
                    }
                ]
            }
        }

        if(!userId) {
            return {
                comment: null,
                userErrors: [
                    {
                        message: "User not found."
                    }
                ]
            }
        }
        const commentPayload = await prisma.comment.create({
            data: {
                content: content,
                postId: Number(postId),
                userId: Number(userId)
            }
        })

        return {
            comment: commentPayload,
            userErrors: []
        }
    }
}