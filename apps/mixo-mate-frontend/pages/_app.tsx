import { AuthContext, useAuth } from '@/clientApi/hooks/useAuth'
import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  const { isLoading, isLoggedIn, user } = useAuth();  

  return (
    <div className='flex flex-col h-full'>
      <AuthContext.Provider value={{isLoading, isLoggedIn, user}}>
        <Header />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </div>
  )
}
