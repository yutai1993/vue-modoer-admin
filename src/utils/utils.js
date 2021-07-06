/**
 * 检查是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|http:|mailto:|tel:)/.test(path)
}


/**
 *  判断字符是否为汉字，
 * @param s
 * @returns {boolean}
 */
function isChinese(s) {
  return /[\u4e00-\u9fa5]/.test(s);
}

/**
 *  汉字转Unicode编码
 * @param str
 * @returns {string}
 */
export function ch2Unicdoe(str) {
  if (!str) {
    return;
  }
  var unicode = '';
  for (var i = 0; i < str.length; i++) {
    var temp = str.charAt(i);
    if (isChinese(temp)) {
      unicode += '\\u' + temp.charCodeAt(0).toString(16);
    } else {
      unicode += temp;
    }
  }
  return unicode;
}


/**
 *  Unicode编码 转汉字
 * @param str
 * @returns {string}
 */
export function unicode2Ch(str) {
  if (!str) {
    return;
  }
  // 控制循环跃迁
  var len = 1;
  var result = '';
  // 注意，这里循环变量的变化是i=i+len 了
  for (var i = 0; i < str.length; i = i + len) {
    len = 1;
    var temp = str.charAt(i);
    if (temp == '\\') {
      // 找到形如 \u 的字符序列
      if (str.charAt(i + 1) == 'u') {
        // 提取从i+2开始(包括)的 四个字符
        var unicode = str.substr((i + 2), 4);
        // 以16进制为基数解析unicode字符串，得到一个10进制的数字
        result += String.fromCharCode(parseInt(unicode, 16).toString(10));
        // 提取这个unicode经过了5个字符， 去掉这5次循环
        len = 6;
      } else {
        result += temp;
      }
    } else {
      result += temp;
    }
  }
  return result;

}


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
 *  获取默认路由 tagsView用到
 * @param allRouter
 * @param routerName
 * @returns {{name: string, title: string}}
 */
export function getDefaultRouter (allRouter, routerName) {
  const tag = {
    title: '',
    name: '',
    affix: true
  }

  allRouter.forEach((item, index) => {
    if (item.name !== routerName) {
      if (item.children && item.children.length > 0) {
        getDefaultRouter(item.children, routerName)
      }
    } else if (item.name === routerName) {
      tag.name = item.name
      tag.title = item.meta.title
    }
  })
  return tag
}

/**
 * 保存SessionItem
 * @param key
 * @param v
 */
export function setStorageItem (key, v) {
  localStorage.setItem(key, JSON.stringify(v))
}

/**
 *  获取SessionItem
 * @returns {any}
 */
export function getStorageItem (key) {
  return JSON.parse(localStorage.getItem(key))
}

/**
 *  删除SessionItem
 */
export function removeStorageItem (key) {
  localStorage.removeItem(key)
}

/**
 * 为任意的一个元素，绑定任意的一个事件
 * @param element
 * @param type
 * @param fn
 */
export function addEventListener (element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, fn)
  } else {
    element['on' + type] = fn
  }
}

/**
 * 提取带参数的url中的参数
 * @param url  url
 * @returns {{}|any}  对象的形式返回
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
