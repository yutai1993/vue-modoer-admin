import { getModuleSetting, putModuleSetting } from "../../api/setting/moduleSetting";

export default {
  namespaced: true,
  state: () => ({
    firstOptions: {},
    secondOptions: {}
  }),

  mutations: {
    ALTERMODULESETTING (state, data ) {
      state.firstOptions = data.firstOptions
      state.secondOptions = data.secondOptions
    },

  },

  actions: {
    async REQ_MODULESETTING ({commit}) {
      const result = await getModuleSetting()
      if (result.code === 200) {
        commit("ALTERMODULESETTING",result.data)
      }
    },

    async DELIVER_MODULE_SETTING ({commit},payload) {
      return  await putModuleSetting(payload)

    }
  },

  getters: {

  }
}
