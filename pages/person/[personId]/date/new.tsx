import { DateInput, RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../../../components/step';
import { addDate, getPerson } from '../../../../store';
import styles from '../../../../styles/Form.module.css';

export default function NewDate() {
  const [date, setDate] = useState((new Date()).toISOString());
  const [time, setTime] = useState("");
  const router = useRouter();
  const { personId } = router.query;
  const [name, setName] = useState("");

  useEffect(() => {
    const person = getPerson(personId as string);
    setName(person!.name);
  });

  function onNext() {
    const dateId = addDate(personId as string, { date, time });
    router.push(`/person/${personId}/date/${dateId}/where`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} nextDisabled={date === "" || time === ""} backHref="/">
          <h2>
            When was your date with {name}?
          </h2>

          <DateInput
            format="mm/dd/yyyy"
            value={date}
            onChange={({ value }) => setDate(value as string)}
          />

          <h2>
            What time of day was your date?
          </h2>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="date-time"
            options={["Morning", "Lunch", "Afternoon", "Dinner", "Evening", "Late evening"]}
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </Step>
      </main>

    </div>
  )
}
