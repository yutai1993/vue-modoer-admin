const adminRouters = [
  {
    name: 'Components',
    meta: {
      rules: []
    },
    children: [
      {
        name: 'Echarts',
        meta: {
          rules: ['view', 'delete', 'put']
        }
      }
    ]
  }
]

export default adminRouters
