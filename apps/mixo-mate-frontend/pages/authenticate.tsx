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
      // hacky fix to avoid newly registered users seeing the likes and dislikes of previously logged in user.
      await authApi.create(username, password).then(async () => {
         await authApi.login(username, password);
      })
      window.location.replace('/preferences');
    } catch (error) {
      window.alert(error?.message);
    }
  }

  return (
    <div className='flex flex-col w-96 mx-auto mt-10 bg-gray-200 p-6 rounded-xl shadow-lg'>
      <h1 className='text-2xl mb-4 font-bold text-center'>Welcome to MixoMate!</h1>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">Username</label>
        <input
          id="username"
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
        <input
          id="password"
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className='flex justify-between mt-6'>
        <button
          onClick={handleLogin}
          className='w-1/2 px-4 py-2 mr-2 text-white bg-yellow-500 rounded-xl hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
          Login
        </button>
        <button
          onClick={handleSignup}
          className='w-1/2 px-4 py-2 ml-2 text-yellow-500 border border-yellow-500 rounded-xl hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Authentication;
