import { userLoader } from "../loaders/userLoader";
import { Context } from "../index";

interface PostParent {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface PostCategoryPayload {
  postId: number;
  category: {
    id: number
    name: string;
  };
}

export const Post = {
  user: (parent: PostParent) => {
    return userLoader.load(parent.authorId);
  },
  comment: (parent: PostParent, __: any, { prisma }: Context) => {
    return prisma.comment.findMany({
      where: {
        postId: parent.id
      },
      orderBy: [
        {
          createdAt: "desc"
        },
      ]
    })
  },
  categories: async (parent: PostParent, __: any, { prisma }: Context) => {
    const categoriesForPost = await prisma.category.findMany({
      where: {
        posts: {
          every: {
            post: {
              categories: {
                every: {
                  postId: parent.id,
                },
              },
            },
          },
        },
      },
    });

    let data: PostCategoryPayload[] = [];

    categoriesForPost.forEach((category) => {
      data.push({
        postId: parent.id,
        category: {
          id: category.id,
          name: category.name,
        },
      });
    });
    return data;
  },
};
