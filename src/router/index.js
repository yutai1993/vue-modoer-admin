import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/login.vue'),
    meta: {
      name: '登录'
    }
  },
  {
    path: '',
    name: 'container',
    component: Layout,
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    children: [

    ]
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import(/* webpackChunkName: "Forbidden" */ '../Layout/403.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../Layout/404.vue')
  }
]

const createRouter = () => new VueRouter({
  routes,
  /* 路由切换时 原生的方式回滚到顶部
  注意: 这个功能只在支持 history.pushState 的浏览器中可用。 */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
