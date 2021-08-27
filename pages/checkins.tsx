import styles from '../styles/Home.module.css';
import { Calendar, Box, Button } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import PrevButton from '../components/prevButton';
import React, { useEffect, useState } from 'react';
import { Checkin, getCheckins, Person } from '../store';
import moment from 'moment';

export const emotionDict: Record<string,string> = {Happy: '😀', Excited: '🤩', Unsure: '😕', Bored: '😐', Anxious: '😬', Angry: '😡', Stressed: '😣', Sad: '😭'}

export default function CheckIns() {
  const router = useRouter();
  const [checkins, setCheckins] = useState<Record<string, any>>({});

  useEffect(() => {
    getCheckins().then((result: Checkin[]) => {
      // result is of type list
      console.log(result)
      const resultMap: Record<string, any> = {};
      result.forEach(c => {
        resultMap[moment(c.created_at).format("YYYY-MM-DD")] = c;
      })
      setCheckins(resultMap);
    });
  }, []);

  function renderDate({ date }: { date: Date }) {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const checkin = checkins[formattedDate];
    return <div className={styles.leftAlign}>
      {checkin && emotionDict[checkin?.emotion]}
      <br/>
      {date.getDate()}
    </div>;
  }

  function onSelect(date: string | string[]) {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const checkin = checkins[formattedDate];
    if (checkin) {
      router.push(`/checkins/${checkin.id}`)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PrevButton href="/checkins/new" />
        <Box pad="large" align="center">
          <Calendar
            size="medium"
            date={(new Date()).toISOString()}
            onSelect={onSelect}
            children={renderDate}
          />
        </Box>
      </main>
    </div>
  )
}