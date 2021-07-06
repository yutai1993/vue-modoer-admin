import {getReviewList, postReviewList, putReviewList, delReviewList} from '../../api/examine/ReviewAudit'

export default {
  namespaced: true,
  state() {
    return {
      ReviewAuditList: []
    }
  },
  mutations: {
    GET_REVIEW(state, payload){
      state.ReviewAuditList = payload.data
    }
  },
  actions: {

    async getReview({commit}) {
      let Review = await getReviewList()
      commit('GET_REVIEW', Review)
      return Review
    },

    async postReview({}, data) {
      return await postReviewList(data)

    },

    async putReview({},data) {
      return  await putReviewList(data)
    },

    async deleteReview({}, id) {
      let Review = await delReviewList(id)

    }
  },
  getters: {}
}
