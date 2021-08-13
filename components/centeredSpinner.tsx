import { Spinner } from 'grommet';
import React from 'react';
import styles from '../styles/CenteredSpinner.module.css';

export default function CenteredSpinner() {
  return <div className={styles.centeredSpinner}>
    <Spinner color="white" size="medium" />
  </div>;
}
