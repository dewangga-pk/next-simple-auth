import Link from 'next/link'
import Image from 'next/image'

import { ChangeEvent, FormEvent, useState } from 'react'
import { register } from '@/lib/features/user/userSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/router'

export const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  // State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    password_confirm: '',
  })

  const [formEmpty, setFormEmpty] = useState(Array<string>)
  const [passwordErr, setPasswordErr] = useState({
    password: false,
    password_confirm: false,
  })
  const [showPass, setShowPass] = useState({
    raw: false,
    confirm: false
  })

  // Methods
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    if (fieldName === 'phone' && !new RegExp('^([0-9])*$').test(fieldValue)) {
      return
    }

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }))
  }

  const showPassword = (pass: 'raw' | 'confirm') => {
    if (pass === 'raw') {
      setShowPass((prevState) => ({
        ...prevState,
        raw: !prevState.raw,
      }))
    } else {
      setShowPass((prevState) => ({
        ...prevState,
        confirm: !prevState.confirm,
      }))
    }
  }

  async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    //Empty Check
    const emptyField: string[] = []
    Object.entries(formData).map(([key, val]) => {
      if (!val) {
        emptyField.push(key)
      }
    })
    if (emptyField.length > 0) {
      setFormEmpty(emptyField)
      return
    } else setFormEmpty([])

    // Password Pattern
    if (!new RegExp(/^(?=.*[0-9])(?=.*[a-z]).{6,}$/).test(formData.password)) {
      setPasswordErr({ password: true, password_confirm: false })
      return
    }

    // Password Confirm Not Match
    if (formData.password_confirm !== formData.password) {
      setPasswordErr({ password: false, password_confirm: true })
      return
    } else setPasswordErr({ password: false, password_confirm: false })

    // POST Reg Data
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(response => response.json())

    if (response.message === 'success') { 
      await dispatch(register(formData))
      router.push('/login')
      return
    }
    else{
      alert('Ulangi beberapa saat lagi')
      return
    }
  }

  return (
    <div className="w-full flex flex-col md:gap-9 gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor="name" className='font-bold lg:text-base text-sm'>
            Nama  Anda
          </label>
          <input
            id='name'
            name="name"
            type="text"
            aria-label="nama"
            placeholder="Ketik nama anda disini .."
            className='border-white border bg-transparent lg:px-7 lg:py-4 px-5 py-3 rounded-full block w-full focus:outline-none placeholder:text-white/50 placeholder:text-sm'
            onChange={handleInput}
          />
          {formEmpty.includes('name') && (
            <span className="text-xs text-red-600">
              * Nama tidak boleh kosong
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className='font-bold lg:text-base text-sm'>
            Nomor Handphone
          </label>
          <input
            id='phone'
            name="phone"
            type="text"
            aria-label="handphone"
            placeholder="Nomor handphone anda .."
            className='border-white border bg-transparent lg:px-7 lg:py-4 px-5 py-3 rounded-full block w-full focus:outline-none placeholder:text-white/50 placeholder:text-sm'
            maxLength={13}
            onChange={handleInput}
            value={formData.phone}
          />
          {formEmpty.includes('phone') && (
            <span className="text-xs text-red-600">
              * Nomor hp tidak boleh kosong
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className='font-bold lg:text-base text-sm'>
            Password
          </label>
          <div className='border-white border flex rounded-full'>
            <input
              id='password'
              name="password"
              type={showPass.raw ? 'text' : 'password'}
              aria-label="password"
              placeholder="Masukkan password anda .."
              className='bg-transparent lg:px-7 lg:py-4 px-5 py-3 rounded-l-full flex-1 focus:outline-none placeholder:text-white/50 placeholder:text-sm'
              onChange={handleInput}
            />
            <span className='shrink-0 px-5 py-1 flex items-center justify-center cursor-pointer' onClick={() => showPassword('raw')}>
              <Image
                src="/show.svg"
                alt="show password"
                className='bg-white/50 hover:bg-white rounded-full sm:w-12 sm:h-8 w-9 h-7'
                width={32}
                height={32}
                priority
              />
            </span>
          </div>
          {formEmpty.includes('password') && (
            <span className="text-xs text-red-600">
              * Password tidak boleh kosong
            </span>
          )}
          {passwordErr.password && (
            <span className="text-xs text-red-600">
              * Password berupa alphanumeric minimal 6 karakter
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password_confirm" className='font-bold lg:text-base text-sm'>
            Konfirmasi Password
          </label>
          <div className='border-white border flex rounded-full'>
            <input
              id='password_confirm'
              name="password_confirm"
              type={showPass.confirm ? 'text' : 'password'}
              aria-label="password confirmation"
              placeholder="Masukkan kembali password anda .."
              className='bg-transparent lg:px-7 lg:py-4 px-5 py-3 rounded-l-full flex-1 focus:outline-none placeholder:text-white/50 placeholder:text-sm'
              onChange={handleInput}
            />
            <span className='shrink-0 px-5 py-1 flex items-center justify-center cursor-pointer' onClick={() => showPassword('confirm')}>
              <Image
                src="/show.svg"
                alt="show password"
                className='bg-white/50 hover:bg-white rounded-full sm:w-12 sm:h-8 w-9 h-7'
                width={32}
                height={32}
                priority
              />
            </span>
          </div>
          {formEmpty.includes('password_confirm') && (
            <span className="text-xs text-red-600">
              * Password tidak boleh kosong
            </span>
          )}
          {passwordErr.password_confirm && (
            <span className="text-xs text-red-600">* Password tidak cocok</span>
          )}
        </div>
        <button
          className="bg-[#E5E7FD] text-[#131167] dark:text-[#D38122] lg:px-7 lg:py-4 px-5 py-3 rounded-full block w-full lg:text-lg text-base font-bold"
          type="submit"
        >
          Daftar Sekarang
        </button>
      </form>

      <span className="text-lg text-center">
        Suda punya akun?
        <Link
          className="font-bold ml-2"
          href="/login"
        >
          LogIn Sekarang
        </Link>
      </span>
    </div>
  )
}
