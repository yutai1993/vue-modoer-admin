<template>
  <div class="editor">
    编辑主题ID==  {{$route.params.id}}
  </div>
</template>

<script>
  export default {
    name: "topiceditor",
    mounted() {
      console.log("编辑的主题ID==="+ this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>
