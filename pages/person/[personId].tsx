import { Button, Card, CardBody, CardFooter, CardHeader } from 'grommet';
import { Add, Clock, Location } from 'grommet-icons';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PrevButton from '../../components/prevButton';
import { getPerson } from '../../store';
import styles from '../../styles/Home.module.css';
import { formatDate } from './util';

export default function Person() {
  const router = useRouter();
  const { personId } = router.query;
  const [person, setPerson] = useState<any>();

  useEffect(() => {
    const person = getPerson(personId as string);
    setPerson(person);
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {person &&
          <div>
            <PrevButton href="/" />

            <h2>
              My Dates with {person.name}
            </h2>

            <div className={styles.grid}>
              {person.dates.map((d: any) => <Card key={d.id} background="light-1">
              <Button hoverIndicator onClick={() => router.push(`/date/${d.id}`)}>
                  <CardHeader
                    className={styles.cardHeader}
                    pad={{ top: "large", left: "large", right: "large", bottom: "small" }}
                  >
                    {formatDate(d.date)}
                  </CardHeader>
                  <CardBody pad={{ left: "large", bottom: "large", right: "large", top: "small" }}>
                    <div className={styles.inlineIcon}><Clock />{d.time}</div>
                    <div className={styles.inlineIcon}><Location />{d.location}</div>
                  </CardBody>
                </Button>
              </Card>)}

              <Card className={styles.addButton} background="light-1">
                <Button hoverIndicator icon={<Add />} onClick={() => router.push(`/person/${personId}/date/new`)} />
              </Card>
            </div>
          </div>}
      </main>

    </div>
  )
}
