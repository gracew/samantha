import { TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../components/step';
import styles from '../../../styles/Form.module.css';

export default function NewPersonName() {
  const [name, setName] = useState("");
  const router = useRouter();

  function onNext() {
    router.push({ pathname: "/person/new/2", query: { name } });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step label="Next" onNext={onNext} nextDisabled={name === ""} backHref="/">
          <h2>
            Who did you meet?
          </h2>

          <TextInput placeholder="Their name" value={name} onChange={e => setName(e.target.value)} />
        </Step>
      </main>

    </div>
  )
}
