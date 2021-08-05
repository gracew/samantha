import { RadioButtonGroup, TextInput } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { Step } from '../../../../../components/step';
import { updateDate } from '../../../../../store';
import styles from '../../../../../styles/Home.module.css';

enum Where {
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
  const [where, setWhere] = useState("");
  const [other, setOther] = useState("");
  const router = useRouter();
  const { personId, dateId } = router.query;

  function onNext() {
    updateDate(personId as string, dateId as string, { where, other });
    router.push(`/person/${personId}/date/${dateId}/reflect`);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step onNext={onNext} nextDisabled={where === "" || (where === Where.SomewhereElse && other === "")} backHref={"/"}>
          <h2>
            Where did you meet for your date?
          </h2>
          <RadioButtonGroup
            name="date-where"
            options={Object.values(Where)}
            value={where}
            onChange={e => setWhere(e.target.value)}
          />
          {where === Where.SomewhereElse && <TextInput
            style={{ marginTop: "10px" }}
            value={other}
            onChange={e => setOther(e.target.value)}
          />}
        </Step>
      </main>

    </div>
  )
}
