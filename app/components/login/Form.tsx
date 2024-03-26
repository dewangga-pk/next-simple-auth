import Link from 'next/link'
import Image from 'next/image'
import { setCurrentUser } from '@/lib/features/user/userSlice'
import { useAppDispatch } from '@/lib/hooks'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'


export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  // State
  const [signInPayload, setSignInPayload] = useState({
    username: '',
    password: ''
  })
  const [signInErr, setSignInErr] = useState(false)
  const [showPass, setShowPass] = useState(false)

  // Methods
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setSignInPayload((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }
  
  const showPassword = () => {
    setShowPass(!showPass)
  }

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/api/auth/login',{
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInPayload),
    }).then(response => response.json())

    if (!response.data) { setSignInErr(true); return }
    else {
      setSignInErr(false)
      dispatch(setCurrentUser(response.data))
      router.push('/profile')
    }
  }

  return (
    <div className="flex flex-col items-center md:gap-10 gap-5">
      <form
        className='flex flex-col gap-5 w-full'
        onSubmit={signIn}
      >
        <div>
          <label htmlFor="username" className='text-[#666666] font-bold lg:text-lg md:text-base text-sm'>
            Username
          </label>
          <input
            id='username'
            name='username'
            type="text"
            aria-label="username"
            placeholder="Username anda..."
            className='border-[#494949] border lg:px-7 lg:py-4 px-6 py-3 rounded-full block w-full focus:outline-none placeholder:text-sm'
            required
            value={signInPayload.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="password" className='text-[#666666] font-bold lg:text-lg md:text-base text-sm'>
            Password
          </label>
          <div className='border-[#494949] border flex rounded-full'>
            <input
              id='password'
              name='password'
              type={showPass ? 'text' : 'password'}
              aria-label="password"
              placeholder="Password anda..."
              className='lg:px-7 lg:py-4 px-6 py-3 rounded-l-full flex-1 focus:outline-none placeholder:text-sm'
              required
              value={signInPayload.password}
              onChange={handleInput}
            />
            <span className='md:shrink-0 px-5 py-1 flex items-center justify-center cursor-pointer' onClick={showPassword}>
              <Image
                src="/show.svg"
                alt="show password"
                className='sm:w-12 sm:h-8 w-9 h-7'
                width={32}
                height={32}
                priority
              />
            </span>
          </div>
        </div>
        {signInErr && (
          <span className='text-sm text-red-600 font-medium'>
            Username atau password salah
          </span>)
        }
        <button
          type='submit'
          className="bg-[#E5E7FD] dark:bg-[#D38122]/20 text-[#131167] dark:text-[#D38122] lg:py-4 px-6 py-3 rounded-full block w-full lg:text-lg"
        >
          Masuk Sekarang
        </button>
      </form>

      <span className="lg:text-lg text-[#666666]">
        Belum punya akun? 
        <Link
          className="font-bold text-[#1B196C] dark:text-[#D38122] ml-2"
          href="/"
        >
          Daftar Sekarang
        </Link>
      </span>
    </div>
  )
}
