'use client'

import React from 'react'
import EmailSignIn from './EmailSignIn'
import EmailSubmitted from './EmailSubmitted'
import { useParams, usePathname } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [isSuccess, setSuccess] = React.useState(false)

  return (
    <div className='h-full min-h-screen flex flex-col items-center justify-center w-full px-4 py-8'>
      <header className='text-center max-w-sm'>
        <h1 className='text-[28px] leading-[40px] font-semibold mb-3 tracking-wider text-primary'>
          Quarterly Peer Recognition Award
        </h1>
        <p className='text-lg font-normal leading-7 text-primary-detail max-w-md tracking-[0.02em]'>
          Nominate someone today!
        </p>
        <p className='text-sm text-secondary pt-1.5'>Use your work email to sign in below.</p>
      </header>
      {isSuccess ? (
        <EmailSubmitted email={email} />
      ) : (
        <div className='max-w-[340px] w-full mx-auto flex flex-col'>
          <EmailSignIn setEmail={setEmail} onSuccess={() => setSuccess(true)} />
        </div>
      )}
    </div>
  )
}

export default Login
