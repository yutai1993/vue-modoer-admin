import router from '../index'
import store from '../../store/index'
import { getStorageItem, removeStorageItem } from '../../utils/utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

/* 放行白名单 */
const whiteList = ['/login', '/403', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // to 去哪  mrom来路  next下一个
  const Token = getStorageItem('token')
  if (Token) {
    // 已登陆 不允许进入 登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }

    const filteredRouters = store.state.user.permissionList
    if (filteredRouters.length === 0) {
      // 这里必须异步完成之后 next
      store.dispatch('user/EFTH_ROUTERS').then(() => {
        // 挂载完成之后 直接断开不进入  直接进行下一次循环 走另一个分支 不然会有问题 解决不了
        if (to.fullPath === '/') {
          const toRouter = router.options.routes.find(value => value.path === '')
          next({ name: toRouter.redirect.name })
        } else {
          next({ path: to.path })
        }
      })
    } else {
      next()
    }
  } else {
    // 没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      NProgress.done()
      removeStorageItem('userRouters')
      removeStorageItem('token')
      next({ path: '/login' })
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
