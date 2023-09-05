'use client'

import { selectedRowAtom, showRecordAtom } from '@/app/atoms'
import { cn } from '@/app/_utils'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import ViewRecord from '../ViewRecord'



interface TableBodyProps {
  data: any
  tableKeys: string[]
}

export default function TableBody({ data, tableKeys }: TableBodyProps) {
  const [selectedRows, setSelectedRows] = useRecoilState(selectedRowAtom)
  const [tableBody, setTableBody] = React.useState<any>()
  const setShowRecord = useSetRecoilState(showRecordAtom)

  const handleShowRecord = (item: any) => {
    setShowRecord(true)
    setSelectedRows([item])
  }

  useEffect(() => {
    if (data) {
      data.sort((a: any, b: any) => {
        const votesA = a.votes ? a.votes.length : 0
        const votesB = b.votes ? b.votes.length : 0
        return votesB - votesA
      })
      setTableBody(data)
    }
  }, [data])

  return (
    <tbody className='min-w-full divide-y divide-gray-200'>
      {tableBody &&
        tableBody?.map((item: any, i: number) => {
          console.log('selectedRows?.includes(item)', selectedRows?.includes(item))
          return (
            <tr key={i} className={cn('group w-full cursor-pointer hover:bg-muted')}>
              <td className='sticky left-0 bg-slate-50 px-7 drop-shadow-lg group-hover:bg-muted sm:w-12 sm:px-6'>
                {selectedRows?.includes(item) && (
                  <div className='absolute inset-y-0 left-0 w-0.5 bg-primary' />
                )}
                <input
                  type='checkbox'
                  className='absolute left-4 top-1/2 -mt-2.5 h-5 w-5 cursor-pointer rounded border-2 border-border text-secondary focus:ring-ring'
                  value={item.name}
                  checked={selectedRows?.includes(item) || selectedRows?.length === data?.length}
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? [...selectedRows, item]
                        : selectedRows?.filter((p: any) => p !== item)
                    )
                  }
                />
              </td>
              {tableKeys.map((key, index: number) => {
                return (
                  <td
                    key={index}
                    className={cn(
                      'whitespace-nowrap bg-slate-50 py-4 px-3 text-[14px] font-medium leading-[110%] text-gray-500  group-hover:bg-muted',
                      {
                        'bg-muted': selectedRows?.includes(item),
                      }
                    )}>
                    {key === 'votes' ? <strong>{item[key]?.length}</strong> : item[key]}
                  </td>
                )
              })}
              <ViewRecord showRecord={() => handleShowRecord(item)} />
            </tr>
          )
        })}
    </tbody>
  )
}
