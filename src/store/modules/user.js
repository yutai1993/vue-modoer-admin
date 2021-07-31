import { setStorageItem, getStorageItem, filterRouters, setDefaultRedirect } from '../../utils/utils'
import { getRouters } from '../../api/users/users'
import dynamicRouters from '../../router/dynamicRouter/dynamicRouters'
import router, { routes } from '../../router'

export default {
  namespaced: true,
  state () {
    return {
      token: getStorageItem('token') || {},
      permissionList: [] /* 动态菜单 */
    }
  },

  mutations: {
    SETTOKEN (state, token) {
      setStorageItem('token', token)
      state.token = token
    },
    SETROUTERS (state, routers) {
      state.permissionList = routers
    }

  },
  actions: {
    async EFTH_ROUTERS ({ commit }) {
      /* 如果本地没有 发送Ajax获取 */
      if (!getStorageItem('userRouters')) {
        const userRouters = await getRouters()
        if (userRouters.code === 200) {
          /* 保存在本地 */
          setStorageItem('userRouters', userRouters)
        }
      }
      /* 从本地获取 */
      const data = getStorageItem('userRouters')
      if (data) {
        /* 过滤后的路由 */
        const Routers = filterRouters(dynamicRouters, data.routers)
        /* 容器 */
        const RootRouter = routes.find(value => value.path === '')

        /*  有二级路由的时候设置默认跳转的路由 */
        RootRouter.children.push(...Routers)
        setDefaultRedirect(routes)

        /* 把所有动态路由 挂载 */
        Routers.forEach(item => router.addRoute(RootRouter.name, item))
        /* 菜单 */
        commit('SETROUTERS', Routers)
      }
    }
  },
  getters: { }

}
