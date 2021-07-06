<template>
  <div class="loading">
    <i class="el-icon-loading"></i> <span class="loadingText">拼命加载中···</span>
  </div>
</template>

<script>
  export default {
    name: "BaseLoading",
  }
</script>

<style lang="scss" scoped>
  .loading{
    text-align: center;
    margin: 15px ;
  }
  .loadingText{
    font-size: 14px;
  }
</style>
