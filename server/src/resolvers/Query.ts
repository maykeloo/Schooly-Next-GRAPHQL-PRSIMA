import {Context} from '../index'
import { Post, User} from '.prisma/client'
import {PostPayloadType} from './Mutation/post'

interface UserPayload {
    userErrors: {
        message: string
    }[],
    user: User | null;
}

export const Query = {
    posts: async (_: any, __: any, {prisma}: Context): Promise<Post[]> => {
        return await prisma.post.findMany({
            where: {
                published: true
            }, orderBy: [{
                createdAt: "desc"
            },]
        })
    },
    userPosts: async (_: any, { userId }: { userId: string }, { prisma, userInfo}: Context) => {
        const isMyProfile = Number(userId) === userInfo?.userId;
        if(!isMyProfile) return await prisma.post.findMany({
            where: {
                authorId: Number(userId),
                published: true
            }
        })

        return await prisma.post.findMany({
            where: {
                authorId: Number(userId),
            }
        })
    },
    post: async (_: any, {postId}: { postId: string }, {prisma}: Context): Promise<Post | PostPayloadType> => {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }
        })
        if (post) {
            return post
        } else {
            return {
                userErrors: [
                    {
                        message: "You must provide a title and a content to create a post"
                    }
                ], 
                post: null
            }
        }
    }, 
    me: async (_: any, __: any, {prisma, userInfo}: Context): Promise<UserPayload> => {

        if (!userInfo) {
            return {
                userErrors: [{
                    message: "User not found."
                }], user: null
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        })

        return {
            userErrors: [], user
        }
    }, 
    profile: async (_: any, {userId}: { userId: string }, {prisma, userInfo}: Context) => {
        const isMyProfile = Number(userId) === userInfo?.userId;

        const profile = await prisma.profile.findUnique({
            where: {
                userId: Number(userId),
            },
        });

        if (!profile) return null;

        return {
            ...profile, isMyProfile,
        };
    }, 
    profileByName: async (_: any, {name}: { name: string }, { prisma }: Context) => {
        const replacedName = name.replace(/%20/g, '');;
        const profile = await prisma.profile.findMany({
            where: {
               OR: [
                {
                    user: {
                        nameEN: {
                            contains: replacedName,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    user: {
                        name: {
                            contains: replacedName,
                            mode: 'insensitive'
                        }
                    }
                },
               ]
            }
        })
        if(!profile) return {
            profile: null,
            userErrors: [
                {
                    message: 'User not found'
                }
            ]
        }
        return profile
    },
    categories: (_: any, { userId }: { userId: string }, { prisma }: Context) => {
        return prisma.category.findMany()
    },
    comments: async (_: any, { text }: { text: string }, { prisma }: Context) => {
        const comments = await prisma.comment.findMany({
            where: {
                content: {
                    contains: text,
                    mode: 'insensitive'
                }
            }
        })
        if(!comments) {
            return {
                comments: null,
                userErrors: [
                    {
                        message: 'Comment not found'
                    }
                ]
            }
        }

        return comments
    },
    postWithCategory: async (_: any, { category }: { category: string }, { prisma }: Context) => {
        const replacedCategory = category.replace(/%20/g, '');;
        const posts = await prisma.post.findMany({
            where: {
                categories: {
                    some: {
                        category: {
                            name: {
                                contains: replacedCategory,
                                mode: "insensitive"
                            }
                        }
                    }
                }
            }
        })
        return posts
    },
    postsByContent: async (_: any, { text }: { text: string }, { prisma }: Context) => {
        const replacedText = text.replace(/%20/g, '');
        const posts = await prisma.post.findMany({
            where: {
              OR: [
                {
                    content: {
                        contains: replacedText,
                        mode: 'insensitive'
                    }
                },
                {
                    title: {
                        contains: replacedText,
                        mode: 'insensitive'
                    }
                }
              ]
            }
        })
        console.log(posts)
        return posts
    }
}