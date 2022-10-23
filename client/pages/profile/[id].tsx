import { QueryResult, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader";
import { GET_PROFILE } from "../../resolvers/queries";
import { Profile } from "../../types/User";
import { ProfileHeader } from "../../components/Profile/Header";
import { ProfileDetails } from "../../components/Profile/Details";
import { PostsList } from "../../components/Post/List";
import Error from "../../components/Error";
import PageLoader from "../../components/PageLoader";

interface QueryData {
  profile: Profile;
}

interface QueryVariables {
  userId: number;
}

const Profile = () => {
  const router = useRouter();
  const { query } = router;

  const { data, loading, error }: QueryResult<QueryData, QueryVariables> =
    useQuery(GET_PROFILE, {
      variables: {
        userId: Number(query.id),
      },
    });

  if (loading) {
    return <PageLoader/>;
  }
  if (error) {
    return <Error />;
  }

  if (data) {
    return (
      <>
        <div>
          <div className="fixed top-0 p-4 flex gap-10 bg-gray-100 w-[50%] z-10">
            <ProfileHeader name={data.profile.user.name} postsLength={data.profile.user.posts.length}/>
          </div>
          <ProfileDetails profile={data.profile} />
          <PostsList content={{ data: data?.profile.user.posts, loading, error }}/>
        </div>
      </>
    );
  }
};

export default Profile;
