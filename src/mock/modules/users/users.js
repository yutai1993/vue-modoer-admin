import Mock from 'mockjs'

const token = {
  adminToken: 'adminToken',
  xiaoMingToken: 'xiaoMingToken'
}

Mock.mock('/api/login', 'post', (options) => {
  const body = JSON.parse(options.body)
  // 获取参数 options.body  获取参数
  if (body && body.name === 'admin') {
    return {
      code: 200,
      msg: 'ok',
      name: 'admin',
      token: token.adminToken
    }
  } else if (body && body.name === 'xiaoMing') {
    return {
      code: 200,
      msg: 'ok',
      name: 'xiaoming',
      token: token.xiaoMingToken
    }
  } else {
    return {
      code: 2000,
      msg: '该账号不存在'
    }
  }
})
