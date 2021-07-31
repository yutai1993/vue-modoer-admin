import axios from '../../utils/http'

/* 获取 */
export const getReviewList = function () {
  return axios.get('/api/ReviewAudit')
}

/* 获取单个 */
export const getReviewItem = function (id) {
  return axios.get(`/api/editor?id=${id}`)
}

/* 修改状态 */
export const postReviewList = function (data) {
  return axios.post('/api/ReviewAudit', data)
}

/* 修改 */
export const putReviewList = function (data) {
  return axios.put('/api/ReviewAudit', data)
}

/* 删除 */
export const delReviewList = function (id) {
  return axios.delete('/api/ReviewAudit?id=' + id)
}
