import { Meter } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/Step.module.css';
import { ButtonWithSpinner } from './buttonWithSpinner';
import PrevButton from './prevButton';

interface StepProps {
  label: string;
  onNext: () => void;
  onBack?: () => void;
  backHref?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  progress?: number;
}

export const Step: FunctionComponent<StepProps> = (props) => {
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
        <ButtonWithSpinner
          className={styles.nextButton}
          disabled={props.nextDisabled}
          primary
          loading={props.loading}
          spinnerColor="white"
          label={props.label}
          onClick={props.onNext} />
      </div>
    </div>
  )
}
