import { Button, Card, CardBody, CardFooter, CardHeader, DateInput, RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../components/step';
import { addDate, getPerson } from '../../store';
import styles from '../../styles/Home.module.css';
import { Add } from 'grommet-icons';
import moment from 'moment';

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
            <h2>
              My Dates with {person.name}
            </h2>

            <div className={styles.grid}>
              {person.dates.map((d: any) => <Card key={d.id} background="light-1">
                <CardHeader pad="medium">
                  {moment(d.date).format("MMMM DD")}
                </CardHeader>
                <CardBody pad="medium">
                  <div>{d.time}</div>
                  <div>{d.location}</div>
                </CardBody>
              </Card>)}

              <Card background="light-1">
                <CardHeader pad="medium">
                  Add a date
                </CardHeader>
                <CardFooter background="light-2">
                  <Button hoverIndicator icon={<Add />} onClick={() => router.push(`/person/${personId}/date/new`)} />
                </CardFooter>
              </Card>
            </div>
          </div>}
      </main>

    </div>
  )
}
