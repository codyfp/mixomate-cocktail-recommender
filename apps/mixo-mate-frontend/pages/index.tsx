import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const list = [
    "Pick your preferences",
    "Build your flavour profile",
    "Enjoy hundreds of recommendations!",
    "No experience required",
  ];

  const goToAuth = () => router.push("/authenticate");

  return (
    <>
      <Head>
        <title>Mixo Mate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[left_-80px] text-white py-20 px-16 flex flex-1 h-full w-full">

        <Image
          className='z-0'
          src="/images/index-background.jpg"
          alt='Background image'
          layout='fill'
          objectFit='cover'
          objectPosition='cover'
        />

        <div className="flex flex-1 flex-col justify-between h-full w-full z-10">
          <h1 className="x-title !text-7xl">MIXOMATE</h1>

          <button
            className="x-title bg-red-900 w-max py-5 px-12 rounded-3xl hover:bg-red-950"
            onClick={goToAuth}
          >
            Get Started!
          </button>
        </div>

        <div className="flex flex-col gap-3 w-[380px] py-20 z-10">
          <p className="x-title">Why Mixomate?</p>

          <ul className="x-title list-disc pl-10">
            {list.map((item) => (
              <li key={item} className="my-5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
