import { Button } from 'grommet';
import React, { FunctionComponent } from 'react';
import styles from '../styles/Home.module.css';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export const Step: FunctionComponent<StepProps> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {props.children}
        <div>
          <Button label="Back" onClick={props.onBack} />
          <Button primary label="Next" onClick={props.onNext} />
        </div>
      </main>
    </div>
  )
}
