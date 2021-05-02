<template>
  <div>
    <transition name="manAnimation" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'examine'
}
</script>

<style lang="scss" scoped>

</style>
