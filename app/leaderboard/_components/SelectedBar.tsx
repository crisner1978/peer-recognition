'use client'

import { useRecoilValue, useResetRecoilState } from 'recoil'
import { deleteNominee } from '../../actions'
import { selectedRowAtom } from '../../atoms'
import { cn } from '../../_utils'

export default function SelectedBar() {
  const selectedRows = useRecoilValue(selectedRowAtom)
  const resetSelectedRows = useResetRecoilState(selectedRowAtom)

  async function handleDelete() {
    await deleteNominee(selectedRows)
    resetSelectedRows()
  }

  if (!selectedRows.length) return null
  
  else
    return (
      <div
        className={cn(
          'mt-0 absolute bottom-8 inset-x-0 mx-auto flex max-w-[420px] items-center justify-between space-x-3 rounded-full border border-border bg-white py-2 px-4 shadow'
        )}>
        <p className='space-x-2 font-lato text-[13px] leading-[110%] text-secondary'>
          Selected <span className='text-DRIVLY'>{selectedRows?.length}</span> documents
          <button
            onClick={() => resetSelectedRows()}
            disabled={!selectedRows?.length}
            type='button'
            className='inline-flex items-center rounded-[3px] border-[1.5px] border-border bg-white px-2 py-[5px] text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-30'>
            Reset
          </button>
        </p>

        <button
          onClick={handleDelete}
          type='button'
          className='inline-flex items-center rounded-[3px] bg-white px-2.5 py-1.5 font-lato text-xs font-semibold tracking-[0.02em] text-destructive shadow-sm hover:bg-error-bg focus:outline-none disabled:cursor-not-allowed disabled:opacity-30'>
          Delete selected
        </button>
      </div>
    )
}
