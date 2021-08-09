import { Add, Clock, Location,} from 'grommet-icons';
import { Button, Main, Heading, Paragraph } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PrevButton from '../../../../components/prevButton';
import { getDate, getPerson } from '../../../../store';
import styles from '../../../../styles/Home.module.css';
import { formatDate } from '../../util';
import Person from '../../[personId]';

export default function Date() {
    const router = useRouter();
    const { dateId } = router.query;
    const [date, setDate] = useState<any>();
    const { personId } = router.query;
    const [person, setPerson] = useState<any>();

    useEffect(() => {
        const date = getDate(personId as string,dateId as string);
        setDate(date);
        const person = getPerson(personId as string);
        setPerson(person);
      });


      return (
        <div className={styles.container}>
          <main className={styles.main}>
            {date &&
              <div>
                <PrevButton href="/" />
    
                <Main pad="large">
                  <Heading>Date on {date.date} with {person.name}</Heading>
                  <Paragraph className={styles.inlineIcon}> <Clock />{date.time}</Paragraph>
                  <Paragraph className={styles.inlineIcon}> <Location />{date.location}</Paragraph>
                  <Paragraph > Did you feel comfortable around {person.name}?: {date.comfort}</Paragraph>
                  <Paragraph > Did you feel {person.name} was genuine?: {date.genuine} </Paragraph>
                  <Paragraph > Did you feel {person.name} aimed to learn about you?: {date.you} </Paragraph>
                  <Paragraph > Did you have fun?: {date.fun} </Paragraph>
                  <Paragraph > Are you curious to learn more about {}?: {date.them} </Paragraph>
                  <Paragraph> Did you feel some level of physical attraction?: {date.physical} </Paragraph>
                  <Paragraph> Notes: {date.notes} </Paragraph>
                </Main>
            </div>
            }
        </main>
    </div>
    )
}