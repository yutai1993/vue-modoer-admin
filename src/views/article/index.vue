<template>
  <transition name="manAnimation" mode="out-in">
    <keep-alive :include="excludeKeepName" exclude="articleeditor">
      <router-view />
    </keep-alive>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'articles',
  computed: {
    ...mapState('tagsView', ['excludeKeepName'])
  }
}
</script>

<style scoped>

</style>
