import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AnimatePanel from './_components/AnimatePanel'
import CreateRecord from './_components/CreateRecord'
import ResetNominees from './_components/ResetNominees'
import SelectedBar from './_components/SelectedBar'
import Table from './_components/Table'
import { redirect } from 'next/navigation'
import { adminEmails } from '../_config'


export const dynamic = 'force-dynamic'
const LeaderboardPage = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!adminEmails?.includes(session?.user?.email as string)) {
    redirect('/')
  }

  const { data: nominees } = await supabase.from('nominees').select()
  const tableKeys = [nominees?.[0]].map((item: any) => Object.keys(item))[0]

  return (
    <div className='py-20 px-5 h-screen -mt-[2px]'>
      <header className='flex items-center justify-between'>
        <h1 className='text-2xl text-primary-detail font-bold font-mont inline-flex items-center gap-x-1 mt-2'>
          Peer Award Leaderboard{' '}
          <span className='text-base sm:text-sm font-semibold font-sans text-secondary'>
            ({new Date().toLocaleDateString()})
          </span>
        </h1>
        <div className='flex items-center gap-x-2'>
          <ResetNominees />
          <CreateRecord />
        </div>
      </header>

      <Table tableKeys={tableKeys} nominees={nominees} />
      <AnimatePanel tableKeys={tableKeys} />
      <SelectedBar />
    </div>
  )
}

export default LeaderboardPage
