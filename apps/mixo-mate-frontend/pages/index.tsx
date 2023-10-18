import Head from 'next/head';
import dynamic from 'next/dynamic';

const Authentication = dynamic(() => import('./authenticate'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Mixo Mate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
