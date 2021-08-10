import { Previous } from 'grommet-icons';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/PrevButton.module.css';

interface PrevButtonProps {
  href: string;
}

export default function PrevButton(props: PrevButtonProps) {
  return <div className={styles.prevButton}>
    <Link href={props.href}><Previous color="white"/></Link>
  </div>;
}
