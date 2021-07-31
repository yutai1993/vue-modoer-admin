import axios from '../utils/http'

// 文章一级分类
export const getArticleCategory1 = () => axios.get('/api/articleCategory1')

// 文二级分类
export const getArticleCategory2 = () => axios.get('/api/articleCategory2')

// 文章城市
export const getArticleCity = () => axios.get('/api/articleCity')

// 自定义属性
export const getuserAttribute = () => axios.get('/api/userAttribute')

// 文章管理 获取文章
export const getarticleList = (pagesize, pagenum) => axios.get(`/api/articleControl?pagesize=${pagesize}&pagenum=${pagenum}`)

// 修改 文章排序
export const putArticleList = (data) => axios.put('/api/articleList', data)

// 删除
export const deleteArticleList = (data) => axios.delete('/api/articleList', { data })

// 获取文章对象
export const getArticleItem = (id) => axios.get(`/api/articleItem?id=${id}`)
