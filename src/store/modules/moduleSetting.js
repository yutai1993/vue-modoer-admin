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
      const data = await getModuleSetting()
      commit("ALTERMODULESETTING",data.data)
    },

    async DELIVER_MODULE_SETTING ({commit},payload) {
      return  await putModuleSetting(payload)

    }
  },

  getters: {

  }
}
