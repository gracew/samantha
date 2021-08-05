import { Button, Card, CardBody, CardHeader } from 'grommet';
import { Add, Calendar } from 'grommet-icons';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { data } from '../store';
import styles from '../styles/Home.module.css';
import { formatDate } from './person/util';

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>
          My Dates
        </h2>

        <div className={styles.grid}>
          {data.map(d =>
            <Card key={d.id} background="light-1">
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

          <Card className={styles.addButton} background="light-1">
            <Button hoverIndicator icon={<Add />} onClick={() => router.push("/person/new/1")} />
          </Card>
        </div>
      </main>

    </div>
  )
}
