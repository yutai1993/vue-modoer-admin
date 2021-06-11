# modoer-admin-template

## 单独克隆本分支
```
git clone -b template https://github.com/yutai1993/vue-modoer-admin.git
```

### vue version
```
vue版本: vue2
```

### 说明

```
vue2全家桶+element-ui(按需导入) 做的后台基础模板

所有的路由页面都是Layout的下级路由，  404，403除外
这样做侧边栏 topHeader 路由切换 后退 前进时不会重新渲染 
路由切换更新状态即可
```



### 基本功能


#### mock 预置登录账号

```
name: admin password: 6个字符  验证码: 不为空
name: xiaoMing password: 6个字符  验证码: 不为空
```


#### addRoute动态路由

```
addRoute动态挂载路由  侧边栏路由挂载后动态生成 可以无限嵌套
```



#### 按钮角色权限

```
按钮角色权限采用全局指令的方式
v-permission="{action: 'add', effect: 'disabled'}"
参数1：action 本次按钮在增删改查中充当的哪个角色
参数2：effect  "disabled" 为禁用 不传的化 如果没有权限会被删除

注意: 需要配合后台返回的路由中有规则数组
```



#### Ajax api 无权限拦截 

```
拦截是为了 用户非法操作页面元素 把禁用的按钮放开了

axios负责拦截 封装在了 axios的请求拦截器中
配置了 loading 状态码的响应拦截等 

注意: 需要配合后台返回的路由中有规则数组
```



#### 侧边栏的功能

```
侧边栏有 折叠 展开；收起 显示 
在页面小于1024的时候为折叠状态
在页面小于750的时候为收起状态
局部滚动+无限嵌套
```



#### 退出功能

```
removeSessionItem('token') // 删除token
removeSessionItem('userRouters') // 删除过滤后的路由
location.reload()  // 刷新

// token 和 过滤后的路由存储在 Session中 关闭页面自动清除
```



#### 主题颜色及其他

```
主题颜色和其他颜色在 var.scss文件中统一管理 方便修改
```



### vuex

```
vuex使用模块化命名空间 方便多人协作
```



### 目录结构

```
├─api  ajax api
│  ├─Home
│  └─users
├─assets
│  └─css  公用css scss变量 样式重置
├─directive  全局指令
├─EventBus 事件总线
├─Layout  侧边栏 页头导航
│  └─components
│      └─TopHeader
├─mock  数据模拟
│  └─modules
│      ├─Home
│      └─users
├─router  路由
│  ├─dynamicRouter  所有的预置路由
│  └─permission    路由守卫 进入前 进入后的
├─store  vuex
│  └─modules  vuex 模块化
├─utils  工具类 axios拦截器
└─views 视图
    ├─examine
    │  ├─comment
    │  └─theme
    └─user 登录视图
```



### 功能修改优化

```
代码中的注释较多 有助于快速阅读并理解 可快速优化修改
```

