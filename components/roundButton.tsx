import { Button, ButtonExtendedProps, Spinner } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/RoundButton.module.css';

export const RoundButton: FunctionComponent<ButtonExtendedProps> = (props) => {
  return <Button className={styles.roundButton} {...props} />;
}
