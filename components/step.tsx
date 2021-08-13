import { Button, Spinner } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/Step.module.css';
import PrevButton from './prevButton';

interface StepProps {
  onNext: () => void;
  backHref: string;
  nextDisabled: boolean;
  loading?: boolean;
}

export const Step: FunctionComponent<StepProps> = (props) => {
  const label = props.loading
    ? <div className={styles.buttonSpinner}>Next <Spinner color="white" size="xsmall" /></div>
    : "Next";
  return (
    <div>
      <PrevButton href={props.backHref} />
      {props.children}
      <div>
        <Button className={styles.nextButton} disabled={props.nextDisabled} primary label={label} onClick={props.onNext} />
      </div>
    </div>
  )
}
