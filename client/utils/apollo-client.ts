import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
function createApolloClient() {
  let token: string | null;
  
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client
}
export default createApolloClient;
