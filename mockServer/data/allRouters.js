const allRouters = [
  {
    name: 'Home',
    meta: {
      // 匹配规则
      // view查看  delete删除  put修改  add添加
      rules: ['view', 'delete', 'put', 'add']
    }
  },
  {
    name: 'examine',
    meta: {
      rules: []
    },
    children: [
      {
        name: 'comment',
        meta: {
          rules: []
        }
      },
      {
        name: 'themeAudit',
        meta: {
          rules: []
        }
      },
      {
        name: 'imgAudit',
        meta: {
          rules: []
        }
      },
      {
        name: 'msgAudit',
        meta: {
          rules: []
        }
      }
    ]
  },
  {
    name: 'topic',
    meta: {
      rules: ['view', 'delete', 'put']
    },
    children: [
      {
        name: 'setting',
        meta: {
          rules: ['view', 'delete', 'put']
        },
        children: [
          {
            name: 'moduleSetting',
            meta: {
              rules: []
            }
          }
        ]
      },
      {
        name: 'topicProject',
        meta: {
          rules: ['view', 'delete', 'put']
        },
        children: [
          {
            name: 'topicPmp',
            meta: {
              rules: ['view', 'delete', 'put']
            }
          },
          {
            name: 'topiceditor',
            meta: {
              rules: ['view', 'delete', 'put', 'add']
            }
          },
          {
            name: 'addtopic',
            meta: {
              rules: ['view', 'delete', 'put', 'add']
            }
          }
        ]
      }
    ]
  },
  {
    name: 'articles',
    meta: {
      rules: ['view', 'delete', 'put', 'add']
    },
    children: [
      {
        name: 'regulator',
        meta: {
          rules: ['view', 'delete', 'put', 'add']
        }
      },
      {
        name: 'articleeditor',
        meta: {
          rules: ['view', 'delete', 'put', 'add']
        }
      },
      {
        name: 'addArticle',
        meta: {
          rules: ['view', 'delete', 'put', 'add']
        }
      }
    ]
  },
  {
    name: 'External',
    meta: {
      rules: ['view', 'delete', 'put', 'add']
    }
  },
]

module.exports = allRouters

