import { RegisterForm } from "@/app/components/register/Form"
import Image from 'next/image'
import Head from "next/head"


export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="min-h-screen bg-[#131167] dark:bg-[#D38122] text-white py-14 px-2 relative">
        <div className="absolute left-3 top-4">
          <Image
            src="/next.svg"
            alt="Next Logo"
            className="invert lg:h-[90px] lg:w-[180px] h-[30px] w-[90px]"
            width={210}
            height={170}
            priority
          />
        </div>
        <div className="lg:max-w-[488px] max-w-96 mx-auto lg:py-5">
          <h1 className="lg:text-5xl text-3xl font-extrabold">Daftarkan Akun</h1>
          <p className="lg:my-5 my-3 lg:text-base text-sm">Daftar akun anda  dengan mengisi form dibawah</p>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}