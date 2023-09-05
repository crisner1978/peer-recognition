'use client'

import React from 'react'
import { Trash } from 'lucide-react'
import { resetNominees } from '../../actions'
import { useRouter } from 'next/navigation'

const ResetNominees = () => {
  const router = useRouter()
  async function handleReset() {
    await resetNominees()
    setTimeout(() => router.refresh(), 1000)
  }
  
  return (
    <button
      onClick={handleReset}
      type='button'
      className='flex items-center rounded-md bg-error-bg py-1.5 px-4 text-center border-error-border border text-sm font-semibold leading-6 text-error-text shadow-sm hover:bg-error-border
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-destructive'>
      <Trash size={18} className='mr-1' />
      Reset
    </button>
  )
}

export default ResetNominees
