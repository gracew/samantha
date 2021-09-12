import { Button } from 'grommet';
import { Calendar } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { emotionDict } from '.';
import PrevButton from '../../components/prevButton';
import { RoundButton } from '../../components/roundButton';
import styles from '../../styles/Form.module.css';

export default function NewCheckins() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.buttonMenu}>
          <PrevButton href="/" />
          <RoundButton
            onClick={() => router.push(`/checkins`)}
            label={<Calendar />}
            primary
            color="white"
          />
        </div>
        <h2>How are you currently feeling about dating?</h2>
        <div className={styles.emotionGrid}>
          {Object.entries(emotionDict).map(([text, emoji]) =>
            <Button
              className={styles.emotionButton}
              key={text}
              value={emoji}
              onClick={() => router.push(`/checkins/notes?emotion=${text}`)}
              label={<div className={styles.emojiAndLabel}><div className={styles.emoji}>{emoji}</div><div>{text}</div></div>}
              primary
              color="white"
            />
          )}
        </div>
      </main>
    </div>
  )
}