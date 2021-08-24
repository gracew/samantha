import { TextInput, Button } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import PrevButton from '../components/prevButton';

export default function Person() {
    const [text, setText] = useState();
    const router = useRouter();
    const { emotion } = router.query;

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/checkins"/>
                <div>
                    <h1>Additional Notes</h1>
                    <p>You have selected: {emotion}</p>
                </div>

                <div>
                <TextInput
                    placeholder="type here"
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
                <Button className = {styles.button} label = "submit" hoverIndicator/>
                </div>
            </main>
        </div>
    )
}