'use client'

import { useForm } from 'react-hook-form'
import { placeVote } from '../actions'
import Button from './Button'
import Textarea from './fields/Textarea'
import SelectMenu from './SelectMenu'

type NomineeFormProps = {
  user: any
  nominees: any
  isSuccess: boolean
  votedFor: string
}
const NomineeForm = ({ user, nominees, isSuccess, votedFor }: NomineeFormProps) => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const watchNominee = watch('nominee')

  const onSubmit = async (data: any) => {
    const payload = { ...data, user_id: user.id, email: user.email }
    await placeVote(payload)
  }

  if (isSuccess) {
    return (
      <div className='bg-success-bg border-success-border text-success-text p-4 border-l-4 border-l-success-text w-[90%]'>
        <h3 className='font-medium text-[28px] leading-[34px] sm:text-2xl tracking-[0.02em]'>
          Thanks, your vote for {votedFor} has been counted 🎉!
        </h3>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className='w-full sm:max-w-[400px] mx-auto'>
          <SelectMenu
            options={nominees}
            control={control}
            property='Please select'
            className='mb-10 sm:mb-8 w-full space-y-5 text-left sm:max-w-[400px]'
            name='nominee'
            placeholder='Tell us, who do you want to nominate?'
          />

          {watchNominee && (
            <>
              <h3 className='sm:text-sm font-medium leading-[24px] text-primary-detail mb-5 font-mont'>
                Please share your reason for nominating them?
              </h3>
              <Textarea
                {...register('reason', { required: 'Required' })}
                rows={4}
                name='reason'
                errormsg={errors?.reason?.message}
              />
              <div className='flex justify-end mt-3'>
                <Button>Submit</Button>
              </div>
            </>
          )}
        </div>
      </fieldset>
    </form>
  )
}

export default NomineeForm
