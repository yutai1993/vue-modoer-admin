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
  routes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
