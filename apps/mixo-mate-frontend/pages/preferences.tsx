import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { UserApi } from "@/clientApi/UserApi";
import { useAuth } from "@/clientApi/hooks/useAuth";
import { FlavourProfile as FlavourProfileEnum } from '@/clientApi/CocktailApi';
import { Ingredient } from "@/clientApi/IngredientApi";

import { Timeline } from 'primereact/timeline';
import { motion } from "framer-motion"

const LikesAndDislikes = dynamic(() => import("../components/LikesAndDislikes"), { ssr: false });
const FlavourProfile = dynamic(() => import("../components/FlavourProfile"), { ssr: false });
const Allergens = dynamic(() => import("../components/Allergens"), { ssr: false });
const FinalPreferences = dynamic(() => import("../components/FinalPreferences"), { ssr: false });

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
      key: "likesAndDislikes",
      title: "Likes & Dislikes"
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
      },
      key: "flavourProfile",
      title: "Flavour Profile"
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
      key: "allergens",
      title: "Allergens"
    },
    {
      RenderComponent: FinalPreferences,
      key: "getRecommendations",
      title: "Get Recommendations!"
    },
  ];

  function RenderCurrentStep() {
    const { RenderComponent, props, handleNext = () => setStep(step + 1) } = steps[step];

    return (
      <div className="p-8">
        <motion.div className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* TS error but idk how to fix atm */}
          <RenderComponent {...props} />
        </motion.div>

        <div className="flex justify-center w-full flex-row gap-4 items-center">
          <StepControlButton onClick={() => setStep(step - 1)} disabled={step == 0}>
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
          <div className="w-full">
            <Timeline
              marker={(content) => {
                const icon = content === steps[step].title ? "pi pi-circle-on" : "pi pi-circle-off";
                return (
                  <i className={`${icon} cursor-pointer text-dark-orange`} onClick={() => setStep(steps.findIndex(step => step.title === content))}></i>
                )
              }}
              value={["Likes & Dislikes", "Flavour Profile", "Allergens", "Get Recommendations!"]}
              layout="horizontal" align="top" className="w-full"
              content={(item) => {
                const additions = item === steps[step].title ? "text-dark-orange font-semibold" : "text-gray-500";
                return (<span className={`whitespace-nowrap ${additions}`} onClick={() => setStep(steps.findIndex(step => step.title === item))}>{item}</span>)
              }} />
          </div>
          <StepControlButton onClick={() => handleNext()} disabled={step == steps.length - 1}>
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
        </div>
      </div>
    );
  }

  function StepControlButton({
    onClick,
    children,
    disabled = false,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
  }) {
    return (
      <button
        className={`flex items-center justify-center p-2 bg-custom-orange rounded-3xl text-blue-50 w-[120px] h-10 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 active:bg-blue-700 transition duration-300 ease-in-out"}`}
        onClick={onClick}
        disabled={disabled}
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