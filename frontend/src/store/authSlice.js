import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      const { token, username } = action.payload

      state.token = token
      state.username = username

      // Сохраняем данные в state
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    clearAuthData: (state) => {
      // Удаляем данные из state
      state.token = null
      state.username = null

      // Очищаем localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
