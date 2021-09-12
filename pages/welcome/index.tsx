import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Step } from '../../components/step';
import styles from '../../styles/Form.module.css';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Step label="Let's go!" onNext={() => router.push("/welcome/goals")}>
          <h2>👋</h2>
          <p>
            Hi, I’m Samantha and I’m excited to meet you!
          </p>
          <p>
            Together, we'll work on helping you meet your connection goals.
          </p>
          <p>
            Not only will this be a place for you to record important information and meaningfully reflect upon your
            dates... you'll also get helpful nudges and personalized insights about your dating patterns. The more
            you share with me, the more value you'll receive over time.
          </p>
          <p>
            Like a good friend you trust, everything here is confidential and will never be shared. It’s just here for you
            as one more helpful tool in your kit.
          </p>
          <p>
            So let’s begin with a few quick questions to learn about what you're looking for and where you are currently
            in your dating journey.
          </p>
        </Step>
      </main>
    </div >
  )
}