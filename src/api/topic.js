import axios from '../utils/http'

// 获取主题字段
export const getTopicField = () => axios.get('/api/topicField')

// 获取主题分类
export const getTopicCategory = () => axios.get('/api/topicCategory')

// 获取主题等级
export const getTopicGrade = () => axios.get('/api/topicGrade')

// 获取主题风格
export const getTopicStyle = () => axios.get('/api/topicStyle')
