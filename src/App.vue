<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { removeStorageItem } from './utils/utils'
  export default {
    mounted () {
      addEventListener('beforeunload', () => {
        removeStorageItem('token')
        removeStorageItem('userRouters')
      })
    }
  }
</script>
