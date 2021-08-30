import styles from '../../styles/Form.module.css';
import { Grid, Button } from 'grommet';
import { Calendar } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../../components/prevButton';
import { emotionDict } from '.';

export default function NewCheckins() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.buttonMenu}>
          <PrevButton href="/" />
          <Button
            className={styles.calendarButton}
            onClick={() => router.push(`/checkins`)}
            label={<Calendar />}
            primary
            color="white"
          />
        </div>
        <h2>Check-Ins</h2>
        <div className={styles.descriptionText}>How are you feeling about dating today?</div>
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