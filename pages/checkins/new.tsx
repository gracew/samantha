import styles from '../../styles/Home.module.css';
import { Grid, Button} from 'grommet';
import { Calendar } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../../components/prevButton';

export default function New_Checkins(){
    const router = useRouter();
    const emotions = {Happy: '😀', Excited: '🤩', Unsure: '😕', Bored: '😐', Anxious: '😬', Angry: '😡', Stressed: '😣', Sad: '😭'}
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/"/>
                <Button onClick={() => router.push(`/checkins`)}><Calendar/></Button>
                <h2>Check-Ins</h2>
                <div>How do you feel about dating?</div>
                <Grid className={styles.grid}>
                    {Object.entries(emotions).map(([text,emoji]) =>
                        <Button key={text} value={emoji} hoverIndicator onClick={() => router.push(`/notes?emotion=${text}`)}>{emoji} {text}</Button>
                    )}
                </Grid>
            </main>
        </div>
    )
}