<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :background-color="variables.TopHeaderBg"
    :text-color="variables.textColor"
    :active-text-color="variables.TopHeaderActiveTextColor">
    <!--左侧按钮-->
    <li class="el-submenu submenu-left ">
      <i :class="[isCollapse? 'el-icon-s-unfold' :'el-icon-s-fold']" @click="isCollapsehandle"></i>
      <!--面包屑-->

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb" tag="div" mode="out-in">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :to="{name:item.path}">{{item.title}}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>

    </li>
    <el-submenu index="2">
      <template slot="title" class="modoer-user">个人中心</template>
      <el-menu-item index="2-1">修改密码 <i class="el-icon-arrow-right"></i></el-menu-item>
      <el-menu-item index="2-2">前台首页 <i class="el-icon-arrow-right"></i></el-menu-item>
      <el-menu-item index="2-3">退出 <i class="el-icon-arrow-right"></i></el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
import variables from '@/assets/css/var.scss'
import { mapState } from 'vuex'

export default {
  name: 'TopHeader',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },

  mounted () {

  },

  computed: {
    ...mapState('Layout', ['breadcrumb']),
    /* scss 变量 */
    variables () {
      return variables
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },

    isCollapsehandle () {
      this.$emit('header-button')
    }
  }
}
</script>

<style lang="scss">

  /* header重构 */
  .el-menu--horizontal {
    position: static;
    display: flex;
    justify-content: space-between;
  }

  .el-menu--horizontal > .el-submenu .el-submenu__title {
    position: static;
  }

  .el-menu::after, .el-menu::before {
    display: none;
  }

  .el-menu--horizontal > .el-submenu[role="menuitem"] {
    float: initial;
  }

  /* 左侧按钮 */
  .submenu-left {
    color: white;
    padding-left: 10px;
    display: flex;
    align-items: center;

    > i {
      cursor: pointer;
    }

    /* 面包屑 */
    .el-breadcrumb {
      margin-left: 20px;
    }
  }
  .el-menu-item.is-active i {
    color: $TopHeaderActiveIconColor;
  }

  .el-submenu.is-active .el-submenu__title{
    border-bottom-color: $TopHeaderActiveBorderColor !important
  }

  /* header右侧下拉菜单 右箭头图标 */
  .el-menu--popup > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* 面包屑重置样式 */
  .el-breadcrumb__inner.is-link {
    color: $breadcrumbColor;
  }

  .el-breadcrumb__inner.is-link:hover {
    color: $breadcrumbColorHover
  }

  .el-breadcrumb__inner {
    color: $breadcrumbColor;
  }

  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner a,
  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner a:hover,
  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner:hover {
    color: $breadcrumbCurrentColor;
  }

</style>
