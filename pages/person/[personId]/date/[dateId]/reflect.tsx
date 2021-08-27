import { RadioButtonGroup, TextArea } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../../../../components/step';
import { getPerson, getQuestions, Question, updateDate } from '../../../../../store';
import styles from '../../../../../styles/Form.module.css';

interface ReflectionQuestion {
  id: string;
  question: (name: string) => string;
  description?: string;
  options?: string[];
  optional?: boolean;
}

export const baseQuestions: ReflectionQuestion[] = [
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
    description: "Is there anything else you want to make a note of?",
    optional: true,
  }
]
export default function DateReflection() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [allValues, setAllValues] = useState<Record<string, string>>({});
  const router = useRouter();
  const { personId, dateId } = router.query;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(baseQuestions);

  useEffect(() => {
    getPerson(personId as string).then(p => setName(p!.name));
    // keep the "notes" question last
    getQuestions().then(customQuestions =>
      setQuestions(baseQuestions.splice(questions.length - 1, 0, customQuestions.map((custom: Question) => ({
        id: custom.id,
        question: (name: string) => custom.question,
        options: custom.type === "multiple-choice" ? ["Yes", "Somewhat", "No", "Not sure"] : undefined,
      })))));
  }, [personId]);

  async function onBack() {
    if (step === 0) {
      router.push(`/person/${personId}/date/${dateId}/where`);
    } else {
      setStep(step - 1);
      setValue(allValues[questions[step - 1].id])
    }
  }

  async function onNext() {
    setLoading(true);
    setAllValues({ ...allValues, [questions[step].id]: value });
    await updateDate(dateId as string, { reflection: { [questions[step].id]: value } });
    if (step === questions.length - 1) {
      router.push(`/person/${personId}`);
    } else {
      setLoading(false);
      setStep(step + 1);
      setValue(allValues[questions[step + 1].id] || "");
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label={step === questions.length - 1 ? "Done" : "Next"}
          onNext={onNext}
          onBack={onBack}
          nextDisabled={!questions[step].optional && value === ""}
          loading={loading}
          progress={(step + 2) / (questions.length + 2) * 100}
        >
          <h2>
            {questions[step].question(name as string)}
          </h2>
          {questions[step].description && <p className={styles.descriptionText}>{questions[step].description}</p>}
          {questions[step].options && <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="date-question"
            options={questions[step].options!}
            value={value}
            onChange={e => setValue(e.target.value)}
          />}
          {!questions[step].options && <div>
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
