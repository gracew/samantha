import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import styles from '../../../styles/Form.module.css';
import { Step } from '../../../components/step';
import { archivePerson } from '../../../store';

export enum ArchiveReason {
  TryingProduct = "I was just trying out the product",
  NoPhysicalAttraction = "I'm not physically attracted to them",
  NoEmotionalAttraction = "I'm not emotionally attracted to them",
  EmotionallyUnavailable = "They're emotionally unavailable",
  Friends = "We're better off as friends",
  NotInterested = "They're not interested anymore",
  NoResponse = "They stopped responding",
  Other = "Other",
}

export default function ArchivePerson() {
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const { personId, name } = router.query;
  const [loading, setLoading] = useState(false);

  async function onNext() {
    setLoading(true);
    await archivePerson(personId as string, reason, other);
    router.push(`/`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Archive"
          onNext={onNext}
          nextDisabled={reason === "" || (reason === ArchiveReason.Other && other === "")}
          backHref={`/person/${personId}`}
          loading={loading}
        >
          <h2>
            Why do you want to archive {name}?
          </h2>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="archive-reason"
            options={Object.values(ArchiveReason)}
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
          {reason === ArchiveReason.Other && <TextInput
            style={{ marginTop: "10px" }}
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>

    </div>
  )
}