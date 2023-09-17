import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import LikesAndDislikes from "../components/LikesAndDislikes";
import FlavourProfile from "@/components/FlavourProfile";
import Allergens from "@/components/Allergens";

export default function Preferences() {
  const [step, setStep] = useState(0);
 


const steps = [
  LikesAndDislikes,
  () => (
    <div className='flex flex-col justify-center items-center'>
          <br></br>
          <FlavourProfile onSubmit={() => setStep(step + 1)} onClose={() => setStep(step - 1)} />
    </div>
  ),
  () => (
    <>
      <p>Any allergens?</p>
      <p>Coming soon...</p>
    </>
  ),
  () => (
    <>
      <p>Ready to get recommendations?</p>

      <Link href="/recommendations">
        <button className="p-2 bg-blue-100 rounded-3xl text-blue-500 w-[120px]">
          {"Let's go!"}
        </button>
      </Link>
    </>
  ),
];

function RenderCurrentStep() {
  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];

  return (
    <div className="p-8">
      <div className="mb-8">
        <CurrentStep />
      </div>

      <div className="flex justify-end">
        <div className="flex flex-row gap-4">
          {step !== 0 && (
            <StepControlButton onClick={() => setStep(step - 1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"
                />
              </svg>
            </StepControlButton>
          )}

          {step < steps.length - 1 && (
            <StepControlButton onClick={() => setStep(step + 1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
                />
              </svg>
            </StepControlButton>
          )}
        </div>
      </div>
    </div>
  );
}

function StepControlButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="flex items-center justify-center p-2 bg-custom-orange rounded-3xl text-blue-50 w-[120px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
  return (
    <div className="flex flex-1 flex-col h-full bg-gray-300"> 
      <Head>
        <title>Mixo Mate | Preferences</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <RenderCurrentStep />
      </main>
    </div>
  );
}