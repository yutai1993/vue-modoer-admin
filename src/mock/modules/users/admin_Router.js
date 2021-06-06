const adminRouters = [
  {
    name: 'Home',
    meta: {
      // 匹配规则
      // view查看  delete删除  put修改  post添加
      rules: ['view', 'delete', 'put']
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
          rules: ['view', 'delete', 'put']
        }
      },
      {
        name: 'theme',
        meta: {
          rules: ['view', 'delete']
        }
      }
    ]
  }
]

export default adminRouters
