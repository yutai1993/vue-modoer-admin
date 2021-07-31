import { getTopicList, putTopicList, deleteTopicList } from '../../api/topicPmp'

export default {
  namespaced: true,
  state: () => ({
    topicList: {} // 主题数据
  }),

  mutations: {
    TOPICLIST (state, data) {
      state.topicList = data
    }

  },

  actions: {
    async fetchTopicList ({ commit }, payload) {
      const result = await getTopicList(payload.pagesize, payload.pagenum)
      console.log(result.data)
      if (result.code === 200) {
        commit('TOPICLIST', result.data)
      }
    },

    async putTopicList ({ commit, dispatch }, payload) {
      const result = await putTopicList(payload.data)
      if (result.code === 200) {
        dispatch('fetchTopicList', { pagesize: payload.pagesize, pagenum: payload.pagenum })
      }
    },

    async deleteTopicList ({ commit, dispatch }, payload) {
      const result = await deleteTopicList(payload.data)
      if (result.code === 200) {
        dispatch('fetchTopicList', { pagesize: payload.pagesize, pagenum: payload.pagenum })
      }
    }

  },

  getters: {

  }

}
