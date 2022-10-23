import { ApolloError } from "@apollo/client";
import { Post } from "../../types/User";
import Error from "../Error";
import { Loader } from "../Loader";
import PageLoader from "../PageLoader";
import { PostComponent } from "./Component";

interface QueryData {
  content: { 
    data: Post[]; 
    loading: boolean; 
    error: ApolloError | undefined; 
  };    
}
export const PostsList = ({ content }: QueryData) => {

  if (content.loading) {
    return <PageLoader/>;
  }
  if (content.error) {
    return <Error/>;
  }

  if (content.data) {
    return (
      <div className="flex flex-col gap-3">
        {content.data?.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    );
  }
  
  return <div>No data.</div>
};
