import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../../components/prevButton';
import React, { useEffect, useState } from 'react';
import { Checkin, getCheckin } from '../../store';
import moment from 'moment';
import { emotionDict } from '../checkins';


export default function ViewCheckin(){
    const router = useRouter();
    const { checkinId } = router.query;

    const [checkin, setCheckin] = useState<Checkin>();
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
                <div className={styles.centerEmoji}>{emotionDict[checkin?.emotion]}</div>
                <div className={styles.centerEmotion}>{checkin?.emotion}</div>
                <div className={styles.centerNotes}>{checkin?.notes}</div>
            </main>
        </div>
    )

}