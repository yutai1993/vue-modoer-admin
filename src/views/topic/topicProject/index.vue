<template>
  <transition name="manAnimation" mode="out-in">
    <keep-alive :include="excludeKeepName" exclude="topiceditor">
      <router-view />
    </keep-alive>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'topicProject',
  computed: {
    ...mapState('tagsView', ['excludeKeepName'])
  }
}
</script>

<style scoped>

</style>
