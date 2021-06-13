<template>
  <div>
    <!-- 遮罩 -->
    <div class="modoer-mask" v-if="Mask" @click="hiddenIsMask"></div>
    <div class="modoer-header">
      <div :style="[{'paddingLeft': paddingLeft + 'px'}]">
        <!--页头-->
        <top-header :isCollapse="isCollapse" @header-button="isCollapsehandle"/>
        <!--快捷导航-->
        <TagsView></TagsView>
      </div>
    </div>

    <div  class="modoer-aside">
      <aside-menu ref="menu" :tweenedNumber="tweenedNumber"/>
    </div>

    <div class="modoer-container" :style="[{'paddingLeft': paddingLeft + 'px'}]">
      <div class="page-content">
        <transition name="manAnimation" mode="out-in">
          <keep-alive :include="excludeKeepName">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import { gsap } from 'gsap'
import AsideMenu from './components/AsideMenu'
import TopHeader from './components/TopHeader/TopHeader'
import TagsView from './components/TopHeader/tagsView'

export default {
  name: 'Layout',
  components: {
    TagsView,
    TopHeader,
    AsideMenu
  },

  data () {
    return {
      Mask: false,
      minFlag: false,
      paddingLeft: 200,
      tweenedNumber: 200
    }
  },

  mounted () {
    /* 注册页面改变事件 */
    addEventListener('resize', this.setResize)
    this.initResize()
    this.setResize()
  },

  updated () {
    this.$store.commit('Layout/setActivePath', this.$route.name)
    this.$refs.menu.breadcrumb(this.$route.path)
  },

  watch: {
    isCollapse (flag) {
      const w = this.getBodyWidth()
      if (w > 750) {
        this.gsapTo(flag)
      }
    }
  },

  computed: {
    /* 展开收起 */
    ...mapState('Layout', ['isCollapse']),
    ...mapState('tagsView', ['excludeKeepName'])

  },

  methods: {

    gsapTo (flag) {
      if (flag) {
        gsap.to(this.$data, { duration: 0.5, tweenedNumber: 64, paddingLeft: 64 })
      } else {
        gsap.to(this.$data, { duration: 0.5, tweenedNumber: 200, paddingLeft: 200 })
      }
    },

    /* 点击折叠按钮的事件回调 */
    isCollapsehandle () {
      const w = this.getBodyWidth()
      if (w <= 750) {
        this.$store.dispatch('Layout/setResize', false).then(() => {
          this.Mask = true
          this.paddingLeft = 0
          this.tweenedNumber = 200
          gsap.to('.modoer-aside', { duration: 0.5, x: 0 })
        })
      } else {
        /* 点击按钮后触发回调 控制展开 收起 */
        this.$store.dispatch('Layout/setCollapse')
      }
    },

    initResize () {
      const w = this.getBodyWidth()
      if (w > 750 && w <= 970) {
        this.$store.dispatch('Layout/setResize', true)
        this.tweenedNumber = 64
        this.paddingLeft = 64
      } else if (w <= 750) {
        this.paddingLeft = 0
        gsap.to('.modoer-aside', { duration: 0, x: '-100%' })
      }
    },

    setResize (ev) {
      const w = this.getBodyWidth()
      if (w > 750 && w <= 970) {
        this.Mask = false
        this.$store.dispatch('Layout/setResize', true)
        gsap.to('.modoer-aside', { duration: 0.5, x: 0 })
        if (this.minFlag) {
          this.minFlag = false
          gsap.to(this.$data, { duration: 0.5, paddingLeft: 64 })
        }
      } else if (w <= 750) {
        this.minFlag = true
        gsap.to('.modoer-aside', { duration: 0.5, x: '-100%' })
        gsap.to(this.$data, { duration: 0.5, paddingLeft: 0 })
      } else {
        this.Mask = false
        this.$store.dispatch('Layout/setResize', false)
        gsap.to('.modoer-aside', { duration: 0.5, x: 0 })
        gsap.to(this.$data, { duration: 0.5, paddingLeft: 200 })
      }
    },

    getBodyWidth () {
      const { body } = document
      const rect = body.getBoundingClientRect()
      return Math.floor(rect.width)
    },

    hiddenIsMask () {
      this.Mask = false
      gsap.to('.modoer-aside', { duration: 0.5, x: '-100%' })
    }

  },
  /* 销毁之前解绑事件 */
  beforeDestroy () {
    removeEventListener('resize', this.setResize)
  }

}
</script>

<style lang="scss">

  .modoer-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 888;
    background: $menuBg;
    box-shadow: 0 1px 8px 1px rgba(0, 0, 0, .4);
  }

  .modoer-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 999;

  }

  .modoer-container {
    padding-top: 101px;
    overflow: hidden;

    .page-content{
      width: 100%;
      padding: 15px;
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
    z-index: 998;
  }

</style>
