'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSupabase } from '../../supabase/supabase-provider'
import { ClipboardList } from 'lucide-react'
const SignOut = () => {
  const { supabase } = useSupabase()
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then((d) => {
      if (d?.data?.user?.email === 'katier@yourlandmark.com') {
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
    <div className='absolute right-5 top-5 flex gap-x-8'>
      {showLeaderboard && (
        <ClipboardList onClick={() => router.push('/leaderboard')} className='cursor-pointer text-secondary hover:text-primary-detail transition-all ease-out' />
      )}
      <LogOut
        onClick={signOut}
        className='cursor-pointer text-secondary hover:text-primary-detail transition-all ease-out'
      />
    </div>
  )
}

export default SignOut
