import axios from '../../utils/http'
import store from '../../store/index'

export const login = function (data, config) {
  return axios.post('/api/login', data, config)
}

export const getRouters = function () {
  console.log(store.state.user.token.token)
  return axios.get('/api/permission?user=' + store.state.user.token.token)
}
