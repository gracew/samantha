import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../../../components/step';
import { updateDate } from '../../../../../store';
import styles from '../../../../../styles/Form.module.css';
import { questions } from './reflect';

export enum Where {
  PhoneCall = "Phone call",
  VideoCall = "Video call",
  Park = "Park",
  Bar = "Bar",
  Restaurant = "Restaurant",
  Cafe = "Cafe",
  Museum = "Museum",
  SomewhereElse = "Somewhere else"
}

export default function DateLocation() {
  const [location, setLocation] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;
  const [loading, setLoading] = useState(false);

  async function onNext() {
    setLoading(true);
    await updateDate(dateId as string, { location, location_other: other });
    router.push(`/person/${personId}/date/${dateId}/reflect`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Next"
          onNext={onNext}
          nextDisabled={location === "" || (location === Where.SomewhereElse && other === "")}
          backHref={"/"}
          loading={loading}
          progress={1 / (questions.length + 2) * 100}
        >
          <h2>
            Where did you meet for your date?
          </h2>
          <RadioButtonGroup
            className={styles.radioButtonGroup}
            name="date-where"
            options={Object.values(Where)}
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          {location === Where.SomewhereElse && <TextInput
            style={{ marginTop: "10px" }}
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>

    </div>
  )
}
