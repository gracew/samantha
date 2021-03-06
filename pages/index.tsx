import { Button, Card, CardBody, CardHeader } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import * as uuid from "uuid";
import CenteredSpinner from '../components/centeredSpinner';
import MobileNavbar from '../components/mobileNavbar';
import { formatDate } from '../components/util';
import { getPersons, Person } from '../store';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [persons, setPersons] = useState<Person[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersons().then(parsed => {
      setPersons(parsed);
      setLoading(false);
    });
  }, []);

  async function onAddPerson() {
    router.push(`/person/${uuid.v4()}/edit`);
  }

  return (
    <div>

      <MobileNavbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.buttonMenu}>
            <h2>
              My Dates
            </h2>
            <div>
              <Button
                primary
                label={showArchived ? <div className={styles.inlineIcon}><Checkmark size="18px" />Archived</div> : <div>Archived</div>}
                onClick={() => setShowArchived(!showArchived)}
              />
            </div>
          </div>

          {loading && <CenteredSpinner />}
          {!loading && <div className={styles.grid}>
            {persons
              .filter(person => showArchived ? true : person.archived === false)
              .map(person =>
                <Card className={styles.card} key={person.id} background="light-1">
                  <Button className={styles.cardButton} hoverIndicator onClick={() => router.push(`/person/${person.id}`)}>
                    <CardHeader
                      className={styles.cardHeader}
                      pad={{ top: "large", left: "large", right: "large", bottom: "small" }}
                    >
                      {person.name}
                    </CardHeader>
                    <CardBody pad={{ left: "large", bottom: "large", right: "large", top: "small" }}>
                      <div>{person.dates.length} {person.dates.length === 1 ? "date" : "dates"}</div>
                      {person.dates.length > 0 && <div>{formatDate(person.dates[0].date)}</div>}
                    </CardBody>
                  </Button>
                </Card>
              )}
            <Card className={styles.card} background="light-1">
              <Button className={styles.addButton} hoverIndicator icon={<Add />} onClick={onAddPerson} />
            </Card>
          </div>}
        </main>
      </div>
    </div>
  )
}
