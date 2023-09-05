'use client'

import { ArrowDownIcon, PenSquare } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedRowAtom } from '../../../atoms'
import { snakeCaseToHumanCase } from '../../../_utils'

type TableHeadProps = {
  data: any[] | null
  tableKeys: any[] | null
}

export default function TableHead({ data, tableKeys }: TableHeadProps) {
  const [selectedRows, setSelectedRows] = useRecoilState(selectedRowAtom)
  const [tableHead, setTableHead] = useState<any>()
  const checkRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data) {
      setTableHead(data)
    }
  }, [data])

  const toggleAll = () => {
    if (tableHead && checkRef.current?.checked) {
      setSelectedRows(tableHead)
    } else {
      setSelectedRows([])
    }
  }

  if (!tableHead) return null

  return (
    <thead className='min-w-full'>
      <tr>
        <th scope='col' className=' bg-slate-50 px-7 drop-shadow-lg sm:w-12 sm:px-6'>
          <input
            type='checkbox'
            className='absolute left-4 top-1/2 -mt-2.5 h-5 w-5 cursor-pointer rounded border-2 border-border text-secondary transition-all duration-150 ease-out hover:border-ring focus:ring-ring'
            ref={checkRef}
            checked={selectedRows?.length === data?.length}
            onChange={toggleAll}
          />
        </th>
        {tableKeys
          ? tableKeys.map((item, index: number) => {
              return (
                <th
                  key={index}
                  scope='col'
                  className={`group cursor-pointer py-1 px-4 text-left text-sm font-semibold text-gray-900 hover:bg-muted`}>
                  <div className='group inline-flex items-center'>
                    {snakeCaseToHumanCase(item)}
                    <span className='invisible ml-4 flex-none rounded text-primary-detail group-hover:visible group-focus:visible'>
                      <ArrowDownIcon className='invisible ml-2 h-3 w-4 flex-none rounded text-primary-detail group-hover:visible group-focus:visible' />
                    </span>
                  </div>
                </th>
              )
            })
          : null}

        <th scope='col' className='sticky right-0 bg-slate-50 py-3 pl-3 pr-4 drop-shadow-lg'>
          <PenSquare className='ml-2 h-5 w-5 text-primary-detail' />
        </th>
      </tr>
    </thead>
  )
}
