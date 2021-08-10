import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import { Grommet } from 'grommet';
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const clerkSignInURL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN;

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
