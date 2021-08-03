import { DateInput, RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../../components/step';
import { updateDate } from '../../../../store';
import styles from '../../../../styles/Home.module.css';

export default function NewDateWhere() {
  const [where, setWhere] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;

  function onNext() {
    updateDate(personId as string, dateId as string, { where, other });
    router.push(`/`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} onBack={() => router.push("/")}>
          <h2>
            Where did you meet for your date?
          </h2>
          <RadioButtonGroup
            name="date-where"
            options={["Phone call", "Video call", "Park", "Bar", "Restaurant", "Cafe", "Museum", "Somewhere else"]}
            value={where}
            onChange={e => setWhere(e.target.value)}
          />
          {where === "Somewhere else" && <TextInput value={other} onChange={e => setOther(e.target.value)} />}
        </Step>
      </main>

    </div>
  )
}
