import { AppProps } from 'next/app'
import StoreProvider from '@/app/StoreProvider'
import "@/app/globals.css"
import { useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)
  const test = () => {
    setDarkMode(!darkMode)
    document.documentElement.setAttribute('class', darkMode ? '' : 'dark') //Idk what happen
  }
  return (
    <StoreProvider>
      <div className='flex justify-end py-1'>
        <label className="inline-flex items-center cursor-pointer">
          <span className="me-3 text-sm font-medium text-[#131167] dark:text-gray-300">Blue</span>
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={test}/>
          <div className="relative w-8 h-4 bg-[#131167] peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-[#D38122] peer-checked:bg-[#D38122]"></div>
          <span className="ms-3 text-sm font-medium text-gray-300 dark:text-[#D38122]">Orange</span>
        </label>
      </div>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
