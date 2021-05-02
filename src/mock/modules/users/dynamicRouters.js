import Mock from 'mockjs'
import adminRouters from './admin_Router'
import xiaoMingRouters from './xiaoMing_router'

Mock.mock(RegExp('/api/permission?' + '.*'), 'get', (options) => {
  if (options.url === '/api/permission?user=adminToken') {
    return {
      code: 200,
      mas: '超级管理员',
      routers: adminRouters
    }
  } else {
    return {
      code: 200,
      mas: '普通管理员',
      routers: xiaoMingRouters
    }
  }
})
