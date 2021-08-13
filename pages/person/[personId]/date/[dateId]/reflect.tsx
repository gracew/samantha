import { RadioButtonGroup, TextArea } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../../../../components/step';
import { getPerson, updateDate } from '../../../../../store';
import styles from '../../../../../styles/Form.module.css';

export const questions = [
  {
    id: "comfort",
    question: (name: string) => `Did you feel comfortable around ${name}?`,
    options: [
      "Yes, felt like we'd known each other forever!",
      "Somewhat",
      "No",
      "Not sure",
    ],
  },
  {
    id: "genuine",
    question: (name: string) => `Did you feel ${name} was genuine?`,
    options: [
      "Yes",
      "Somewhat",
      "No",
      "Not sure",
    ],
  },
  {
    id: "learn_you",
    question: (name: string) => `Did you feel ${name} aimed to learn about you?`,
    options: [
      "Yes",
      "Somewhat",
      "No",
      "Not sure",
    ],
  },
  {
    id: "fun",
    question: (name: string) => `Did you have fun?`,
    options: [
      "Yes!",
      "Somewhat",
      "No",
      "Not sure",
    ],
  },
  {
    id: "learn_them",
    question: (name: string) => `Are you curious to learn more about ${name}?`,
    options: [
      "Yes",
      "Somewhat",
      "No",
      "Not sure",
    ],
  },
  {
    id: "physical",
    question: (name: string) => `Did you feel some level of physical attraction?`,
    options: [
      "A lot!",
      "Some",
      "Absolutely not",
      "Not sure",
    ],
  },
  {
    id: "notes",
    question: (name: string) => `Thanks for reflecting on your date with ${name}!`,
    description: "Notes",
    optional: true,
  }
]
export default function DateReflection() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPerson(personId as string).then(p => setName(p!.name));
  });

  async function onNext() {
    setLoading(true);
    await updateDate(dateId as string, { reflection: { [questions[step].id]: value } });
    if (step === questions.length - 1) {
      router.push(`/person/${personId}`);
    } else {
      setLoading(false);
      setStep(step + 1);
      setValue("");
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label={step === questions.length - 1 ? "Done" : "Next"}
          onNext={onNext}
          nextDisabled={!questions[step].optional && value === ""}
          backHref="/"
          loading={loading}
          progress={(step + 2) / (questions.length + 2) * 100}
        >
          <h2>
            {questions[step].question(name as string)}
          </h2>
          {questions[step].options && <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="date-question"
            options={questions[step].options!}
            value={value}
            onChange={e => setValue(e.target.value)}
          />}
          {!questions[step].options && <div>
            <p className={styles.descriptionText}>Is there anything else you want to make a note of?</p>
            <TextArea
              rows={6}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>}
        </Step>
      </main>

    </div>
  )
}
