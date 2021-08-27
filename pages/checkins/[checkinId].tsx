import styles from '../../styles/Home.module.css';
import { } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../../components/prevButton';
import React, { useEffect, useState } from 'react';
import { getCheckin } from '../../store';
import moment from 'moment';


export default function CheckIns(){
    const router = useRouter();
    const { checkinId } = router.query;

    const emotionDict: Record<string,string> = {Happy: '😀', Excited: '🤩', Unsure: '😕', Bored: '😐', Anxious: '😬', Angry: '😡', Stressed: '😣', Sad: '😭'}

    const [checkin, setCheckin] = useState<any>();
    useEffect(() => {
        getCheckin(checkinId as string).then(result => setCheckin(result));
      }, []);
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <PrevButton href="/checkins"/>
                
                <div className={styles.center1}> 
                {moment(checkin?.created_at).format("ddd, MMMM DD, hh:mm A")}
                </div>
                <div className={styles.center2}>{emotionDict[checkin?.emotion]}</div>
                <div className={styles.center1}>{checkin?.emotion}</div>
                <div className={styles.center3}>{checkin?.notes}</div>
            </main>
        </div>
    )

}