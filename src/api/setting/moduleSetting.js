import axios from '../../utils/http'

export const getModuleSetting = function () {
  return axios.get('/api/moduleSetting')
}

export const putModuleSetting = function (data) {
  return axios.put('/api/rec/moduleSetting', data)
}
