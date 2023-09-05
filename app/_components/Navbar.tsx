'use client'

import { ClipboardList, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import logo from '../../public/Landmark.svg'
import { useSupabase } from '../supabase/supabase-provider'
import { adminEmails } from '../_config'
import { cn } from '../_utils'
const Navbar = () => {
  const { supabase } = useSupabase()
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  useEffect(() => {
    supabase.auth.getUser().then((d) => {
      console.log(
        'adminEmails?.includes(d?.data?.user?.email',
        adminEmails?.includes(d?.data?.user?.email!)
      )
      if (adminEmails?.includes(d?.data?.user?.email! as string)) {
        setShowLeaderboard(true)
      } else {
        setShowLeaderboard(false)
      }
    })
  })

  function signOut() {
    supabase.auth.signOut()
    router.refresh()
  }

  if (!supabase) return null

  return (
    <nav className='fixed w-full max-w-5xl mx-auto px-5 h-[65px]'>
      <div className='flex justify-between items-center w-full h-full '>
        {segment === 'leaderboard' && (
          <Link href='/'>
            <Image src={logo} alt='logo' />
          </Link>
        )}
        <div />
        <div className='inline-flex items-center gap-x-8'>
          {showLeaderboard && (
            <Link href='/leaderboard'>
              <ClipboardList
                className={cn(
                  'cursor-pointer text-secondary hover:text-primary-detail transition-all ease-out',
                  {
                    'text-blue-500': segment === 'leaderboard',
                  }
                )}
              />
            </Link>
          )}
          <LogOut
            onClick={signOut}
            className='cursor-pointer text-secondary hover:text-primary-detail transition-all ease-out'
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
