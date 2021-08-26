import { Button, ButtonExtendedProps, Spinner } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/ButtonWithSpinner.module.css';

interface ButtonWithSpinnerProps extends ButtonExtendedProps {
  loading?: boolean;
  spinnerColor?: string;
}

export const ButtonWithSpinner: FunctionComponent<ButtonWithSpinnerProps> = (props) => {
  const labelWithSpinner = props.loading
    ? <div className={styles.buttonSpinner}>{props.label} <Spinner color={props.spinnerColor} size="xsmall" /></div>
    : props.label;
  return (
    <div>
      <Button {...props} label={labelWithSpinner} />
    </div>
  )
}
