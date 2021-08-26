import { Footer } from 'grommet';
import { Configure, Edit, StatusGood } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const router = useRouter();
  return (
    <div className={styles.mobileMenu}>
      <Footer pad="medium">
        <Edit />
        <StatusGood />
        <Configure />
      </Footer>
    </div>
  )
}
