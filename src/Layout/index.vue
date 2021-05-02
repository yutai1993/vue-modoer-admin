<template>
  <el-container>
    <el-aside ref="drawer" :class="{'on':drawer && ison}" style="width: auto; height: 100%; overflow: hidden ">
      <!--侧边栏-->
      <transition>
        <div v-show="drawer"
             :class="['el-menu-vertical-demo-box-w200',{'on': ison}]"
             :style="{width: isCollapseW200, backgroundColor: 'transparent'}">
          <div class="el-menu-vertical-demo-box" :style="{width: isCollapseW220, backgroundColor: 'transparent'}">
            <aside-menu ref="menu"/>
          </div>
        </div>
      </transition>
      <!--  TODO mask -->
      <div class="modoer-mask" v-show="modoerMask" @click="hiddenMask"></div>

    </el-aside>
    <el-container>
      <el-header style="height: 60px">
        <!--页头-->
        <top-header :isCollapse="isCollapse" @header-button="isCollapsehandle"/>

      </el-header>
      <el-main>
        <transition name="manAnimation" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { mapState } from 'vuex'
import AsideMenu from './components/AsideMenu'
import TopHeader from './components/TopHeader/TopHeader'

export default {
  name: 'Layout',
  components: {
    TopHeader,
    AsideMenu
  },

  data () {
    return {
      drawer: true,
      ison: true,
      modoerMask: false,
      isCollapseW200: '200px',
      isCollapseW220: '220px'
    }
  },
  /* 挂载之前初始化侧边栏 */
  beforeMount () {
    this.getResize()
  },

  mounted () {
    /* 注册页面事件 */
    addEventListener('resize', this.getResize)
  },

  updated () {
    this.$store.commit('Layout/setActivePath', this.$route.name)
    this.$refs.menu.breadcrumb(this.$route.path)
  },

  watch: {
    isCollapse (data) {
      if (data) {
        this.isCollapseW200 = '64px'
        this.isCollapseW220 = '84px'
      } else {
        this.isCollapseW200 = '200px'
        this.isCollapseW220 = '220px'
      }
    },

    drawer (data) {
      const Resize = document.documentElement.clientWidth
      if (!data && this.ison && Resize <= 750) {
        this.modoerMask = false
      }
    }
  },

  computed: {
    ...mapState('Layout', ['isCollapse'])
  },

  methods: {

    /* 点击折叠按钮的事件回调 */
    isCollapsehandle () {
      /* 点击按钮的时候判断 侧边栏在收起状态 && 页面小于750 */
      /* 展开侧边栏 添加 on   on让侧边栏不占位 */
      const Resize = document.documentElement.clientWidth
      if (!this.drawer && Resize <= 750) {
        this.drawer = true // 展开侧边栏
        this.ison = true // 添加 on
        this.modoerMask = true
      }

      if (!this.drawer) {
        this.drawer = true
      }

      /* 点击按钮后触发回调 控制展开 收起 */
      this.$store.commit('Layout/setCollapse')
    },

    /* 监听页面改变的事件回调 & 折叠面板+侧边栏的收起展开 */
    getResize (ev) {
      const Resize = document.documentElement.clientWidth
      /* 小于1024 收起侧边栏文字 */
      if (Resize <= 1024) {
        this.drawer = true
        this.$store.commit('Layout/setResize', true)
      }

      /* 小于750隐藏侧边栏 */
      if (Resize <= 750) {
        this.drawer = false
      }

      if (Resize >= 750 && !this.drawer) {
        this.drawer = true
      }

      /*  页面大于750 去掉 on  让侧边栏占位 */
      if (Resize >= 750) {
        this.ison = false
      }
    },

    /* 遮罩 */
    hiddenMask () {
      this.modoerMask = false
      this.drawer = false
      this.$store.commit('Layout/setCollapse')
    }

  },

  beforeDestroy () {
    removeEventListener('resize', this.getResize)
  }

}
</script>

<style lang="scss">

  .on {
    position: fixed;
  }

  .el-menu-vertical-demo-box-w200 {
    height: 100%;
    overflow: hidden;
    z-index: 9999;

    .el-menu-vertical-demo-box {
      height: 100%;
      overflow-y: scroll;
    }
  }

  /* 遮罩 */
  .modoer-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .3;
    z-index: 8888;
  }

</style>
