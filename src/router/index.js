import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/login.vue'),
    meta: {
      name: '登录'
    }
  }
]

export const DynamicRouter = [
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
  }
]

const createRouter = () => new VueRouter({
  routes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
