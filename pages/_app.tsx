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
import React, { useEffect } from 'react';
import DesktopMenu from "../components/desktopMenu";
import MobileMenu from "../components/mobileMenu";
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

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/serviceWorker.js");
    }
  }, [])

  return <ClerkProvider
    frontendApi={clerkFrontendApi}
    navigate={(to) => router.push(to)}
  >
    <Head>
      <title>Samantha | Dating Journal</title>
      <meta name="description" content="The only app that guides you to reflect on dates and gives you custom dating tips." />
      <meta name="theme-color" content="#197369"/>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/webclip.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>

    <SignedIn>
      <Grommet className="grommet-wrapper" theme={customTheme}>
        <DesktopMenu />
        <Component {...pageProps} />
        <MobileMenu />
      </Grommet>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
}
export default MyApp;
