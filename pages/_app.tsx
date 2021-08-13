import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import { Grommet } from 'grommet';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const customTheme = {
    global: {
      colors: {
        brand: "#26A69A",
      }
    }
  };

  return <ClerkProvider
    frontendApi={clerkFrontendApi}
    navigate={(to) => router.push(to)}
  >
    <>
      <Head>
        <title>Samantha | Dating Journal</title>
        <meta name="description" content="The only app that guides you to reflect on dates and gives you custom dating tips." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignedIn>
        <Grommet theme={customTheme}>
          <Component {...pageProps} />
        </Grommet>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  </ClerkProvider>
}
export default MyApp;
