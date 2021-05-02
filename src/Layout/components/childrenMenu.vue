<template>
  <el-submenu  :index="children.name" >
    <template slot="title">{{children.meta.title}}</template>

    <template v-for="k in children.children">
      <el-menu-item v-if="!k.children" :disabled="k.name === $route.name" :key="k.name" :index="k.name">{{k.meta.title}}</el-menu-item>

      <!-- 组件自调用 -->
      <childrenMenu v-else-if="k.children && k.children.length > 0" :key="k.name" :children="k"/>
    </template>

  </el-submenu>
</template>

<script>
export default {
  name: 'childrenMenu',
  props: {
    children: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
