import { Button, Card, CardBody, CardHeader } from 'grommet';
import { Add } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getPersons, Person } from '../store';
import styles from '../styles/Home.module.css';
import { formatDate } from './person/util';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersons().then(parsed => {
      setData(parsed);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>
          My Dates
        </h2>

        <div className={styles.grid}>
          {data.map(d =>
            <Card className={styles.card} key={d.id} background="light-1">
              <Button hoverIndicator onClick={() => router.push(`/person/${d.id}`)}>
                <CardHeader
                  className={styles.cardHeader}
                  pad={{ top: "large", left: "large", right: "large", bottom: "small" }}
                >
                  {d.name}
                </CardHeader>
                <CardBody pad={{ left: "large", bottom: "large", right: "large", top: "small" }}>
                  <div>{d.dates.length} {d.dates.length === 1 ? "date" : "dates"}</div>
                  <div>{formatDate(d.dates[0].date)}</div>
                </CardBody>
              </Button>
            </Card>
          )}

          <Card className={styles.card} background="light-1">
            <Button className={styles.addButton} hoverIndicator icon={<Add />} onClick={() => router.push("/person/new/1")} />
          </Card>

        </div>
      </main>

    </div>
  )
}
