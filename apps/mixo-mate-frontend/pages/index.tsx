import { FormEvent, MouseEvent, useState } from 'react'
import { useAuth } from '@/clientApi/hooks/useAuth';
import Head from 'next/head'
import Link from 'next/link';

export default function Home() {
  const { userApi, loading: isAuthLoading, currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Head>
        <title>Mixo Mate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex self-center justify-center h-full bg-gray-300 w-full'>
        {currentUser?.username ? (
          <div className='mt-10 flex flex-col gap-5 justify-between'>
            <div className='text-yellow-500'>
              Welcome <span className='text-black'>{currentUser.username}</span>!
            </div>
            <Link
              href='/preferences'
              className='text-brand underline'
            >
              Go to Preferences
            </Link>
            <div className='text-gray-300 mt-auto mb-2'>
              Not you?&nbsp;
              <button
                onClick={() => userApi && userApi.logout()}
                className='underline'
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col mt-10 bg-white h-max p-4 rounded-3xl shadow'>
            <h1 className='text-xl mb-2 font-medium'>Welcome to MixoMate!</h1>
            <input type="text" placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="password" placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <div className='flex flex-row gap-3 m-4'>
              <button
                onClick={() => userApi && userApi.login(username, password)}
                className='rounded-3xl p-2 bg-yellow-500 text-white border-yellow-500 border-2 w-20'>
                Login
              </button>
              <button
                className='rounded-3xl p-2 text-yellow-500 border-yellow-500 border-2 w-20'>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
