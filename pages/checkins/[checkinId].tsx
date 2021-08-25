import styles from '../styles/Home.module.css';
import { Calendar, Box } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../../components/prevButton';

export default function CheckIns(){
    const router = useRouter();
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/checkins"/>
            </main>
        </div>
    )

}