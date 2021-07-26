import axios from "../utils/http";

// 获取主题
export const getTopicItem = (id) => axios.get(`/api/topiceditor?id=${id}`)
