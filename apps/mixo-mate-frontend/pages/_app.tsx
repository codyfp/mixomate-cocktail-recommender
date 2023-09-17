import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col h-full'>
      <Header logoSrc="images/logo.png"/>
      
      <Component {...pageProps} />
    </div>
  )
}
