import axios from '../../utils/http'
import store from '../../store/index'

export const login = async function (data, config) {
  return await axios.post('/api/login', data, config)
}

export const getRouters = async function () {
  console.log(store.state.user.token.token)
  return await axios.get('/api/permission?user=' + store.state.user.token.token)
}
