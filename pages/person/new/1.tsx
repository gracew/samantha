import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../components/step';
import styles from '../../../styles/Home.module.css';

export default function NewPersonName() {
  const [name, setName] = useState("");
  const router = useRouter();

  function onNext() {
    // TODO(gracew): save to DB
    router.push({ pathname: "/person/new/2", query: { name } });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} onBack={() => router.push("/")}>
          <h2>
            Who did you meet?
          </h2>

          <div className={styles.grid}>
            <TextInput placeholder="Their name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </Step>
      </main>

    </div>
  )
}
