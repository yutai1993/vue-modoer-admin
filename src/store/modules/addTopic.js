import { getTopicField, getTopicCategory, getTopicGrade, getTopicStyle } from '../../api/topic'

export default {
  namespaced: true,
  state: () => ({
    topicField: {}, // 主题字段
    topicCategory1: [], // 主题一级分类
    topicCategor2: [], // 主题二级分类
    Grade: [], // 主题等级
    TopicStyle: [] // 主题风格
  }),

  mutations: {

    TOPICFIELD (state, data) {
      state.topicField = data
    },

    TOPICCATEGORY (state, data) {
      state.topicCategory1 = data.topicCategory1
      state.topicCategory2 = data.topicCategory2
    },

    TOPICGRADE (state, data) {
      state.Grade = data
    },

    TOPICSTYLE (state, data) {
      state.TopicStyle = data
    }

  },

  actions: {

    // 获取主题字段
    async fetchTopicField ({ commit }) {
      const result = await getTopicField()
      if (result.code === 200) {
        commit('TOPICFIELD', result.data)
      }
    },

    // 获取主题分类
    async fetchTopicCategory ({ commit }) {
      const result = await getTopicCategory()
      if (result.code === 200) {
        commit('TOPICCATEGORY', result.data)
      }
    },

    // 获取主题等级
    async fetchTopicGrade ({ commit }) {
      const result = await getTopicGrade()
      if (result.code === 200) {
        commit('TOPICGRADE', result.data)
      }
    },

    // 获取主题等级
    async fetchTopicStyle ({ commit }) {
      const result = await getTopicStyle()
      if (result.code === 200) {
        commit('TOPICSTYLE', result.data)
      }
    }

  },

  getters: {

  }
}
