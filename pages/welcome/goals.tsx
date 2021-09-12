import { CheckBoxGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../components/step';
import styles from '../../styles/Form.module.css';

enum Goal {
  DateCasually = "Date casually",
  LifePartner = "Meet a life partner",
  Marriage = "Meet someone to marry",
  Kids = "Meet someone to have kids with",
  AdditionalPartners = "Meet additional partners",
  Learning = "Learn more about myself and what I'm looking for",
  Other = "Something else"
}

export default function Goals() {
  const router = useRouter();
  const [goals, setGoals] = useState<string[]>([]);
  const [other, setOther] = useState("");

  function onChange(e: any) {
    const value = e.option.label;
    if (value === Goal.Other) {
      if (goals.includes(value)) {
        setGoals([]);
      } else {
        setGoals([Goal.Other]);
      }
      return;
    }

    if (goals.includes(value)) {
      setGoals(goals.filter(g => g !== value));
    } else {
      setGoals([...goals, value]);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Next"
          onNext={() => router.push("/welcome/importance")}
          backHref="/welcome"
          nextDisabled={goals.length === 0 || (goals[0] === Goal.Other && other === "")}
        >
          <h2>What are your current dating goals?</h2>
          <p className={styles.descriptionText}>
            Feel free to select multiple!
          </p>
          <CheckBoxGroup
            className={styles.checkBoxGroup}
            name="goals"
            options={Object.values(Goal)}
            value={goals}
            onChange={onChange}
          />
          {goals.includes(Goal.Other) && <TextInput
            style={{ marginTop: "10px" }}
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>
    </div >
  )
}