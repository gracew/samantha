import { RadioButtonGroup } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../components/step';
import styles from '../../styles/Form.module.css';

enum ImportanceOptions {
  VeryImportant = "Very important",
  Important = "Important",
  ALittleImportant = "A little important",
  NotThatImportant = "Not that important",
}

export default function Importance() {
  const router = useRouter();
  const [importance, setImportance] = useState("");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Next"
          onNext={() => router.push("/checkins/new")}
          backHref="/welcome/goals"
          nextDisabled={importance === ""}
        >
          <h2>How important is working towards your dating goals to you?</h2>
          <RadioButtonGroup
            className={styles.checkBoxGroup}
            name="goals"
            options={Object.values(ImportanceOptions)}
            value={importance}
            onChange={e => setImportance(e.target.value)}
          />
        </Step>
      </main>
    </div >
  )
}