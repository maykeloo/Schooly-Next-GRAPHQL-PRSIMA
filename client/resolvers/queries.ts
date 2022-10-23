import { gql } from "@apollo/client/core";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      published
      comment {
        id
        content
        userId
        postId
        createdAt
        user {
          id
          name
        }
      }
      user {
        id
        name
        email
      }
      categories {
        category {
          id
          name
        }
      }
    }
  }
`;
export const GET_PROFILE_BY_NAME = gql`
  query ($name: String!) {
    profileByName(name: $name) {
      user {
        createdAt
        id
        name
        email
      }
    }
  }
`;
export const GET_PROFILE = gql`
  query ($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        id
        name
        email
        createdAt
        posts {
          id
          title
          content
          createdAt
          user {
            id
            name
            email
          }
          comment {
            content
            postId
            createdAt
            id
            userId
            user {
              id
              name
            }
          }
          categories {
            category {
              name
            }
          }
          published
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query ($postId: ID!) {
    post(postId: $postId) {
      id
      title
      content
      createdAt
      user {
        id
        name
      }
      comment {
        content
        userId
        createdAt
        user {
          id
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query ($userId: ID!) {
    userPosts(userId: $userId) {
      id
      title
      content
    }
  }
`;

export const GET_PROFILE_DETAILS = gql`
  query ($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        email
      }
    }
  }
`;
export const GET_COMMENTS_BY_CONTENT = gql`
  query ($text: String!) {
    comments(text: $text) {
      content
      postId
      createdAt
      userId
      user {
        name
        email
        id
      }
    }
  }
`;

export const GET_POSTS_WITH_CATEGORY = gql`
  query ($category: String!) {
    postWithCategory(category: $category) {
      id
      title
      content
      createdAt
      published
      comment {
        createdAt
        content
        user {
          id
          name
        }
      }
      user {
        id
        name
      }
      categories {
        category {
          id
          name
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CONTENT_TITLE = gql`
  query ($text: String!) {
    postsByContent(text: $text) {
      id
      title
      content
      comment {
        content
        userId
        createdAt
        user {
          id
          name
        }
        createdAt
      }
    }
  }
`;
