import { Dialog } from '@headlessui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { createNominee } from '../../actions'
import { selectedRowAtom } from '../../atoms'
import { snakeCaseToHumanCase } from '../../_utils'
import SlideOverPanel from './SlideOverPanel'

type RecordProps = {
  isSlideOpen: boolean
  setSlideOpen: () => Promise<void>
  tableKeys?: any
}
const exclude = ['id']

const Record = ({ isSlideOpen, setSlideOpen, tableKeys }: RecordProps) => {
  const selectedRecord = useRecoilValue(selectedRowAtom)
  const isTableKeys = selectedRecord?.length === 0 && tableKeys

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    const values = Array.from(data.values())
    const name = values[0]
    await createNominee({ name })
    setSlideOpen()
  }
  
  return (
    <SlideOverPanel isSlideOpen={isSlideOpen} setSlideOpen={setSlideOpen}>
      <div className='flex h-full flex-col overflow-y-scroll bg-background shadow-xl scrollbar-hide'>
        <div className='flex-1'>
          <div className='px-4 py-6 sm:px-6'>
            <div className='flex items-start justify-between space-x-3'>
              <div className='space-y-1'>
                <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                  {isTableKeys ? 'Add Employee' : selectedRecord[0]?.name}
                </Dialog.Title>
                <p className='text-sm text-gray-500'>Employee&apos;s details</p>
              </div>
            </div>
          </div>

          <div className='space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0'>
            {/* Project name */}
            {selectedRecord?.length > 0 &&
              Object?.entries(selectedRecord[0])
                .filter((item) => !exclude?.includes(item[0]))
                .map(([key, value]: [string, any], i) => {
                  const isArray = Array.isArray(value)
                  const isDate = key === 'created_at' && new Date(value).toLocaleDateString()
                  return (
                    <div
                      key={i}
                      className='space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                      <div>
                        <span className='block text-sm font-medium capitalize text-primary-detail'>
                          {snakeCaseToHumanCase(key)}
                        </span>
                      </div>
                      <div className='sm:col-span-2 w-full sm:text-sm'>
                        {isArray ? (
                          <ul className=''>
                            {value.map((item: any, i: number) => (
                              <li
                                key={i}
                                className='inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-muted text-primary-detail mr-1 mb-1'>
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : isDate ? (
                          <span>{isDate}</span>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
            {!isTableKeys && (
              <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex justify-end space-x-3'>
                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onClick={setSlideOpen}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {isTableKeys ? (
            <form onSubmit={handleSubmit}>
              {tableKeys
                .filter((item: any) => !['id', 'created_at', 'votes', 'reason']?.includes(item))
                .map((item: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className='space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                      <div>
                        <label
                          htmlFor={item}
                          className='block text-sm font-medium capitalize text-gray-900 sm:mt-px sm:pt-2'>
                          {snakeCaseToHumanCase(item)}
                        </label>
                      </div>
                      <div className='sm:col-span-2'>
                        <input
                          type='text'
                          name={item}
                          id={item}
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  )
                })}
              <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex justify-end space-x-3'>
                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onClick={setSlideOpen}>
                    Cancel
                  </button>
                  {isTableKeys ? (
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                      Create
                    </button>
                  ) : null}
                </div>
              </div>
            </form>
          ) : null}
        </div>

        {/* Action buttons */}
      </div>
    </SlideOverPanel>
  )
}

export default Record
