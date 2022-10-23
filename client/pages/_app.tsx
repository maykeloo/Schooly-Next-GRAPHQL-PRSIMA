import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ThreeParts } from '../layout/ThreeParts'
import createApolloClient from '../utils/apollo-client'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <ThreeParts>
        <Component {...pageProps}/>
      </ThreeParts>
    </ApolloProvider>
  )
}

export default MyApp
