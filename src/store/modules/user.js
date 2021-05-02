import { setSessionItem, getSessionItem, filterRouters, setDefaultRedirect } from '../../utils/utils'
import { getRouters } from '../../api/users/users'
import dynamicRouters from '../../router/dynamicRouter/dynamicRouters'
import router, { DynamicRouter } from '../../router'

export default {
  namespaced: true,
  state () {
    return {
      token: getSessionItem('token') || {},
      permissionList: [] /* 动态菜单 */
    }
  },

  mutations: {
    SETTOKEN (state, token) {
      setSessionItem('token', token)
      state.token = token
    },
    SETROUTERS (state, routers) {
      state.permissionList = routers
    }

  },
  actions: {
    async EFTH_ROUTERS ({ commit }) {
      /* 如果本地没有 发送Ajax获取 */
      if (!getSessionItem('userRouters')) {
        const userRouters = await getRouters()
        /* 保存在本地 */
        setSessionItem('userRouters', userRouters)
      }
      /* 从本地获取 */
      const data = getSessionItem('userRouters')
      if (data) {
        /* 过滤后 */
        const Routers = filterRouters(dynamicRouters, data.routers)
        const RootRouter = DynamicRouter.find(value => value.path === '')
        RootRouter.children.push(...Routers) /* 为容器路由中追加过滤后的动态路由 */

        /*  有二级路由的时候设置默认跳转的路由 */
        setDefaultRedirect(DynamicRouter)
        /* 把所有动态路由 挂载 */
        DynamicRouter.forEach(item => router.addRoute(item))
        /* path 为 空的路由作为侧边栏菜单 */
        commit('SETROUTERS', RootRouter)
      }
    }
  },
  getters: { }

}
