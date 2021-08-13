import { UserButton } from '@clerk/clerk-react';
import { Button, Header } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Navbar.module.css';


export default function Navbar() {
  const router = useRouter();
  const logo = <div>
    <span className={styles.logoName}>Samantha</span>
    <span className={styles.logoDesc}>Dating Journal</span>
  </div>
  return (
    <Header className={styles.navbar}>
      <Button plain onClick={() => router.push("/")} label={logo} />
      <div className={styles.navbarRight}>
        <Button className={styles.feedbackButton} href="mailto:hello@storydating.com">Feedback?</Button>
        <UserButton />
      </div>
    </Header>
  )
}
