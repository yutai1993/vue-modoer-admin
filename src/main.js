import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission/permission' /* 路由前置守卫 */
import './directive/directive' /* 自定义指令 */
import 'element-ui/lib/theme-chalk/base.css' /* element-ui 动画 */
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition' /* element-ui 动画 */

import './mock/index' /* 路由拦截 */

import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  RadioGroup,
  Button,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Drawer,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input

} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Drawer)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.component(CollapseTransition.name, CollapseTransition) /* element-ui 动画 */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
