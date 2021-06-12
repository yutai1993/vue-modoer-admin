<template>
  <el-menu
    class="el-menu-demo "
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
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :to="{name:item.path}">{{item.title}}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>

    </li>
    <el-submenu index="2" class="modoer-user">
      <template slot="title" >个人中心</template>
      <el-menu-item index="2-1">修改密码 <i class="el-icon-arrow-right"></i></el-menu-item>
      <el-menu-item index="2-2">前台首页 <i class="el-icon-arrow-right"></i></el-menu-item>
      <el-menu-item index="2-3">退出 <i class="el-icon-arrow-right"></i></el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
import variables from '@/assets/css/var.scss'
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import { removeStorageItem } from '@/utils/utils'
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
      if (key === '2-1') {
        Message.success({
          message: '修改密码'
        })
      } else if (key === '2-2') {
        Message.success({
          message: '首页'
        })
      } else if (key === '2-3') {
        removeStorageItem('token')
        removeStorageItem('userRouters')
        location.reload()
      }
    },

    isCollapsehandle () {
      this.$emit('header-button')
    }
  }
}
</script>

<style lang="scss">
  .el-menu.el-menu--horizontal{
    border: 0;
  }
  /* 左侧按钮 */
  .submenu-left {
    color: white;
    padding-left: 10px;
    height: 60px;
    line-height: 60px;

    > i {
      cursor: pointer;
      padding: 5px;
    }

    /* 面包屑 */
    .el-breadcrumb {
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;

    }
  }

  .el-menu-item.is-active i {
    color: $TopHeaderActiveIconColor;
  }

  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: $TopHeaderActiveBorderColor !important
  }

  /* header右侧下拉菜单 右箭头图标 */

  .el-menu-demo .modoer-user {
    float: right;
  }

  .el-menu--popup > li {
    position: relative;

    i {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
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
