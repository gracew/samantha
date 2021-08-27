import { UserButton } from '@clerk/clerk-react';
import { Button, Header } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/MobileNavbar.module.css';


export default function MobileNavbar() {
  const router = useRouter();
  const logo = <div>
    <span className={styles.logoName}>Samantha</span>
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
