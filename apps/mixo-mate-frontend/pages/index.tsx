import { FormEvent } from 'react'
import { UserApi } from './../clientApi/UserApi';
import Head from 'next/head'

const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const username = e.currentTarget.username.value
  const password = e.currentTarget.password.value

  const api = new UserApi();
  const data = await api.login(username, password);

  if (data?.error) {
    alert('Login failed')
  } else {
    alert('Login successful')
  }
}

const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const username = e.currentTarget.username.value
  const password = e.currentTarget.password.value

  const api = new UserApi();
  const data = await api.create(username, password);
  if (data?.error) {
    alert('Registration failed')
  } else {
    alert('Registration successful')
  }
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mixo Mate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <form onSubmit={handleLogin}>
            <p>User Login</p>
            <input type="text" name="username" placeholder='Username' />
            <input type="password" name="password" placeholder='Password' />
            <button type="submit">Login</button>
          </form>
          <form onSubmit={handleSignup}>
            <p>User Registration</p>
            <input type="text" name="username" placeholder='Username' />
            <input type="password" name="password" placeholder='Password' />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </main>
    </div>
  )
}
