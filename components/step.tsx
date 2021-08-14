import { Button, Meter, Spinner } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/Step.module.css';
import PrevButton from './prevButton';

interface StepProps {
  label: string;
  onNext: () => void;
  onBack?: () => void;
  backHref?: string;
  nextDisabled: boolean;
  loading?: boolean;
  progress?: number;
}

export const Step: FunctionComponent<StepProps> = (props) => {
  const labelWithSpinner = props.loading
    ? <div className={styles.buttonSpinner}>{props.label} <Spinner color="white" size="xsmall" /></div>
    : props.label;
  return (
    <div>
      <div className={styles.prevAndProgress}>
        <PrevButton onBack={props.onBack} href={props.backHref} />
        {props.progress && <div className={styles.progressContainer}>
          <Meter value={props.progress} />
        </div>}
      </div>
      {props.children}
      <div>
        <Button className={styles.nextButton} disabled={props.nextDisabled} primary label={labelWithSpinner} onClick={props.onNext} />
      </div>
    </div>
  )
}
