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

  const progress = (step / 3) * 100;

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

          <Card title="Ready to get recommendations?">
            <p>
              Discover tailored cocktail recommendations based on your preferences. Let's fine-tune your taste!
              </p>
          </Card>

          <br></br>

          <Card title="Frequently Asked Questions">
            <Accordion>
                <AccordionTab header="How do we choose your recommendations?">
                    We use a sophisticated algorithm considering your likes, dislikes, and other preferences.
                </AccordionTab>
                <AccordionTab header="Can I change my preferences later?">
                    Absolutely! Your taste, our recommendations. Adjust anytime you want.
                </AccordionTab>
            </Accordion>
          </Card>

          <br></br>

          <Link href="/recommendations" className="flex justify-center items-center">
              <button className="p-4 bg-blue-200 rounded-full text-blue-600 hover:bg-blue-300 transition duration-300 ease-in-out shadow-lg">
                  {"Let's go!"}
              </button>
          </Link>
          
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