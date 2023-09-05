'use client'

import Input from '@/app/_components/fields/Input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface EmailSignInProps {
  setEmail: Dispatch<SetStateAction<string>>
  onSuccess?: () => void
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const EmailSignIn = ({ setEmail, onSuccess }: EmailSignInProps) => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailRegex.test(emailRef?.current?.value as string))
      return toast.error('Please enter your email address')
      
    const email = emailRef?.current?.value as string

    if (!email?.endsWith('@yourlandmark.com')) return toast.error('Please enter your work email')

    setSubmitting(true)
    setEmail(email)
    const toastId = toast.loading('Just a moment!')

    try {
      supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${location.origin}/auth/callback`, shouldCreateUser: true },
      })
      onSuccess?.()
      toast.success(`Sign in link has been sent to ${email}`, { id: toastId })
    } catch (error) {
      toast.error('Something went wrong, please try again later', { id: toastId })
    } finally {
      setSubmitting(false)
      if (emailRef.current) {
        emailRef.current.value = ''
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-sm'>
      <fieldset
        className='w-full mx-auto relative group flex-1 space-y-6 mt-12'
        disabled={isSubmitting}>
        <div className='group relative z-0 transition-all focus-within:z-10'>
          <Input
            ref={emailRef}
            name='email'
            placeholder=' '
            type='text'
            className='peer w-full h-[55px] resize-none border border-neutral-300 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 pl-4 py-4 bg-stone-50 rounded-md  justify-start items-center gap-3 inline-flex'
          />
          <label
            htmlFor='email'
            className='text-zinc-900 text-base bg-gradient-to-t from-white to-stone-50 peer-focus:px-0.5 font-normal pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left transition-all duration-200 peer-focus:-translate-y-[27px] peer-focus:scale-75 peer-focus:font-medium peer-focus:text-zinc-950 peer-[:not(:placeholder-shown)]:-translate-y-[27px] peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-zinc-950'>
            name@yourlandmark.com
          </label>
        </div>
        <button
          type='submit'
          className='min-w-[300px] w-full h-[55px] inline-flex items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90'>
          <span className='text-lg font-normal text-white leading-loose'>Sign in with email</span>
        </button>
      </fieldset>
    </form>
  )
}

export default EmailSignIn
