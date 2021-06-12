
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false, /* 收起菜单 */
    breadcrumb: [], /* 面包屑 */
    activePath: '' /* 选中的 path name跳转 */
  }),
  mutations: {
    ACTIONSETCOLLAPSE (state) {
      state.isCollapse = !state.isCollapse
    },
    ACTIONSETRESIZE(state, parameter){
      state.isCollapse = parameter
    },
    setBreadcrumb (state, arr) {
      state.breadcrumb = arr
    },
    setActivePath (state, activePath) {
      state.activePath = activePath
    }
  },
  actions: {
    setCollapse (state) {
      return new Promise(resolve => {
        state.commit('ACTIONSETCOLLAPSE')
        resolve()
      })

    },
    setResize (state, parameter) {
      return new Promise(resolve => {
        state.commit('ACTIONSETRESIZE', parameter)
        resolve()
      })

    },
  },
  getters: { }
}
