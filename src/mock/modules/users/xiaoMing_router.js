const xiaoMingRouters = [
  {
    name: 'Home',
    meta: {
      // 匹配规则
      // view查看  delete删除  put修改  post添加
      rules: ['view', 'delete', 'put']
    }
  },
  {
    name: 'Examine',
    children: [
      {
        name: 'comment',
        meta: {
          rules: ['view', 'put']
        }
      }
    ]
  }
]

export default xiaoMingRouters
