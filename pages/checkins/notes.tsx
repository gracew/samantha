import { TextArea } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { emotionDict } from '.';
import { Step } from '../../components/step';
import styles from '../../styles/Form.module.css';

export default function Notes() {
  const [text, setText] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { emotion } = router.query;

  async function handleSubmit() {
    setLoading(true);
    await fetch("/api/addCheckin", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ emotion, notes: text }),
    });
    setLoading(false);
    router.push("/checkins");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <Step
            label="Submit"
            onNext={handleSubmit}
            backHref="/checkins/new"
            loading={loading}
            nextDisabled={false}
          >
            <h2>{emotionDict[emotion as string]} {emotion}</h2>
            <TextArea
              rows={6}
              placeholder="Add a note..."
              value={text}
              onChange={event => setText(event.target.value)}
            />
          </Step>
        </div>
      </main>
    </div>
  )
}