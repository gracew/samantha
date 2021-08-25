import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../components/step';
import { addQuestion } from '../../store';
import styles from '../../styles/Form.module.css';

export default function Questions() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  async function onNext() {
    setLoading(true);
    await addQuestion(question, type);
    router.push("/questions");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Add"
          onNext={onNext}
          nextDisabled={question === "" || type === ""}
          backHref="/questions"
          loading={loading}
        >

          <h2>
            What type of question are you adding?
          </h2>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="question-type"
            options={[
              { value: "multiple-choice", label: "Multiple choice (Yes, Somewhat, No, Not sure)" },
              { value: "text", label: "Free text" },
            ]}
            value={type}
            onChange={e => setType(e.target.value)}
          />

          <h2>
            Ask your question:
          </h2>

          <TextInput placeholder="Are they close to their family?" value={question} onChange={e => setQuestion(e.target.value)} />
        </Step>
      </main>
    </div>
  )
}