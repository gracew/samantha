import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { ButtonWithSpinner } from '../../components/buttonWithSpinner';
import styles from '../../styles/Form.module.css';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>👋</h2>
        <p>
          Hi, I’m Samantha and I’m excited to meet you!
        </p>
        <p>
          Together, we'll work on helping you meet your connection goals.
        </p>
        <p>
          This will be a place for you to record important information and reflect on your dates. Not only that,
          you'll also get helpful nudges and personalized insights about your dating patterns.
        </p>
        <p>
          Like a good friend you trust, everything here is confidential and will never be shared.
        </p>
        <p>
          So let’s begin with a few quick questions to learn about what you're looking for and where you are currently
          in your dating journey.
        </p>
        <div>
          <ButtonWithSpinner
            className={styles.nextButton}
            primary
            label="Let's go!"
            onClick={() => router.push("/welcome/goals")}
          />
        </div>
      </main>
    </div >
  )
}