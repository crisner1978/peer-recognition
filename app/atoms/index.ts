import { atom } from "recoil"

export const selectedRowAtom = atom<any[]>({
  key: 'SelectedRowAtomState',
  default: [],
})

export const showRecordAtom = atom<boolean>({
  key: 'ShowRecordAtomState',
  default: false,
})

export const createRecordAtom = atom<boolean>({
  key: 'CreateRecordAtomState',
  default: false,
})