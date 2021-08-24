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

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/checkins"/>
                <div>
                    <h1>Additional Notes</h1>
                    <p>You have selected: {emotion}</p>
                </div>
                {loading && <Spinner/>}

                {!loading && <div>
                <TextInput
                    placeholder="type here"
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
                <Button label = "submit" hoverIndicator onClick={handleSubmit}/>
                </div>
                }
            </main>
        </div>
    )
}