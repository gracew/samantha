import { Button, Footer } from 'grommet';
import { Edit, Help, StatusGood } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const router = useRouter();

  const checkins = router.pathname.startsWith("/checkins");
  const questions = router.pathname.startsWith("/questions");
  const checkinsColor = checkins ? "#00897B" : undefined;
  const questionsColor = questions ? "#00897B" : undefined;
  const datesColor = !checkins && !questions ? "#00897B" : undefined;
  return (
    <div className={styles.mobileMenu}>
      <Footer pad="large" justify="evenly">
        <Button onClick={() => router.push("/")}>
          <Edit color={datesColor} />
        </Button>
        <Button onClick={() => router.push("/checkins/new")}>
          <StatusGood color={checkinsColor} />
        </Button>
        <Button onClick={() => router.push("/questions")}>
          <Help color={questionsColor} />
        </Button>
      </Footer>
    </div>
  )
}
