import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col h-full'>
      <Header />

      <Component {...pageProps} />
    </div>
  )
}
