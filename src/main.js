import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './router/permission/permission' /* 路由前置守卫 */
import './directive/directive' /* 自定义指令 */

import './assets/css/_normalize.scss' /* 浏览器一致性 */

import '@/components/BaseComponents' /* base-icon-svg 组件 */

/* ======================= 编辑器组件 ======================================== */
import TEditor from '@/components/TEditor/TEditor.vue'
/* =========================结束======================================= */

/* ============================  markdown 组件  =========================================== */
import markdown from '@/components/markdown/markdown'
/* ===============================   结束   ======================================== */

/* ================================  echarts ============================================= */

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入折线图图表，图表后缀都为 Chart
import {
  LineChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers'

import Echart from './components/Echarts/Echart'

/* ================================ 结束 ================================================== */

/* ====================================== element UI ================================================== */

import 'element-ui/lib/theme-chalk/base.css' /* element-ui 动画 */
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition' /* element-ui 动画 */
import {
  Container,
  Row,
  Col,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  RadioGroup,
  Radio,
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
  Input,
  CheckboxGroup,
  Checkbox,
  Tag,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Scrollbar,
  Select,
  Option,
  Message,
  Dialog,
  Rate,
  Popover,
  Popconfirm,
  DatePicker,
  Pagination,
  Upload,
  Image

} from 'element-ui'
Vue.component('TEditor', TEditor)
Vue.component('markdown', markdown)

// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent]
)
Vue.prototype.$Echarts = echarts
Vue.component('Echart', Echart) /* element-ui 动画 */
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
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
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Scrollbar)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Rate)
Vue.use(Popover)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Image)

Vue.prototype.$message = Message

/* ======================================  结束 ================================================ */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
