import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/Landmark.svg'
import employees from '../public/staff.png'
import NomineeForm from './_components/NomineeForm'

export default async function Home() {
  let hasVoted = false
  let votedFor = ''
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', session?.user.id)
    .single()

  if (profile) {
    let previousVote = profile.voted
    if (previousVote) {
      hasVoted = true
      const { data: nominee } = await supabase
        .from('nominees')
        .select('*')
        .eq('id', previousVote)
        .single()
      votedFor = nominee.name
    }
  }

  const { data: nominees } = await supabase.from('nominees').select()

  return (
    <div className='flex flex-col items-center w-full py-20'>
      <header className='grid mx-auto place-items-center gap-10 mb-10 px-5 lg:px-0'>
        <Link href='/'>
          <Image src={logo} alt='logo' />
        </Link>
        <Image src={employees} alt='Landmark Staff' className='rounded-lg max-w-[640px] w-full' />
      </header>
      <section className='flex w-full flex-col items-center border-t border-l border-r border-border bg-gradient-to-b from-background to-slate-50 bottom-no-shadow shadow-sm max-w-[640px] py-8 px-5 lg:px-0 rounded-t-lg gap-y-6'>
        <NomineeForm
          user={session?.user}
          nominees={nominees}
          isSuccess={hasVoted}
          votedFor={votedFor}
        />
        {hasVoted && (
          <div className='bg-error-bg border-error-border text-error-text p-4 border-l-4 border-l-destructive w-[90%]'>
            <h3 className='font-medium text-lg sm:text-base tracking-[0.02em]'>
              Come back next Quarter and vote for your favorite nominee!
            </h3>
          </div>
        )}
      </section>
    </div>
  )
}
