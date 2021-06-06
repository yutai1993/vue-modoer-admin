<template>
    <transition name="manAnimation" mode="out-in">
      <keep-alive :include="excludeKeepName">
        <router-view />
      </keep-alive>
    </transition>
</template>

<script>
  import { mapState} from 'vuex'
export default {
  name: 'examine',
  computed:{
    ...mapState('tagsView',['excludeKeepName'])
  }
}
</script>

<style lang="scss" scoped>

</style>
