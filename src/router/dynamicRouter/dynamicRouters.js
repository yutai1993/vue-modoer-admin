
const dynamicRouters = [
  {
    path: 'components',
    name: 'Components',
    meta: {
      title: 'modoer组件',
      icon: ''
    },
    component: () => import(/* webpackChunkName: "components" */'../../views/components/index.vue'),
    children: [
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import(/* webpackChunkName: "Echarts" */'../../views/components/Echarts/Echarts.vue'),
        meta: {
          title: 'Echarts&icon',
          icon: 'el-icon-view'
        }
      },

    ]
  }
]

export default dynamicRouters
