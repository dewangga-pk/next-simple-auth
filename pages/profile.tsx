import {
  selectCurrentUser,
  setCurrentUser,
} from '@/lib/features/user/userSlice'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useEffect } from 'react'
import Image from 'next/image'
import { ProfileForm } from '@/app/components/profile/Form'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const router = useRouter()
  useEffect(() => {
    fetch('/api/auth/verify').then((res) =>
      res.json().then((data) => {
        if (!data) return
        dispatch(setCurrentUser(data.user))
      })
    )
  }, [])

  const logOut = async () => {
    const response = await fetch('http://localhost:3000/api/auth/logout').then(response => response.json())
    if (response.message === 'success') {
      router.push('/login')
    }
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="w-full min-h-screen">
        {/* Profile Header */}
        <div className="w-full h-28 bg-[#131167] dark:bg-[#D38122]">
          <div className="h-3/4 border-b border-white">
            <div className="container px-5 h-full mx-auto flex items-center justify-between">
              <Image
                src="/next.svg"
                alt="Next Logo"
                className="invert"
                width={120}
                height={70}
                priority
              />
              <Image
                src="/profile-circle.svg"
                alt="Profile Logo"
                className="invert"
                width={71}
                height={71}
                priority
              />
            </div>
          </div>
        </div>
        {/* Banner */}
        <div className="container px-5 mx-auto lg:mt-10 mt-5">
          <div className="text-white text-center bg-[#131167] dark:bg-[#D38122] rounded-lg lg:h-44 h-32 p-2">
            <h1 className="lg:text-5xl text-3xl font-extrabold uppercase">
              lorem
            </h1>
            <p className="xl:w-1/4 lg:w-2/5 w-3/5 lg:text-base text-sm mx-auto mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates beatae qui animi quia libero ratione, vero sint nostrum
              necessitatibus earum quaerat obcaecati. Quia, aperiam natus!
            </p>
          </div>
        </div>
        {/* Picture & Button */}
        <div className="mt-3 container px-5 mx-auto flex justify-between items-center">
          <div className="flex items-center lg:gap-x-4 gap-x-2 lg:text-xl font-bold lg:px-5">
            <Image
              src="/profile-circle.svg"
              alt="Profile Image"
              className="invert lg:w-[60px] lg:h-[60px] w-[45px] h-[45px]"
              width={60}
              height={60}
              priority
            />

            <p>Noname</p>
          </div>

          <div className="flex items-center gap-1 lg:py-4 lg:px-6 py-3 px-5 rounded-full bg-[#E3E6FD] dark:bg-[#D38122]/20 text-[#321AC7] dark:text-[#D38122] text-xs font-bold hover:cursor-pointer">
            <Image
              src="/pencil.svg"
              alt="Edit Icon"
              className="lg:w-4 lg:h-4 w-3 h-3"
              width={16}
              height={16}
              priority
            />
            <span>Edit Profile</span>
          </div>
        </div>
        {/* Side Menu & Form  */}
        <div className="container px-5 mx-auto lg:mt-16 mt-8 flex md:flex-row flex-col lg:gap-10 gap-5">
          <div className="md:w-1/4 w-full md:min-h-[600px] border-r border-[#0C0507]/10 lg:pr-11 md:order-1 order-2">
            <div className="flex flex-col h-full py-4 px-2 gap-6">
              <div className="flex-1 md:pb-0 pb-4 border-b-2">
                <div className="flex items-center gap-x-1 text-sm cursor-pointer">
                  <Image
                    src="/profile-circle.svg"
                    alt="Profile Image"
                    width={24}
                    height={24}
                    priority
                  />
                  <p>Profile</p>
                </div>
              </div>
              <div className="flex items-center gap-x-1 text-sm cursor-pointer" onClick={logOut}>
                <Image
                  src="/logout.svg"
                  alt="Logout icon"
                  width={24}
                  height={24}
                  priority
                />
                <p className="text-red-600">Logout</p>
              </div>
            </div>
          </div>
          { user && (
            <div className="md:w-3/4 w-full md:order-2 order-1">
              <div className="w-full bg-white drop-shadow-lg bg-clip-border rounded-lg md:px-10 md:py-8 px-5 py-4">
                <div className="flex items-center gap-x-1 text-sm pb-6 border-b">
                  <Image
                    src="/pen.svg"
                    alt="Edit From"
                    className="lg:w-5 lg:h-5 w-3 h-3"
                    width={20}
                    height={20}
                    priority
                  />
                  <p className="font-bold lg:text-2xl md:text-xl text-lg">
                    Edit Profile
                  </p>
                </div>
                <ProfileForm user={user}  />
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="mt-16 md:h-80 h-40 bg-[#131167] dark:bg-[#D38122]">
          <div className="container px-5 mx-auto flex items-center h-full">
            <Image
              src="/next.svg"
              alt="Next Logo"
              className="invert"
              width={200}
              height={184}
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}
