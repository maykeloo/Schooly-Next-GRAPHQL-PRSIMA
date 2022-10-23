import { gql } from 'graphql-tag'

export const COMMENT_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      content
    }
  }
`;