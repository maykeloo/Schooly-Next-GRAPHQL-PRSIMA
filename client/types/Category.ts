import { Post } from './User'

export interface Category {
  id: number;
  name: string;
  category: Category
  posts: [CategoriesOnPosts];
}

export interface CategoriesOnPosts {
  post: Post;
  postId: number;
  category: Category;
  categoryId: number;
}
