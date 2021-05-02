<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="activePath"
    :class="['el-menu-vertical-demo', {'menuSpanIsnone':isCollapse}]"
    @select="handleSelect"
    :collapse-transition="false"
    unique-opened
    :background-color="variables.menuBg"
    :text-color="variables.textColor"
    :active-text-color="variables.activeTextColor">

    <el-menu-item index="modoer">
      <i class="el-icon-menu"></i>
      <span slot="title">modoer后台管理</span>
    </el-menu-item>

    <!-- 一级菜单 -->
    <template v-for="v in asidMenu">
      <el-submenu v-if="v.children && v.children.length > 0" :key="v.name" :index="v.name">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{v && v.meta.title}}</span>
        </template>
        <!-- 二级菜单 -->
        <template v-for="c in v.children">
          <!-- 单个 -->
          <el-menu-item v-if="!c.children" :disabled="c.name === $route.name" :key="c.name" :index="c.name">{{c && c.meta.title}}</el-menu-item>
          <!-- 无限嵌套 -->
          <children-menu v-else-if="c.children && c.children.length > 0" :key="c.name" :children="c"/>
        </template>

      </el-submenu>
      <!-- 单个 -->
      <el-menu-item v-else-if="!v.children" :disabled="v.name === $route.name" :key="v.name" :index="v.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{v && v.meta.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>

import { mapState } from 'vuex'
import ChildrenMenu from './childrenMenu'
import variables from '@/assets/css/var.scss'
import { breadcrumbName } from '../../utils/utils'

export default {
  name: 'AsideMenu',
  components: {
    ChildrenMenu
  },

  mounted () {
    this.breadcrumb(this.$route.path)
    this.$store.commit('Layout/setActivePath', this.$route.name)
  },

  computed: {
    /* 侧边栏 */
    asidMenu () {
      return this.$store.state.user.permissionList.children
    },
    /*  */
    ...mapState('Layout', ['isCollapse', 'activePath']),

    variables () {
      return variables
    }
  },

  methods: {

    /* 侧边栏路由跳转 name 的方式 */
    handleSelect (name) {
      this.$router.push({ name })
      this.breadcrumb(this.$route.path)
    },

    /* 面包屑 */
    breadcrumb (path) {
      const arr = path.split('/').filter(v => v !== '')
      const pathName = breadcrumbName(arr, this.asidMenu)
      this.$store.commit('Layout/setBreadcrumb', pathName)
    }

  }
}
</script>

<style lang="scss">

  .el-menu--collapse {
    border-right: 0;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    border-right: 0;
  }

  /* TODO 侧边栏颜色样式 */

  .is-opened {

    /* 二级单个 */
    .el-menu > li {
      background-color: $submenuBg !important;
    }

    .el-menu > li:hover {
      background-color: $menuHover !important;
    }

    /*二级菜单无限嵌套*/
    .el-menu--inline li div {
      background-color: $submenuBg !important;
    }

    .el-menu--inline li div:hover {
      background-color: $menuHover !important;
    }

  }

  /* 重置侧边栏被禁用的按钮 */
  .el-menu-item.is-disabled{
    opacity: 1;
  }

</style>
