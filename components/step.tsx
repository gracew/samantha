import { Button } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/Step.module.css';
import PrevButton from './prevButton';

interface StepProps {
  onNext: () => void;
  backHref: string;
  nextDisabled: boolean;
}

export const Step: FunctionComponent<StepProps> = (props) => {
  return (
    <div>
      <PrevButton href={props.backHref} />
      {props.children}
      <div>
        <Button className={styles.nextButton} disabled={props.nextDisabled} primary label="Next" onClick={props.onNext} />
      </div>
    </div>
  )
}
