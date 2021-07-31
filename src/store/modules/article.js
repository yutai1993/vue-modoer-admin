import {
  getArticleCategory1,
  getArticleCategory2,
  getArticleCity,
  getuserAttribute,
  getarticleList,
  putArticleList,
  deleteArticleList,
  getArticleItem
} from '@/api/article'

export default {
  namespaced: true,
  state: () => ({
    articleCategory1: [], // 一级分类
    articleCategory2: [], // 二级分类
    articleCity: [], //  城市
    userAttribute: [], // 自定义属性
    articleData: {}, // 文章数据对象带分页
    articleActive: {} // 文章对象数据
  }),

  mutations: {

    ARTICLELIST (state, payload) {
      state.articleData = payload
    },

    ARTICLEITEM (state, payload) {
      state.articleActive = payload
    },

    ARTICLECATEGORY1 (state, payload) {
      state.articleCategory1 = payload
    },

    ARTICLECATEGORY2 (state, payload) {
      state.articleCategory2 = payload
    },

    ARTICLECITY (state, payload) {
      state.articleCity = payload
    },

    USERATTRIBUTE (state, payload) {
      state.userAttribute = payload
    }

  },

  actions: {

    // 获取文章数据数组
    async fetchArticleList ({ commit }, payload) {
      const result = await getarticleList(payload.pagesize, payload.pagenum)
      if (result.code === 200) {
        commit('ARTICLELIST', result.data)
      }
    },

    // 获取文章对象
    async fetchArticleItem ({ commit }, payload) {
      const result = await getArticleItem(payload.id)
      if (result.code === 200) {
        console.log(result.data)
        commit('ARTICLEITEM', result.data.articleActive)
      }
    },

    // 获取一级分类
    async fetchArticleCategory1 ({ commit }, payload) {
      const result = await getArticleCategory1()
      if (result.code === 200) {
        commit('ARTICLECATEGORY1', result.data.articleCategory1)
      }
    },

    // 获取二级分类
    async fetchArticleCategory2 ({ commit }, payload) {
      const result = await getArticleCategory2()
      if (result.code === 200) {
        commit('ARTICLECATEGORY2', result.data.articleCategory2)
      }
    },

    // 获取城市
    async fetchArticleCity ({ commit }, payload) {
      const result = await getArticleCity()
      if (result.code === 200) {
        commit('ARTICLECITY', result.data.articleCity)
      }
    },

    // 获取自定义属性
    async fetchuserAttribute ({ commit }, payload) {
      const result = await getuserAttribute()
      if (result.code === 200) {
        commit('USERATTRIBUTE', result.data.userAttribute)
      }
    },

    async putArticleList ({ commit, dispatch }, payload) {
      const result = await putArticleList(payload.data)
      if (result.code === 200) {
        dispatch('fetchArticleList', { pagesize: payload.pagesize, pagenum: payload.pagenum })
      }
    },

    async deleteArticleList ({ commit, dispatch }, payload) {
      const result = await deleteArticleList(payload.data)
      if (result.code === 200) {
        dispatch('fetchArticleList', { pagesize: payload.pagesize, pagenum: payload.pagenum })
      }
    }

  },

  getters: {}

}
