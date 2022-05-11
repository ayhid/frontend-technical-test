import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
