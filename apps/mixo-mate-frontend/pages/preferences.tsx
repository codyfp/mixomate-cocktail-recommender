import React, { useState } from "react";
import Head from "next/head";
import LikesEntry from "../components/LikesEntry";
import Link from "next/link";

export default function Preferences() {
  const [step, setStep] = useState(0);

  const ControlButtons: React.FunctionComponent<{ isLastStep?: Boolean }> = ({ isLastStep = false }) => {
    return (
      <div className='flex flex-row gap-4'>
        {step != 0 && <button className='p-2 bg-blue-500 rounded-3xl text-blue-50 w-[120px]' onClick={() => setStep(step - 1)}>Back</button>}
        {!isLastStep && <button className='p-2 bg-blue-500 rounded-3xl text-blue-50 w-[120px]' onClick={() => setStep(step + 1)}>Next</button>}
      </div>
    )
  }

  const RenderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <div className='flex flex-col'>
            <p>What do you like?</p>
            <LikesEntry />
            <ControlButtons />
          </div>
        )
      case 1:
        return (
          <div className='flex flex-col'>
            <p>What do you dislike?</p>
            <p>Coming soon...</p>
            <ControlButtons />
          </div>
        )
      case 2:
        return (
          <div className='flex flex-col'>
            <p>Any allergens?</p>
            <p>Coming soon...</p>
            <ControlButtons />
          </div>
        )
      default:
        return (
          <div className='flex flex-col'>
            <p>Ready to get recommendations?</p>
            <Link href='/recommendations'>
              <button className='p-2 bg-blue-100 rounded-3xl text-blue-500 w-[120px]'>{"Let's go!"}</button>
            </Link>
            <ControlButtons isLastStep={true} />
          </div>
        )
    }
  }

  return (
    <div>
      <Head>
        <title>Mixo Mate | Preferences</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <p>Preferences</p>
          <p>Coming soon...</p>
        </div>
        <RenderCurrentStep />
      </main>
    </div>
  )
}