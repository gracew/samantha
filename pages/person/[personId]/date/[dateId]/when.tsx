import { DateInput, RadioButtonGroup } from 'grommet';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Step } from '../../../../../components/step';
import { addDate, getDate, getPerson, updateDate } from '../../../../../store';
import styles from '../../../../../styles/Form.module.css';

export default function NewDate() {
  const [calendarDate, setCalendarDate] = useState((new Date()).toISOString());
  const [time, setTime] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;

  const [name, setName] = useState("");
  const [existingDate, setExistingDate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPerson(personId as string).then(parsed => setName(parsed.name));
    getDate(dateId as string).then(date => {
      if (date) {
        setExistingDate(true);
        setCalendarDate(date.date);
        setTime(date.time);
      }
    });
  }, [personId, dateId]);

  async function onNext() {
    setLoading(true);
    if (!existingDate) {
      await addDate({ id: dateId as string, person_id: personId as string, date: calendarDate, time });
    } else {
      await updateDate(dateId as string, { date: calendarDate, time });
    }
    router.push(`/person/${personId}/date/${dateId}/where`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Next"
          onNext={onNext}
          nextDisabled={calendarDate === "" || time === ""}
          backHref={`/person/${personId}`}
          loading={loading}
        >
          <h2>
            When was your date with {name}?
          </h2>

          <DateInput
            format="mm/dd/yyyy"
            calendarProps={{ bounds: [moment().subtract(6, "months").format(), moment().format()] }}
            value={calendarDate}
            onChange={({ value }) => setCalendarDate(value as string)}
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
