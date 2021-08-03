import { DateInput, RadioButtonGroup, TextArea, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../../components/step';
import styles from '../../../../styles/Home.module.css';

export default function NewDateWhere() {
  const [note, setNote] = useState("");
  const router = useRouter();
  const { name } = router.query;

  function onNext() {
    // TODO(gracew): save to DB
    router.push({ pathname: "/", query: { name } });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} onBack={() => router.push("/")}>
          <h2>
            Thanks for taking the time to reflect on your date with {name}! Is there anything else you want to make a note of?
          </h2>
          <TextArea value={note} onChange={e => setNote(e.target.value)} />
        </Step>
      </main>

    </div>
  )
}
