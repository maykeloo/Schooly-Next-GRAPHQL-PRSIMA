import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        posts: [Post!]!
        post(postId: ID!): Post!
        userPosts(userId: ID!): [Post!]
        me: MePayload
        profile(userId: ID!): Profile
        profileByName(name: String!): [Profile]
        categories: [CategoriesOnPosts!]
        postsByContent(text: String!): [Post]
        comments(text: String!): [Comment]
        postWithCategory(category: String!): [Post!]
    }

    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput): PostPayload!
        postDelete(postId: ID!): PostPayload
        postPublish(postId: ID!): PostPayload
        signUp(user: SignUpInput!): UserPayload!
        signIn(user: SignInInput!): UserPayload!
        categoryCreate(name: String!): CategoryPayload!
        commentCreate(comment: CommentInput!): CommentPayload!
    }
    
    type Comment {
        id:        ID!      
        postId:    ID!
        createdAt: String!
        published: Boolean
        updatedAt: String
        userId:    ID!
        content:   String
        user:      User
    }

    type Post {
        id:         ID!
        title:      String!
        content:    String!
        published:  Boolean!
        createdAt:  String!     
        user:       User
        comment:    [Comment]
        categories: [CategoriesOnPosts]
    }   

    type User {
        id:         ID!
        email:      String!   
        name:       String!
        nameEN:     String!
        password:   String!
        createdAt:  String!   
        profile:    Profile!
        posts:      [Post!]!
    }

    type Profile {
        id:         ID!
        bio:        String!
        isMyProfile:Boolean!
        user:       User!
    }

    type Category {
        id:         ID!
        name:       String!
        posts:      [CategoriesOnPosts]
    }

    type CategoriesOnPosts {
        post:       Post     
        postId:     Int 
        category:   Category 
        categoryId: Int 
    }

    type UserError {
        message:    String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post:        Post
    }
    
    type CategoryPayload {
        userErrors:      [UserError!]
        category:        Category
    }

    type Subscription {
        commentAdded(postId: ID!): Comment
    }   
    
    type CommentPayload {
        userErrors: [UserError!]!
        comment:    Comment
    }

    type UserPayload {
        userErrors: [UserError!]!
        token:      String
    }

    type MePayload {
        userErrors: [UserError!]!
        user:       User
    }

    input SignUpInput {
        name:       String!
        email:      String!  
        password:   String!
        bio:        String!
    }

    input SignInInput {
        email:      String!
        password:   String!
    }
    
    input CommentInput {
        postId:     ID!
        userId:     ID!
        content:    String!
    }

    input CategoryInput {
        name:   String!
    }

    input PostInput {
        title:      String
        content:    String
        categories:       [String!]
    }
`;