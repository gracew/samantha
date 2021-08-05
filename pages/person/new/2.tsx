import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../components/step';
import { addPerson } from '../../../store';
import styles from '../../../styles/Home.module.css';

enum Context {
  Event = "Event",
  DatingApp = "Dating app",
  Friend = "Friend",
  Community = "Community",
  Other = "Other",
}

export default function NewPersonContext() {
  const [context, setContext] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const { name } = router.query;

  function onNext() {
    // TODO(gracew): swap out w/ backend call
    const id = addPerson({ name: name as string, context })
    router.push(`/person/${id}/date/new`);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} nextDisabled={context === "" || (context === Context.Other && other === "")} backHref={"/person/new/1"}>
          <h2>
            How did you meet {name}?
          </h2>
          <RadioButtonGroup
            name="how-meet"
            options={Object.values(Context)}
            value={context}
            onChange={e => setContext(e.target.value)}
          />
          {context === Context.Other && <TextInput
            style={{ marginTop: "10px" }}
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>

    </div>
  )
}
