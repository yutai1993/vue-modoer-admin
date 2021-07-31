<template>
  <el-submenu  :index="children.name" >
    <template slot="title">{{children.meta.title}}</template>

    <template v-for="k in children.children">
      <el-menu-item v-if="!k.children && !isHidden(k.meta)" :key="k.name" :index="k.name">{{k.meta.title}}</el-menu-item>

      <!-- 组件自调用 -->
      <childrenMenu v-else-if="k.children && k.children.length > 0 && !isHidden(k.meta)" :key="k.name" :children="k"/>
    </template>

  </el-submenu>
</template>

<script>
import { mixinIsHidden } from '@/mixin/isHidden'
export default {
  name: 'childrenMenu',
  props: {
    children: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [mixinIsHidden]

}
</script>

<style scoped>

</style>
