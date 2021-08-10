import { Button, Card, CardBody, CardFooter, CardHeader, Video } from 'grommet';
import { Add, Bar, Brush, Cafeteria, Clock, Grow, Java, Location, New, Phone } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PrevButton from '../../components/prevButton';
import { getPerson } from '../../store';
import styles from '../../styles/Home.module.css';
import { formatDate } from './util';
import { Where } from './[personId]/date/[dateId]/where';

function getIcon(where: Where) {
  switch (where) {
    case Where.PhoneCall:
      return <Phone />;
    case Where.VideoCall:
      return <Video />;
    case Where.Park:
      return <Grow />;
    case Where.Bar:
      return <Bar />;
    case Where.Restaurant:
      return <Cafeteria />;
    case Where.Cafe:
      return <Java />;
    case Where.Museum:
      return <Brush />;
    default:
      return <New />;
  }
}

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
              {person.dates.map((d: any) => <Card className={styles.card} key={d.id} background="light-1">
                <CardHeader
                  className={styles.cardHeader}
                  pad={{ top: "large", left: "large", right: "large", bottom: "small" }}
                >
                  {formatDate(d.date)}
                </CardHeader>
                <CardBody pad={{ left: "large", bottom: "large", right: "large", top: "small" }}>
                  <div className={styles.inlineIcon}><Clock />{d.time}</div>
                  <div className={styles.inlineIcon}>{getIcon(d.location)}{d.location}</div>
                </CardBody>
              </Card>)}

              <Card className={styles.card} background="light-1">
                <Button className={styles.addButton} hoverIndicator icon={<Add />} onClick={() => router.push(`/person/${personId}/date/new`)} />
              </Card>
            </div>
          </div>}
      </main>

    </div>
  )
}
