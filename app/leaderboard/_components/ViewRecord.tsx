'use client'

import { MoveRight } from 'lucide-react'

export default function ViewRecord({ showRecord }: { showRecord: () => void }) {
  return (
    <td
      onClick={showRecord}
      className='sticky right-0 bg-slate-50 py-4  text-center text-sm font-medium drop-shadow-lg group-hover:bg-muted'>
      <button className='text-secondary/60 hover:brightness-90'>
        <MoveRight className='transition-all duration-150 group-hover:translate-x-2' />
      </button>
    </td>
  )
}
