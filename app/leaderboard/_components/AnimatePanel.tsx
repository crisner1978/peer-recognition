'use client'

import { AnimatePresence } from 'framer-motion'
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil'
import { createRecordAtom, selectedRowAtom, showRecordAtom } from '../../atoms'
import Record from './Record'

type AnimatePanelProps = {
  tableKeys: any
}
const AnimatePanel = ({ tableKeys }: AnimatePanelProps) => {
  const [isShowRecord, setShowRecord] = useRecoilState(showRecordAtom)
  const resetSelectedRow = useResetRecoilState(selectedRowAtom)
  const [isCreateRecord, setCreateRecord] = useRecoilState(createRecordAtom)

  const onRecordClose = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const recordOpen = await snapshot.getPromise(showRecordAtom)
        if (recordOpen) setShowRecord(false)
        setTimeout(() => resetSelectedRow(), 150)
      },
    [isShowRecord]
  )

  const onCreateClose = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const createOpen = await snapshot.getPromise(createRecordAtom)
        if (createOpen) setCreateRecord(false)
      },
    []
  )

  return (
    <AnimatePresence initial={false}>
      {isShowRecord && <Record isSlideOpen={isShowRecord} setSlideOpen={onRecordClose} />}
      {isCreateRecord && (
        <Record isSlideOpen={isCreateRecord} setSlideOpen={onCreateClose} tableKeys={tableKeys} />
      )}
    </AnimatePresence>
  )
}

export default AnimatePanel
