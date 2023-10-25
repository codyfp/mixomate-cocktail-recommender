import Link from "next/link";
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default () => (
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