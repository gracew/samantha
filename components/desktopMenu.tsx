import { UserButton } from '@clerk/clerk-react';
import { Button, Nav, Sidebar } from 'grommet';
import { Edit, Help, Send, StatusGood } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/DesktopMenu.module.css';

export default function DesktopMenu() {
  const router = useRouter();
  return (
    <Sidebar
      className={styles.desktopMenu}
      pad="large"
      header={<h3>Samantha</h3>}
      footer={
        <Nav gap="medium">
          <Button className={styles.feedbackButton} href="mailto:hello@storydating.com">
            <Send className={styles.inlineIcon} size="18px" color="white" />Feedback
          </Button>
          <div className={styles.footerAccount}><UserButton />Account</div>
        </Nav>
      }
    >
      <Nav gap="medium">
        <Button onClick={() => router.push("/")}>
          <Edit className={styles.inlineIcon} size="18px" color="white" />Dates
        </Button>
        <Button onClick={() => router.push("/checkins")}>
          <StatusGood className={styles.inlineIcon} size="18px" color="white" />Check-ins
        </Button>
        <Button onClick={() => router.push("/questions")}>
          <Help className={styles.inlineIcon} size="18px" color="white" />Questions
        </Button>
      </Nav>
    </Sidebar>
  )
}
