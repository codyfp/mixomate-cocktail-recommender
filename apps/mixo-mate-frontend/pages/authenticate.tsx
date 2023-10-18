import { useState } from 'react';
import { useAuth } from '@/clientApi/hooks/useAuth';
import Link from 'next/link';

function Authentication() {
  const { authApi, currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!authApi) {
      return;
    }

    try {
      await authApi.login(username, password);
      window.location.replace('/preferences');
    } catch (error) {
      window.alert(error?.message);
    }
  }

  const handleSignup = async () => {
    if (!authApi) {
      return;
    }

    try {
      await authApi.create(username, password);
      window.location.replace('/preferences');
    } catch (error) {
      window.alert(error?.message);
    }
  }

  return (
    <div className='flex flex-col mt-10 bg-white h-max p-4 rounded-3xl shadow'>
      <h1 className='text-xl mb-2 font-medium'>Welcome to MixoMate!</h1>
      <input
        type="text"
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
          }
        }}
      />
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
          }
        }}
      />
      <div className='flex flex-row gap-3 m-4'>
        <button
          onClick={handleLogin}
          className='rounded-3xl p-2 bg-yellow-500 text-white border-yellow-500 border-2 w-20'>
          Login
        </button>
        <button
          onClick={handleSignup}
          className='rounded-3xl p-2 text-yellow-500 border-yellow-500 border-2 w-20'>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Authentication;
