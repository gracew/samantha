import { Button, Card, CardBody, CardHeader, Video } from 'grommet';
import { Add, Bar, Brush, Cafeteria, Clock, Grow, Java, New, Phone } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import CenteredSpinner from '../../components/centeredSpinner';
import PrevButton from '../../components/prevButton';
import { Person as IPerson, getPerson } from '../../store';
import styles from '../../styles/Home.module.css';
import { Context } from './new/2';
import { formatDate, lowerCaseFirstLetter } from '../../components/util';
import { Where } from './[personId]/date/[dateId]/where';

export function getIcon(where: Where) {
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

export function getContext(person: IPerson) {
  const s = person.context === Context.Other ? person.context_other : person.context;
  const article = person.context === Context.Event ? "an" : "a";
  return `${article} ${lowerCaseFirstLetter(s || "")}`;
}

export function getContextEmoji(context: Context) {
  switch (context) {
    case Context.Event:
      return <span role="img" aria-label="emoji-balloon">🎈</span>;
    case Context.DatingApp:
      return <span role="img" aria-label="emoji-mobile-phone">📱</span>;
    case Context.Friend:
      return <span role="img" aria-label="emoji-blush">😊</span>;
    case Context.Community:
      return <span role="img" aria-label="emoji-classical-building">🏛️</span>;
    default:
      return "";
  }
}

export default function Person() {
  const router = useRouter();
  const { personId } = router.query;
  const [person, setPerson] = useState<any>();

  useEffect(() => {
    getPerson(personId as string).then(person => setPerson(person));
  }, [personId]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <PrevButton href="/" />

          {!person && <CenteredSpinner />}
          {person && <div>
            <h2>
              My Dates with {person.name}
            </h2>
            <p>You met {person.name} through {getContext(person)} {getContextEmoji(person.context)}</p>
            <div className={styles.grid}>
              {person.dates.map((d: any) => <Card className={styles.card} key={d.id} background="light-1">
                <Button hoverIndicator onClick={() => router.push(`/person/${personId}/date/${d.id}`)}>
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
                </Button>
              </Card>)}

              <Card className={styles.card} background="light-1">
                <Button className={styles.addButton} hoverIndicator icon={<Add />} onClick={() => router.push(`/person/${personId}/date/new`)} />
              </Card>
            </div>
          </div>}
        </div>
      </main>

    </div>
  )
}
