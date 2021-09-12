import { RadioButtonGroup } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../components/step';
import { addGoals } from '../../store';
import styles from '../../styles/Form.module.css';

enum ImportanceOptions {
  VeryImportant = "Very important",
  Important = "Important",
  ALittleImportant = "A little important",
  NotThatImportant = "Not that important",
}

export default function Importance() {
  const router = useRouter();
  const { goals, other } = router.query;
  const [importance, setImportance] = useState("");
  const [loading, setLoading] = useState(false);

  async function onNext() {
    setLoading(true);
    await addGoals({ goals: JSON.parse(goals as string), goal_other: other as string, importance });
    router.push("/checkins/new");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Next"
          onNext={onNext}
          backHref={`/welcome/goals?goals=${goals}&other=${other}`}
          nextDisabled={importance === ""}
          loading={loading}
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