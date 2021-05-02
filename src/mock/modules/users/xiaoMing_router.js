const xiaoMingRouters = [
  {
    name: 'Home',
    meta: {
      // 匹配规则
      rules: []
    }
  },
  {
    name: 'Examine',
    meta: {
      rules: []
    },
    children: [
      {
        name: 'comment',
        meta: {
          rules: []
        }
      }
    ]
  }
]

export default xiaoMingRouters
