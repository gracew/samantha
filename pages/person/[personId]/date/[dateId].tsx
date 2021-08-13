import { Card, CardBody, CardHeader } from 'grommet';
import { Clock } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import CenteredSpinner from '../../../../components/centeredSpinner';
import PrevButton from '../../../../components/prevButton';
import { getDate, getPerson, Person } from '../../../../store';
import styles from '../../../../styles/Date.module.css';
import { formatDate } from '../../../../components/util';
import { getIcon } from '../../[personId]';
import { questions } from './[dateId]/reflect';

export default function Date() {
  const router = useRouter();
  const { dateId } = router.query;
  const [date, setDate] = useState<any>();
  const { personId } = router.query;
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPerson(personId as string).then(p => setPerson(p));
    getDate(dateId as string).then(date => setDate(date));
  }, [dateId, personId]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PrevButton href="/" />
        {!(person && date) && <CenteredSpinner />}
        {person && date &&
          <div>
            <h2>Date on {formatDate(date.date)} with {person.name}</h2>
            <div className={styles.grid}>
              <Card className={styles.iconCard} pad="medium" background="light-1"> <Clock />{date.time}</Card>
              <Card className={styles.iconCard} pad="medium" background="light-1"> {getIcon(date.location)}{date.location}</Card>
            </div>

            {questions.map(q =>
              <Card key={q.id} className={styles.card} background="light-1">
                <CardHeader
                  background="light-3"
                  className={styles.cardHeader}
                  pad={{ horizontal: "medium", top: "medium", bottom: "small" }}>
                  {q.description || q.question(person.name)}
                </CardHeader>
                <CardBody pad={{ horizontal: "medium", top: "small", bottom: "medium" }}>
                  {date.reflection[q.id]}
                </CardBody>
              </Card>
            )}
          </div>
        }
      </main>
    </div>
  )
}