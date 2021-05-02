
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false, /* 收起菜单 */
    breadcrumb: [], /* 面包屑 */
    activePath: ''
  }),
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setResize (state, parameter) {
      state.isCollapse = parameter
    },
    setBreadcrumb (state, arr) {
      state.breadcrumb = arr
    },
    setActivePath (state, activePath) {
      state.activePath = activePath
    }
  },
  actions: { },
  getters: { }
}
