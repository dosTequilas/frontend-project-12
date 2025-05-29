import { useDispatch } from 'react-redux'
import { setAuthData } from '../store/authSlice'
import axios from 'axios'

const useAuth = () => {
  const dispatch = useDispatch()

  const signup = async ({ username, password }) => {
    const response = await axios.post('/api/v1/signup', { username, password })
    dispatch(setAuthData({
      token: response.data.token,
      username,
    }))
  }

  return { signup }
}

export default useAuth