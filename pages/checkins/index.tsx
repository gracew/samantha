/* eslint-disable react/no-children-prop */
import { Box, Button, Calendar } from 'grommet';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PrevButton from '../../components/prevButton';
import { Checkin, getCheckins } from '../../store';
import styles from '../../styles/Form.module.css';

export const emotionDict: Record<string, string> = {
  Happy: '😊',
  Excited: '😀',
  Inspired: '🤩',
  Unsure: '😕',
  Bored: '😐',
  Anxious: '😬',
  Angry: '😤',
  Stressed: '😣',
  Sad: '😞',
}

export default function Checkins() {
  const router = useRouter();
  const [checkins, setCheckins] = useState<Record<string, any>>({});

  useEffect(() => {
    getCheckins().then((result: Checkin[]) => {
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
    if (!checkin) {
      return <div className={styles.calendarDate}>
        <div>
          {date.getDate()}
        </div>
      </div>;
    }
    return <Button hoverIndicator onClick={() => onSelect(date)}>
      <div className={styles.calendarDate}>
        <div>{checkin && emotionDict[checkin?.emotion]}</div>
        <div>{date.getDate()}</div>
      </div>
    </Button>;
  }

  function onSelect(date: Date) {
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
        <h2>Check-Ins</h2>
        <Box align="center">
          <Calendar className={styles.checkinCalendar}
            date={(new Date()).toISOString()}
            children={renderDate}
          />
        </Box>
      </main>
    </div>
  )
}