import { Card, CardBody, CardHeader } from 'grommet';
import { Clock } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import CenteredSpinner from '../../../../components/centeredSpinner';
import PrevButton from '../../../../components/prevButton';
import { formatDate } from '../../../../components/util';
import { getDate, getPerson, getQuestions, Person, Question } from '../../../../store';
import styles from '../../../../styles/Date.module.css';
import { getIcon } from '../../[personId]';
import { baseQuestions } from './[dateId]/reflect';

export default function Date() {
  const router = useRouter();
  const { dateId } = router.query;
  const [date, setDate] = useState<any>();
  const { personId } = router.query;
  const [person, setPerson] = useState<Person>();
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questions, setQuestions] = useState(baseQuestions);

  useEffect(() => {
    getPerson(personId as string).then(p => setPerson(p));
    getDate(dateId as string).then(date => setDate(date));
    // kepe the "notes" question last
    getQuestions().then(customQuestions => {
      setQuestions(baseQuestions.splice(questions.length - 1, 0, customQuestions.map((custom: Question) => ({
        id: custom.id,
        question: (name: string) => custom.question,
        options: custom.type === "multiple-choice" ? ["Yes", "Somewhat", "No", "Not sure"] : undefined,
      }))));
      setQuestionsLoading(false);
    });
  }, [dateId, personId]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PrevButton href={`/person/${personId}`} />
        {(!person || !date || questionsLoading) && <CenteredSpinner />}
        {person && date && !questionsLoading &&
          <div>
            <h2>Date {formatDate(date.date, true)} with {person.name}</h2>
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
                <CardBody className={styles.answer} pad={{ horizontal: "medium", top: "small", bottom: "medium" }}>
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