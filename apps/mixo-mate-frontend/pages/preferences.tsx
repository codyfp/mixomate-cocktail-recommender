import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { UserApi } from "@/clientApi/UserApi";
import { useAuth } from "@/clientApi/hooks/useAuth";
import { FlavourProfile as FlavourProfileEnum } from '@/clientApi/CocktailApi';
import { Ingredient } from "@/clientApi/IngredientApi";
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';

const LikesAndDislikes = dynamic(() => import("../components/LikesAndDislikes"), { ssr: false });
const FlavourProfile = dynamic(() => import("../components/FlavourProfile"), { ssr: false });
const Allergens = dynamic(() => import("../components/Allergens"), { ssr: false });

export default function Preferences() {
  const [step, setStep] = useState(0);
  const { currentUser } = useAuth();

  const userApi = new UserApi();
  const [likes, setLikes] = useState<Ingredient[]>([]);
  const [dislikes, setDislikes] = useState<Ingredient[]>([]);
  const [allergens, setAllergens] = useState<Ingredient[]>([]);
  const [flavourProfileChips, setFlavourProfileChips] = useState(Object.values(FlavourProfileEnum).map((FlavourProfileEnum) => {
    return { label: FlavourProfileEnum, selected: false }
  }));

  useEffect(() => {
    if (currentUser?.likes) {
      setLikes(currentUser.likes)
    }
    if (currentUser?.dislikes) {
      setDislikes(currentUser.dislikes)
    }
    if (currentUser?.allergens) {
      setAllergens(currentUser.allergens)
    }
    if (currentUser?.flavourProfile && currentUser?.flavourProfile.length > 0) {
      const selectedChips = flavourProfileChips.map(chip => {
        if (currentUser.flavourProfile?.includes(chip.label)) {
          chip.selected = true;
        }
        return chip;
      })
      setFlavourProfileChips(selectedChips)
    }
  }, [currentUser])

  const handleSaveLikes = (likes: Ingredient[], dislikes: Ingredient[]) => {
    const likesIds = likes.map(ingredient => ingredient.id ? ingredient.id : ingredient.name)
    const dislikesIds = dislikes.map(ingredient => ingredient.id ? ingredient.id : ingredient.name)
    userApi.setLikesAndDislikes(likesIds, dislikesIds);
  }

  const handleSaveAllergens = (allergens: Ingredient[]) => {
    const allergensIds = allergens.map(ingredient => ingredient.id ? ingredient.id : ingredient.name)
    userApi.setAllergens(allergensIds);
  }

  const steps = [
    {
      RenderComponent: LikesAndDislikes,
      props: {
        likes,
        setLikes,
        dislikes,
        setDislikes,
      },
      handleNext: () => {
        setStep(step + 1);
        handleSaveLikes(likes, dislikes);
      },
    },
    {
      RenderComponent: FlavourProfile,
      props: {
        chipData: flavourProfileChips,
        setChipData: setFlavourProfileChips,
        toggleChipSelection: (index: number) => {
          const newChipData = [...flavourProfileChips]
          newChipData[index].selected = !newChipData[index].selected
          setFlavourProfileChips(newChipData)
        }
      },
      handleNext: () => {
        setStep(step + 1);
        const selectedChips = flavourProfileChips.filter(chip => chip.selected).map(chip => chip.label)
        userApi.setFlavourProfile(selectedChips);
      }
    },
    {
      RenderComponent: Allergens,
      props: {
        allergens,
        setAllergens,
        skipStep: () => {
          setStep(step + 1);
          userApi.setAllergens([]);
        }
      },
      handleNext: () => {
        setStep(step + 1);
        handleSaveAllergens(allergens);
      },
    },
    {
      RenderComponent: () => (
        <>
          <div className="bg-gray-100 p-6 space-y-6">

            <Card title="Ready to get recommendations?" className="bg-white shadow-lg p-4 rounded-md">
              <p className="text-gray-700 text-lg">
                Discover tailored cocktail recommendations based on your preferences. Let's fine-tune your taste!
              </p>
            </Card>

            <Card title="Frequently Asked Questions" className="bg-white shadow-lg p-4 rounded-md space-y-2">
              <Accordion>
                <AccordionTab header="How do we choose your recommendations?" className="border-t border-gray-200">
                  <p className="text-gray-600">We use a sophisticated algorithm considering your likes, dislikes, and other preferences.</p>
                </AccordionTab>
                <AccordionTab header="Can I change my preferences later?" className="border-t border-gray-200">
                  <p className="text-gray-600">Absolutely! Your taste, our recommendations. Adjust anytime you want.</p>
                </AccordionTab>
                <AccordionTab header="How are the cocktail recommendations generated?" className="border-t border-gray-200">
                  <p className="text-gray-600">We use a combination of user preferences, expert insights, and proprietary algorithms to generate tailored cocktail recommendations for each user.</p>
                </AccordionTab>
                <AccordionTab header="Can I modify my flavor preferences?" className="border-t border-gray-200">
                  <p className="text-gray-600">Yes, you can always go to the preferences section and update your flavor profile to get updated recommendations.</p>
                </AccordionTab>
                <AccordionTab header="Are allergen restrictions considered in the recommendations?" className="border-t border-gray-200">
                  <p className="text-gray-600">Absolutely! We take user safety seriously. If you've added any allergens in your profile, the recommended cocktails will avoid those ingredients.</p>
                </AccordionTab>
                <AccordionTab header="How often are new cocktails added to the recommendations?" className="border-t border-gray-200">
                  <p className="text-gray-600">We constantly update our database with new cocktails based on seasons, trends, and user feedback. Keep checking back for fresh recommendations!</p>
                </AccordionTab>
              </Accordion>
            </Card>

            <div className="flex justify-center items-center">
              <Link href="/recommendations">
                <button className="p-4 bg-custom-orange text-white font-semibold rounded-full hover:bg-blue-600 active:bg-blue-700 transition duration-300 ease-in-out shadow-md">
                  {"Let's go!"}
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    },
  ];

  function RenderCurrentStep() {
    const { RenderComponent, props, handleNext = () => setStep(step + 1) } = steps[step];

    return (
      <div className="p-8">
        <div className="mb-8">
          {/* TS error but idk how to fix atm */}
          <RenderComponent {...props} />
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
              <StepControlButton onClick={() => handleNext()}>
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