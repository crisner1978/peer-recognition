'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const placeVote = async (data: any) => {
  const nomineeId = data.nominee.split(' ')[0]
  const supabase = createServerComponentClient({ cookies })
  let userProfile

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', data?.user_id)
    .single()

  const { data: nominee } = await supabase.from('nominees').select('*').eq('id', nomineeId).single()

  if (!profile) {
    const { data: user } = await supabase.from('profile').insert([
      {
        user_id: data?.user_id,
        email: data?.email,
        voted: nominee.id,
      },
    ])
    userProfile = user
  } else {
    const { data: user } = await supabase
      .from('profile')
      .update({ voted: nominee.id })
      .eq('user_id', data?.user_id)
      .select()
    userProfile = user
  }

  let nomineesVotes = nominee?.votes?.length > 0 ? nominee.votes : []
  let nomineeReasons = nominee?.reason?.length > 0 ? nominee.reason : []
  nomineesVotes.push(data?.user_id)
  nomineeReasons.push(data?.reason)

  const { data: votedFor } = await supabase
    .from('nominees')
    .update({ votes: nomineesVotes, reason: nomineeReasons })
    .eq('id', nominee.id)
    .select()

  revalidatePath('/')
  return { userProfile, votedFor }
}

export const createNominee = async (data: any) => {
  const supabase = createServerComponentClient({ cookies })
  const { data: nominee } = await supabase.from('nominees').insert([data]).select()
  revalidatePath('/leaderboard')
  return { nominee }
}

export const deleteNominee = async (data: any) => {
  const supabase = createServerComponentClient({ cookies })

  data?.map(async (nominee: any) => {
    const { data: employee } = await supabase.from('nominees').delete().eq('id', nominee.id)

    return { employee }
  })
  
  revalidatePath('/leaderboard')
}

export const resetNominees = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: nominees } = await supabase.from('nominees').select('*')
  const { data: profiles } = await supabase.from('profile').select('*')

  nominees?.map(async (nominee: any) => {
    const { data: employee } = await supabase
      .from('nominees')
      .update({ votes: [], reason: [] })
      .eq('id', nominee.id)

    return { employee }
  })

  profiles?.map(async (profile: any) => {
    const { data: employee } = await supabase
      .from('profile')
      .update({ voted: null })
      .eq('user_id', profile.user_id)

    return { employee }
  })

  revalidatePath('/leaderboard')
}
