
const dynamicRouters = [
  {
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../../views/Home.vue'),
    meta: {
      // 匹配规则
      title: '首页',
      icon: 'el-icon-s-home'
    }
  },
  {
    path: 'examine',
    name: 'examine',
    meta: {
      title: '审核管理',
      icon: ''
    },
    component: () => import(/* webpackChunkName: "examine" */'../../views/examine/index.vue'),
    children: [
      {
        path: 'comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "comment" */'../../views/examine/comment/comment.vue'),
        meta: {
          title: '点评审核',
          icon: 'el-icon-view'
        }
      },
      {
        path: 'theme',
        name: 'theme',
        component: () => import(/* webpackChunkName: "theme" */'../../views/examine/theme/theme.vue'),
        meta: {
          title: '主题审核',
          icon: 'el-icon-date'
        }
      }
    ]
  }
]

export default dynamicRouters
