import axios from '../utils/http'

// 获取主题数据
export const getTopicList = function (pagesize, pagenum) {
  return axios.get(`/api/topicList?pagesize=${pagesize}&pagenum=${pagenum}`)
}

// 修改主题 浏览量 推荐
export const putTopicList = function (data) {
  return axios.put('/api/topicList', data)
}

// 更具id数组删除数据
export const deleteTopicList = function (data) {
  return axios.delete('/api/topicList', { data })
}
