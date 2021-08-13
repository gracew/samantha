import { RadioButtonGroup } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import OtherInput from '../../../components/otherInput';
import { Step } from '../../../components/step';
import { addPerson } from '../../../store';
import styles from '../../../styles/Form.module.css';

export enum Context {
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
  const [loading, setLoading] = useState(false);

  async function onNext() {
    setLoading(true);
    const id = await addPerson({ name: name as string, context, context_other: other });
    router.push(`/person/${id}/date/new`);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          onNext={onNext}
          nextDisabled={context === "" || (context === Context.Other && other === "")}
          backHref={"/person/new/1"}
          loading={loading}
        >
          <h2>
            How did you meet {name}?
          </h2>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="how-meet"
            options={Object.values(Context)}
            value={context}
            onChange={e => setContext(e.target.value)}
          />
          {context === Context.Other && <OtherInput
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>

    </div>
  )
}
