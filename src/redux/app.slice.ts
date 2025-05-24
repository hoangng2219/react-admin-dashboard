import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  email: string,
  firstName: string,
  lastName: string,
  role: string
}

export interface AppState {
  user: IUser | null
}

const initialState: AppState = {
  user: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser} = appSlice.actions

export default appSlice.reducer;