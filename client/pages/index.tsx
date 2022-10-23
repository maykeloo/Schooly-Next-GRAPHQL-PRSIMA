import type { NextPage } from 'next'
import { PostCreateComponent } from '../components/Post/Create'
import { PostsList } from '../components/Post/List'
import { useQuery } from "@apollo/client";
import { GET_POSTS } from '../resolvers/queries';


const Home: NextPage = () => {
  const { data, loading, error} = useQuery(GET_POSTS);

  return (
    <>
      <PostCreateComponent/>
      <PostsList content={{data: data?.posts, loading, error}}/>
    </>
  )
}

export default Home
