import Image from "next/image"
import { useAppDispatch } from "@/lib/hooks"
import { ChangeEvent, FormEvent, useState } from "react"
import { setCurrentUser } from "@/lib/features/user/userSlice"

export const ProfileForm = ({ user }:any) => {
  const dispatch = useAppDispatch()
  
  // State
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    password_old: '',
    password_new: ''
  })

  const [formEmpty, setFormEmpty] = useState(Array<string>)
  const [passwordErr, setPasswordErr] = useState({
    password_old: false,
    password_new: false,
  })
  const [showPass, setShowPass] = useState({
    old: false,
    new: false
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

  const showPassword = (pass: 'old' | 'new') => {
    if (pass === 'old') {
      setShowPass((prevState) => ({
        ...prevState,
        old: !prevState.old,
      }))
    } else {
      setShowPass((prevState) => ({
        ...prevState,
        new: !prevState.new,
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
    if (!new RegExp(/^(?=.*[0-9])(?=.*[a-z]).{6,}$/).test(formData.password_new)) {
      setPasswordErr({ password_new: true, password_old: false })
      return
    }

    // POST Up Data
    const response = await fetch('http://localhost:3000/api/auth/update', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        name_old: user?.name
      }),
    }).then(response => response.json())
    if (response.user) {
      dispatch(setCurrentUser(response.user))
    }
    return
  }

  return (
    <div>
      <form
        className="flex flex-col gap-y-6 pt-6"
        onSubmit={onSubmit}
      >
          <div>
            <label htmlFor="name" className="lg:text-base text-sm">
              Nama
            </label>
            <input
              id='name'
              name="name"
              type="text"
              aria-label="nama"
              className='border-[#D1D5DB] border px-3 py-2 rounded-full block w-full focus:outline-none'
              value={formData.name}
              onChange={handleInput}
            />
            {formEmpty.includes('name') && (
              <span className="text-xs text-red-600">
                * Nama tidak boleh kosong
              </span>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="lg:text-base text-sm">
              No Handphone
            </label>
            <input
              id='phone'
              name="phone"
              type="text"
              aria-label="handphone"
              className='border-[#D1D5DB] border px-3 py-2 rounded-full block w-full focus:outline-none'
              maxLength={13}
              onChange={handleInput}
              value={formData.phone}
            />
            {formEmpty.includes('phone') && (
              <span className="text-xs text-red-600">
                * No hp tidak boleh kosong
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password_old" className="lg:text-base text-sm">
              Old Password
            </label>
            <div className='border-[#D1D5DB] border flex rounded-full'>
              <input
                id='password_old'
                name="password_old"
                type={showPass.old ? 'text' : 'password'}
                aria-label="password_old"
                className='px-3 py-2 rounded-l-full flex-1 focus:outline-none'
                onChange={handleInput}
              />
              <span className='shrink-0 px-3 py-2 flex items-center justify-center cursor-pointer' onClick={() => showPassword('old')}>
                <Image
                  src="/show.svg"
                  alt="show password"
                  width={32}
                  height={32}
                  priority
                />
              </span>
            </div>
            {formEmpty.includes('password_old') && (
              <span className="text-xs text-red-600">
                * Password tidak boleh kosong
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password_new" className="lg:text-base text-sm">
              New Password
            </label>
            <div className='border-[#D1D5DB] border flex rounded-full'>
              <input
                id='password_new'
                name="password_new"
                type={showPass.new ? 'text' : 'password'}
                aria-label="password_new"
                className='px-3 py-2 rounded-l-full flex-1 focus:outline-none'
                onChange={handleInput}
              />
              <span className='shrink-0 px-3 py-2 flex items-center justify-center cursor-pointer' onClick={() => showPassword('new')}>
                <Image
                  src="/show.svg"
                  alt="show password"
                  width={32}
                  height={32}
                  priority
                />
              </span>
            </div>
            {formEmpty.includes('password_new') && (
              <span className="text-xs text-red-600">
                * Password tidak boleh kosong
              </span>
            )}
            {passwordErr.password_new && (
              <span className="text-xs text-red-600">
                * Password berupa alphanumeric minimal 6 karakter
              </span>
            )}
          </div>
          <button
            className="bg-[#E5E7FD] dark:bg-[#D38122]/20 text-[#131167] dark:text-[#D38122] px-6 py-3 max-w-fit rounded-full font-semibold lg:text-base text-sm"
            type="submit"
          >
            Edit Profile &rarr;
          </button>
      </form>
    </div>
  )
}
