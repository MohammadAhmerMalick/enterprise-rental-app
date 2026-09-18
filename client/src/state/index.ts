import { createSlice } from '@reduxjs/toolkit'

export const initialState = {}

export const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {},
})

// export const {} = globalSlice.actions
export default globalSlice.reducer
