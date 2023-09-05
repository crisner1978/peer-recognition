import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SlideOverPanel({ setSlideOpen, children }: any) {
  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%', transition: { duration: 0.3, ease: 'easeOut' } }}
      exit={{ opacity: 0, width: 0, transition: { duration: 0.1 } }}
      className='relative z-50 bg-white'
      open={true}
      onClose={setSlideOpen}>
      <div className='fixed inset-0 bg-primary/50 bg-blend-overlay' />

      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
            <Dialog.Panel className='pointer-events-auto relative w-screen max-w-2xl'>
              <div className='absolute top-6 left-1 -ml-12 mt-4 h-10 rounded-l-full  bg-primary bg-blend-overlay'>
                <button
                  type='button'
                  className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-0 focus:ring-inset '
                  onClick={() => setSlideOpen(false)}>
                  <span className='sr-only'>Close sidebar</span>
                  <X className='h-6 w-6 text-white' aria-hidden='true' />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
