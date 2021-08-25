import { Box, Button, Card, Drop, List } from 'grommet';
import { Add, Archive, TextAlignFull, UnorderedList } from 'grommet-icons';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonWithSpinner } from '../../components/buttonWithSpinner';
import CenteredSpinner from '../../components/centeredSpinner';
import PrevButton from '../../components/prevButton';
import { archiveQuestion, getQuestions } from '../../store';
import styles from '../../styles/Form.module.css';

export default function Questions() {
  const ref = useRef();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [idToArchive, setIdToArchive] = useState();
  const [archiveLoading, setArchiveLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getQuestions().then((res) => {
      setQuestions(res);
      setLoading(false);
    });
  }, []);

  function renderQuestion(q: any) {
    return <div className={styles.question}>
      <div>
        <span className={styles.questionType}>{q.type === "multiple-choice" ? <UnorderedList size="20px" /> : <TextAlignFull size="20px" />}</span>
        {q.question}
      </div>
      <Button
        plain
        onClick={() => { setOpenDrop(true); setIdToArchive(q.id) }}
        children={({ hover }: any) => hover ? <Archive size="20px" color="#cb444a" /> : <Archive size="20px" />}
      />
    </div>;
  }

  async function onArchive() {
    setArchiveLoading(true);
    await archiveQuestion(idToArchive!);
    setArchiveLoading(false);
    getQuestions().then(setQuestions);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}
      >
        <PrevButton href="/" />
        <h2>My Questions</h2>
        <div className={styles.descriptionText}>
          Customize your reflections with questions that matter to you.
        </div>

        {loading && <CenteredSpinner />}
        {!loading && <Card background="light-1" className={styles.questionsCard}>
          <List
            ref={ref as any}
            data={questions}
            children={renderQuestion}
          />
        </Card>}
        {openDrop && <Drop
          stretch="align"
          round={true}
          target={ref.current}
          onClickOutside={() => setOpenDrop(false)}
          onEsc={() => setOpenDrop(false)}
        >
          <Box pad={{ horizontal: "medium", top: "small", bottom: "medium" }}>
            <h3>Are you sure you want to archive this question?</h3>
            <div>Archiving means you won't see this question when adding new dates, but we'll still keep your answers for previous dates!</div>
            <ButtonWithSpinner
              className={styles.confirmArchiveButton}
              onClick={onArchive}
              label={`Archive "${questions.find(q => q.id === idToArchive)?.question}"`}
              loading={archiveLoading}
            />
          </Box>
        </Drop>}
        <Button className={styles.newQuestionButton} onClick={() => router.push("/questions/new")} label={<Add />} primary color="white" />
      </main>
    </div >
  )
}