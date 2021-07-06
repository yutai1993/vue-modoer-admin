import axios from "../../utils/http";

export const getModuleSetting = async function () {
  return await axios.get('/api/moduleSetting')
}

export const putModuleSetting = async function (data) {
  return await axios.put('/api/rec/moduleSetting', data)
}
