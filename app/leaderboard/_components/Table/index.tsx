import React from 'react'
import TableBody from './TableBody'
import TableHead from './TableHead'

interface TableProps {
  nominees: any
  tableKeys: string[]
}
const Table = ({ nominees, tableKeys }: TableProps) => {

  return (
    <div className='pb-28 h-full'>
      <div className='mt-10 overflow-y-scroll overflow-x-auto h-full'>
        <div className='-my-2 overflow-x-auto min-h-full'>
          <div className='inline-block min-w-full align-middle'>
            <table className='min-w-full divide-y divide-gray-300'>
              <TableHead data={nominees} tableKeys={tableKeys} />
              <TableBody data={nominees} tableKeys={tableKeys} />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
