import router from '../index'
import store from '../../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

/* 放行白名单 */
const whiteList = ['/login', '/403', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // to 去哪  mrom来路  next下一个
  const Token = store.state.user.token.token
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
        next({ path: to.path })
      })
    } else {
      next()
    }
  } else {
    // 没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
