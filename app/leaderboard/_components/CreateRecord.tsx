'use client'

import { Plus } from 'lucide-react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { createRecordAtom } from '../../atoms'

const CreateRecord = () => {
  const setCreateRecord = useSetRecoilState(createRecordAtom)
  return (
    <button
      onClick={() => setCreateRecord(true)}
      type='button'
      className='flex items-center rounded-md bg-primary py-1.5 px-4 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring'>
      <Plus size={18} className='mr-1' />
      New Record
    </button>
  )
}

export default CreateRecord
