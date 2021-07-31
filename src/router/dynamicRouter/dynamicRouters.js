
const dynamicRouters = [
  {
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../../views/Home.vue'),
    meta: {
      // 匹配规则
      hidden: false, // 是否在侧边栏显示 默认false 显示
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
        path: 'themeAudit',
        name: 'themeAudit',
        component: () => import(/* webpackChunkName: "auditIndex" */'../../views/examine/theme/auditIndex.vue'),
        meta: {
          title: '主题审核',
          icon: 'el-icon-date'
        }
      },
      {
        path: 'imgAudit',
        name: 'imgAudit',
        component: () => import('../../views/examine/theme/auditIndex.vue'),
        meta: {
          title: '图片审核',
          icon: 'el-icon-date'
        }
      },
      {
        path: 'msgAudit',
        name: 'msgAudit',
        component: () => import('../../views/examine/theme/auditIndex.vue'),
        meta: {
          title: '留言审核',
          icon: 'el-icon-date'
        }
      }
    ]
  },
  {
    path: 'topic',
    name: 'topic',
    meta: {
      title: '主题',
      icon: ''
    },
    component: () => import(/* webpackChunkName: "topic" */'../../views/topic/index.vue'),
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */'../../views/topic/setting/index.vue'),
        meta: {
          title: '功能设置',
          icon: 'el-icon-view'
        },
        children: [
          {
            path: 'moduleSetting',
            name: 'moduleSetting',
            component: () => import(/* webpackChunkName: "moduleSetting" */'../../views/topic/setting/moduleSetting/moduleSetting.vue'),
            meta: {
              title: '模块设置',
              icon: 'el-icon-view'
            }
          }
        ]
      },
      {
        path: 'topicProject',
        name: 'topicProject',
        component: () => import(/* webpackChunkName: "topicProject" */'../../views/topic/topicProject/index.vue'),
        meta: {
          title: '内容管理',
          icon: 'el-icon-date'
        },
        children: [
          {
            path: 'topicPmp',
            name: 'topicPmp',
            component: () => import(/* webpackChunkName: "topicPmp" */'../../views/topic/topicProject/topicPmp/topicPmp.vue'),
            meta: {
              title: '主题管理',
              icon: 'el-icon-view'
            }
          },
          {
            path: 'topiceditor/:id',
            name: 'topiceditor',
            component: () => import(/* webpackChunkName: "topiceditor" */'../../views/topic/topicProject/topiceditor/topiceditor.vue'),
            meta: {
              hidden: true,
              title: '编辑主题',
              icon: 'el-icon-view'
            }
          },
          {
            path: 'addtopic',
            name: 'addtopic',
            component: () => import(/* webpackChunkName: "addtopic" */'../../views/topic/topicProject/addtopic/addtopic.vue'),
            meta: {
              title: '添加主题',
              icon: 'el-icon-view'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */'../../views/article/index.vue'),
    meta: {
      title: '文章',
      icon: 'el-icon-date'
    },
    children: [
      {
        path: 'regulator',
        name: 'regulator',
        component: () => import(/* webpackChunkName: "regulator" */'../../views/article/regulator.vue'),
        meta: {
          title: '文章管理',
          icon: 'el-icon-view'
        }
      },
      {
        path: 'articleeditor/:id',
        name: 'articleeditor',
        component: () => import(/* webpackChunkName: "articleeditor" */'../../views/article/articleeditor.vue'),
        meta: {
          hidden: true,
          title: '文章编辑',
          icon: 'el-icon-view'
        }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import(/* webpackChunkName: "addtopic" */'../../views/article/addArticle.vue'),
        meta: {
          title: '添加文章',
          icon: 'el-icon-view'
        }
      }
    ]
  },
  {
    path: 'http://www.baidu.com',
    name: 'External',
    meta: {
      title: '外链',
      icon: 'el-icon-view'
    }
  }
]

export default dynamicRouters
