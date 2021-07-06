<template>
  <transition name="manAnimation" mode="out-in">
    <keep-alive >
      <router-view />
    </keep-alive>
  </transition>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: "topic",
    computed: {
      ...mapState('tagsView', ['excludeKeepName'])
    }
  }
</script>
<style scoped>

</style>
