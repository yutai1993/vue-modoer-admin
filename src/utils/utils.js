/**
 * 获取当前路由面包屑
 * @param path ["路由的名字", "路由的名字"]
 * @param router 全部路由数组
 * @returns [{},{}] 数组对象 name作为跳转path，title路由名字
 */
export function breadcrumbName (path = [], router = []) {
  const routerNameObj = []
  router.forEach((v, i) => {
    path.forEach((item, index) => {
      // 先找最外层的title
      if (item === v.path) {
        const r = {}
        r.path = v.name
        r.title = v.meta.title
        routerNameObj.push(r)
        // 在找下一层的title
        if (v.children && v.children.length > 0) {
          path.shift()
          routerNameObj.push(...breadcrumbName(path, v.children))
        }
      }
    })
  })

  return routerNameObj
}

/**
 * 根据后台路由与所有的静态路由做对比过滤，并添加 按钮 Ajax 拦截规则
 * @param allRouter  所有的静态路由
 * @param userRouter  后台返回的路由
 * @returns {[]} 返回数组
 */
export function filterRouters (allRouter = [], userRouter = []) {
  const filteredRouters = []
  allRouter.forEach((allItem, index) => {
    userRouter.forEach((userItem, i) => {
      if (userItem.name === allItem.name) {
        if (userItem.children && userItem.children.length > 0) {
          /* 有子路由自调用 挂载到自己的下面 */
          allItem.children = filterRouters(allItem.children, userItem.children)
        }

        userItem.meta = userItem.meta ? userItem.meta : {}
        userItem.meta.rules = userItem.meta.rules ? userItem.meta.rules : []
        /* 按钮 Ajax 拦截规则 */
        allItem.meta.rules = userItem.meta.rules
        filteredRouters.push(allItem)
      }
    })
  })
  return filteredRouters
}

/**
 * 有二级路由的时候设置默认跳转的路由
 * @param allRouter 所有的路由
 */
export function setDefaultRedirect (allRouter) {
  allRouter.forEach((item, index) => {
    if (item.children && item.children.length > 0) {
      item.redirect = { name: item.children[0].name }
      setDefaultRedirect(item.children)
    }
  })
}

/**
 * 保存SessionItem
 * @param key
 * @param v
 */
export function setSessionItem (key, v) {
  sessionStorage.setItem(key, JSON.stringify(v))
}

/**
 *  获取SessionItem
 * @returns {any}
 */
export function getSessionItem (key) {
  return JSON.parse(sessionStorage.getItem(key))
}

/**
 *  删除SessionItem
 */
export function removeSessionItem (key) {
  sessionStorage.removeItem(key)
}
