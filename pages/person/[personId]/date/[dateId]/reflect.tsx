import { RadioButtonGroup, TextArea } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../../../../components/step';
import { getPerson } from '../../../../../store';
import styles from '../../../../../styles/Home.module.css';

const questions = [
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
    id: "learn-you",
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
    id: "learn-them",
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
    question: (name: string) => `Thanks for taking the time to reflect on your date with ${name}! Is there anything else you want to make a note of?`,
  }
]
export default function DateReflection() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;
  const [name, setName] = useState("");

  useEffect(() => {
    const person = getPerson(personId as string);
    setName(person!.name);
  });

  function onNext() {
    // TODO(gracew): save to DB
    if (step === questions.length - 1) {
      router.push(`/`);
    } else {
      setStep(step + 1);
      setValue("");
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} onBack={() => router.push("/")}>
          <h2>
            {questions[step].question(name as string)}
          </h2>
          {questions[step].options && <RadioButtonGroup
            name="date-question"
            options={questions[step].options!}
            value={value}
            onChange={e => setValue(e.target.value)}
          />}
          {!questions[step].options && <TextArea />}
        </Step>
      </main>

    </div>
  )
}
