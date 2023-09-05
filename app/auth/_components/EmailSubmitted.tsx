import { motion } from 'framer-motion'

export default function EmailSubmitted({ email }: { email: string }) {
  return (
    <motion.div
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className='mt-10 flex flex-col items-center py-8 px-4 sm:p-8 bg-white rounded-[5px] border border-border shadow-sm max-w-xs w-full text-center'>
      <h3 className='text-2xl leading-[40px] font-semibold mb-3 sm:tracking-[0.02em] tracking-normal'>
        Link sent!
      </h3>
      <p className='relative text-base font-medium'>
        Check your email,
        <br /> ({email})
      </p>
    </motion.div>
  )
}
