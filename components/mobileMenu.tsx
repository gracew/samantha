import { Button, Footer } from 'grommet';
import { Configure, Edit } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const router = useRouter();
  return (
    <div className={styles.mobileMenu}>
      <Footer pad="medium" justify="evenly">
        <Button onClick={() => router.push("/")}>
          <Edit />
        </Button>
        <Button onClick={() => router.push("/questions")}>
          <Configure />
        </Button>
      </Footer>
    </div>
  )
}
