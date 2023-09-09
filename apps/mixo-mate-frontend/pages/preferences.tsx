import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import LikesAndDislikes from "../components/LikesAndDislikes";
import FlavourProfile from "@/components/FlavourProfile";

export default function Preferences() {
  const [step, setStep] = useState(0);

  const ControlButtons: React.FunctionComponent<{ isLastStep?: Boolean }> = ({ isLastStep = false }) => {
    return (
      <div className='flex flex-row gap-4'>
        {step != 0 && <button className='p-2 bg-custom-orange rounded-3xl text-blue-50 w-[120px]' onClick={() => setStep(step - 1)}>Back</button>}
        {!isLastStep && <button className='p-2 bg-custom-orange rounded-3xl text-blue-50 w-[120px]' onClick={() => setStep(step + 1)}>Next</button>}
      </div>
    )
  }

  const RenderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <div className='flex flex-col'>
            <p>What do you like?</p>
            <LikesAndDislikes />
            <ControlButtons />
          </div>
        )
      case 1:
        return (
        <div className='flex flex-col justify-center items-center'>
          <FlavourProfile onSubmit={() => setStep(step + 1)} />            
          <br></br>
          <br></br>
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
        <br></br>
        <br></br>
        <RenderCurrentStep />
      </main>
    </div>
  )
}
