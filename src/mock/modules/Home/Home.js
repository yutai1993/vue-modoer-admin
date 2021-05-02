import Mock from 'mockjs'

Mock.mock('/api/add', 'post', (options) => {
  return {
    code: 200,
    msg: 'ok',
    data: '返回的内容'
  }
})
