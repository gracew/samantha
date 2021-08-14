import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import OtherInput from '../../../components/otherInput';
import { Step } from '../../../components/step';
import { addPerson } from '../../../store';
import styles from '../../../styles/Form.module.css';
import * as uuid from "uuid";

export enum Context {
  Event = "Event",
  DatingApp = "Dating app",
  Friend = "Friend",
  Community = "Community",
  Other = "Other",
}

export default function EditPerson() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { personId } = router.query;

  async function onNext() {
    setLoading(true);
    await addPerson({ id: personId as string, name, context, context_other: other });
    router.push(`/person/${personId}/date/${uuid.v4()}/when`);
  }

  const stepComponent = step === 0
    ? <Step
      label="Next"
      onNext={() => setStep(1)}
      nextDisabled={name === ""}
      backHref="/"
    >
      <h2>
        Who did you meet?
      </h2>
      <TextInput placeholder="Their name" value={name} onChange={e => setName(e.target.value)} />
    </Step>
    : <Step
      label="Next"
      onNext={onNext}
      nextDisabled={context === "" || (context === Context.Other && other === "")}
      onBack={() => setStep(0)}
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
    </Step>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {stepComponent}
      </main>
    </div>
  )
}
