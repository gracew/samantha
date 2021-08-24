import { TextInput, Button, Spinner } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import PrevButton from '../components/prevButton';

export default function Notes() {
    const [text, setText] = useState<string>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { emotion } = router.query;
    console.log(emotion)

    async function handleSubmit(e: any) {
        setLoading(true);
        await fetch("/api/addCheckin", {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ emotion, notes:text }),
          });
        setLoading(false);
          router.push("/");
    }
    const labelWithSpinner = loading
    ? <div className={styles.buttonSpinner}>{"submit"} <Spinner color="white" size="xsmall" /></div>
    : "submit";

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/checkins"/>
                <div>
                    <h2>Additional Notes</h2>
                    <p>You have selected: {emotion}</p>
                </div>
                <div>
                <TextInput
                    placeholder="type here"
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
                <Button label={labelWithSpinner} hoverIndicator onClick={handleSubmit}/>
                </div>
            </main>
        </div>
    )
}