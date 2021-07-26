import axios from 'axios'
import {Message, Loading} from 'element-ui'
import store from '../store/index'
import router from '../router'

// view查看  delete删除  put修改  add添加
const rulesType = {
  get: 'view',
  post: 'add',
  put: 'put',
  delete: 'delete'
}

/* 取消构造器 */
const CancelToken = axios.CancelToken
let cancel

let loadingInstance // loading加载。。。
let count = 0 // 请求计数器

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
// axios.defaults.timeout = 5000
// 添加请求拦截器
axios.interceptors.request.use(function (config) {

  config.timeout = 5000 // 请求超时

  /* 请求加1 */
  count++
  /* 开启loading */
  if (config.method !== 'get') {

  }
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    fullscreen: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  })
  /* 请求头添加token login除外 */
  if (config.url !== '/api/login') {
    config.headers.Authorization = store.state.user.token.token
  }

  /* 取消 */
  config.cancelToken = new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c /* c 就是取消函数 在需要取消的地方调用 */
  })

  /* 拦截路由中没有的权限 */
  if (config.url !== '/api/login') {
    /* 获取当前路由的权限数组 */
    const rules = router.currentRoute.meta.rules || []
    /* 如果有权限数组 需要的权限在规则数组中没找到返回 -1  */
    if (rules.length && rules.indexOf(rulesType[config.method]) === -1) {
      /* 说明 没有操作权限  取消请求 */
      cancel('没有操作权限')
    }
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  /* 请求减1 */
  count--
  if (count === 0 && loadingInstance) {
    loadingInstance.close()
  }

  const { code, msg } = response.data
  if ( code !== 200) {
    Message.error({
      message: msg
    })
  }
  return response.data

}, function (error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `未知错误${error.response.status}`
    }
  } else {
    // error.message = "连接到服务器失败";
  }

  // 发生错误关闭loading
  loadingInstance.close()

  // 取消发送请求的错误
  if (axios.isCancel(error)) {
    Message.error({
      message: error.message
    })
    return
  }

  Message.error({
    message: error.message
  })

  return Promise.reject(error)
})

export default axios
