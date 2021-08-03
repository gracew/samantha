import { defaultProps, RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../components/step';
import styles from '../../../styles/Home.module.css';

export default function NewPersonContext() {
  const [context, setContext] = useState("");
  const router = useRouter();
  const { name } = router.query;

  function onNext() {
    // TODO(gracew): save to DB
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} onBack={() => router.push("/person/new/1")}>
          <h2>
            How did you meet {name}?
          </h2>
          <RadioButtonGroup
            name="how-meet"
            options={["Event", "Dating app", "Friend", "Community", "Other"]}
            value={context}
            onChange={e => setContext(e.target.value)}
          />
        </Step>
      </main>

    </div>
  )
}
