import { Button, Footer } from 'grommet';
import { Edit, Help } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const router = useRouter();
  const datesColor = !router.pathname.startsWith("/questions") ? "#00897B" : undefined;
  const questionsColor = router.pathname.startsWith("/questions") ? "#00897B" : undefined;
  return (
    <div className={styles.mobileMenu}>
      <Footer pad="large" justify="evenly">
        <Button onClick={() => router.push("/")}>
          <Edit color={datesColor} />
        </Button>
        <Button onClick={() => router.push("/questions")}>
          <Help color={questionsColor} />
        </Button>
      </Footer>
    </div>
  )
}
