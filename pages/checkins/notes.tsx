import { TextArea } from 'grommet';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { emotionDict } from '.';
import { Step } from '../../components/step';
import styles from '../../styles/Form.module.css';

export default function Notes() {
  const [text, setText] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { emotion } = router.query;

  async function handleSubmit() {
    setLoading(true);
    await fetch("/api/addCheckin", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ emotion, notes: text }),
    });
    setLoading(false);
    router.push("/checkins");
  }

  function getAffirmation(emotion:string){
    const affirmation: Record<string, Array<string>> = {
      Happy: ["Ride that high sunshine!",
      "When you're in your flow, you'll continue to glow",
      "You're in that flow and you've got that glow"],
      Excited: ["It's easy to thrive when we feel alive",
      "Love springs from the inside"],
      Inspired: ["The world's your oyster!",
      "Anything is possible!"],
      Unsure: ["It's okay not to know.",
      "Slow and steady wins the race.",
      "Introspection can provide answers.",
      "Take it one day at a time."],
      Bored: ["Boredom is a pattern, not a reality.",
      "The cure for boredom is curiosity",
      "Boredom hits everyone from time to time.",
      '"Isn\'t history ultimately the result of our fear of boredom?"- Emily M. Cioran'],
      Anxious: ["Trust yourself. You've survived a lot, and you'll survive whatever is coming.",
      "Just when the caterpillar thought the world was ending, he turned into a butterfly.", "You cannot always control what goes on outside, but you can always control what goes on inside.", "Feelings come and go like clouds in a windy sky."],
      Angry: ["Not every bridge needs a fire.",
      "This too shall pass",
      "We boil at different degrees",
      "Anger can bring about momentum for change"],
      Stress: ["Don't worry",
      "Calmness is the cradle of power.",
      "Breathe in, breathe out."],
      Sad:["The road can be rough, but it gets smoother.",
      "This too shall pass",
      "There's light at the end of the tunnel",
      "Even the darkest night will end and the sun will rise."]
    }

    let random = 0

    switch(emotion){
      case "Happy":
        random = Math.floor(Math.random()*affirmation.Happy.length)
        return affirmation.Happy[random]
      case "Excited":
        random = Math.floor(Math.random()*affirmation.Excited.length)
        return affirmation.Excited[random]
      case "Inspired":
        random = Math.floor(Math.random()*affirmation.Inspired.length)
        return affirmation.Inspired[random]
      case "Unsure":
        random = Math.floor(Math.random()*affirmation.Unsure.length)
        return affirmation.Unsure[random]
      case "Bored":
        random = Math.floor(Math.random()*affirmation.Bored.length)
        return affirmation.Bored[random]
      case "Anxious":
        random = Math.floor(Math.random()*affirmation.Anxious.length)
        return affirmation.Anxious[random]
      case "Angry":
        random = Math.floor(Math.random()*affirmation.Angry.length)
        return affirmation.Angry[random] 
      case "Stressed":
        random = Math.floor(Math.random()*affirmation.Stress.length)
        return affirmation.Stress[random]
      case "Sad":
        random = Math.floor(Math.random()*affirmation.Sad.length)
        return affirmation.Sad[random] 
    }

  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step
          label="Done"
          onNext={handleSubmit}
          backHref="/checkins/new"
          loading={loading}
          nextDisabled={false}
        >
          <h2>{emotionDict[emotion as string]} {emotion}</h2>
          <p>{getAffirmation(emotion as string)}</p>
          <TextArea
            rows={6}
            placeholder="Add a note..."
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </Step>
      </main>
    </div>
  )
}