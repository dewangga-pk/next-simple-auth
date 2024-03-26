import { LoginForm } from '@/app/components/login/Form'
import Head from 'next/head'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="h-screen flex">
        <div className="lg:w-1/2 md:w-1/3 md:h-full border bg-[#131167] dark:bg-[#D38122] md:flex hidden flex-col items-center justify-center px-16 text-white gap-16">
          <div className='h-1/2 flex items-center'>
            <Image
              src="/next.svg"
              alt="Next Logo"
              className="invert"
              width={333}
              height={422}
              priority
            />
          </div>

          <div className='xl:w-3/5 lg:w-4/5 h-40 text-center px-6'>
            <h1 className='lg:text-5xl text-3xl font-extrabold uppercase'>Lorem</h1>
            <div className='snap-x w-full flex gap-2 overflow-auto h-full lg:text-base text-sm'>
              <div className='snap-center w-full shrink-0 h-3/5'>
                <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veritatis nisi saepe est officia ex minima tempora impedit eveniet esse."</p>
              </div>
              <div className='snap-center w-full shrink-0 h-3/5'>
                <p>"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam unde facilis molestiae autem ut tempore? Fugiat nam ut quas laboriosam."</p>
              </div>
              <div className='snap-center w-full shrink-0 h-3/5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at ullam ex placeat optio vel tenetur, corrupti distinctio?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 md:w-2/3 w-full h-full flex flex-col justify-center items-center">
          <div className='xl:w-3/5 sm:w-4/5 w-full px-2 lg:pb-10 pb-5'>
            <h2 className='lg:text-5xl text-3xl font-extrabold text-[#20184E] dark:text-[#D38122] lg:pb-5'>
              Silahkan LogIn
            </h2>
            <p className='text-[#666666] lg:text-lg'>Masukkan Username dan password anda untuk masuk</p>
          </div>
          <div className='xl:w-3/5 sm:w-4/5 w-full px-2'>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
