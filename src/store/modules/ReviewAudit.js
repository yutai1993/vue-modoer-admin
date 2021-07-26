import {getReviewList, postReviewList, putReviewList, delReviewList, getReviewItem} from '../../api/examine/ReviewAudit'

export default {
  namespaced: true,
  state() {
    return {
      ReviewAuditList: [], // 主题审核信息
      emptyText: true, // 数据文字提示
      ReviewItem: {}, // 编辑主题 单个
    }
  },
  mutations: {
    GET_REVIEW(state, payload){
      state.ReviewAuditList = payload
    },

    SET_EMPTYTEXT(state, payload){
      state.emptyText = payload
    },

    SET_REVIEWITEM(state, payload){
      state.ReviewItem = payload
    }
  },
  actions: {

    // 获取主题审核的主题信息
    async getReview({commit}) {
      let result = await getReviewList()
      if (result.code === 200){
        commit('GET_REVIEW', result.data)
        commit('SET_EMPTYTEXT', false)
      }
    },

    // 获取主题 单个
    async getReviewItem({commit}, id) {
      let result = await getReviewItem(id)
      if (result.code === 200){
        commit('SET_REVIEWITEM', result.data)
        commit('SET_EMPTYTEXT', false)
      }
    },

    // 通过审核
    async postReview({ dispatch, commit }, data) {
      let result = await postReviewList(data)
      if (result.code === 200) {
        await dispatch('getReview')
      }

    },

    // 修改
    async putReview({ dispatch, commit },data) {
      let result = await putReviewList(data)
      if (result.code === 200) {
        await dispatch('getReview')
      }
    },

    // 删除
    async deleteReview({ dispatch }, id) {
      let result = await delReviewList(id)
      if (result.code === 200) {
        await dispatch('getReview')
      }
    }
  },
  getters: {}
}
