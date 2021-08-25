import styles from '../styles/Home.module.css';
import { Calendar, Box } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../components/prevButton';
import React, { useEffect, useState } from 'react';
import { getCheckins, Person } from '../store';

export default function CheckIns(){
    const router = useRouter();
    const [checkins, setCheckins] = useState<any>();

    useEffect(() => {
        getCheckins((result:any)=> {
            setCheckins(result)
        });
      }, []);
    return (
        <div className={styles.container}>
            <main className={styles.main}>
            <PrevButton href="/checkins/new"/>
            <Box pad="large" align="center">
                <Calendar
                    size="medium"
                    date={(new Date()).toISOString()}
                    onSelect={(date) => {}}
                    onClick={() => router.push(`/`)}
                />
            </Box>
            </main>
        </div>
    )
}