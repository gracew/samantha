import styles from '../styles/Home.module.css';
import { Grid, Button} from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PrevButton from '../components/prevButton';

export default function CheckIns(){
    const router = useRouter();
    const emotions = ["😀 Happy", "🤩 Excited", "😕 Unsure", "😐 Bored", "😬 Anxious", "😡 Angry","😣 Stressed", "😭 Sad"]
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/"/>
                <h2>Check-Ins</h2>
                <h1>How do you feel about dating?</h1>
                <Grid className={styles.grid}>
                    {emotions.map(emotion => 
                    <Button label = {emotion} hoverIndicator onClick={() => router.push(`/notes?emotion=${emotion}`)}/>
                    )}
                </Grid>

            </main>
        </div>
    )
}