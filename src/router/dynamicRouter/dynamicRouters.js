
const dynamicRouters = [
  {
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../../views/Home.vue'),
    meta: {
      // 匹配规则
      title: '首页',
      icon: 'icon-name'
    }
  },
  {
    path: 'examine',
    name: 'Examine',
    meta: {
      title: '审核管理',
      icon: 'icon-name'
    },
    component: () => import(/* webpackChunkName: "examine" */'../../views/examine/index.vue'),
    children: [
      {
        path: 'comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "comment" */'../../views/examine/comment/comment.vue'),
        meta: {
          title: '点评审核',
          icon: 'icon-name'
        }
      },
      {
        path: 'theme',
        name: 'Theme',
        component: () => import(/* webpackChunkName: "theme" */'../../views/examine/theme/theme.vue'),
        meta: {
          title: '主题审核',
          icon: 'icon-name'
        }
      }
    ]
  }
]

export default dynamicRouters
