<template>
  <div>
    theme
    <el-button v-permission="{action: 'add',effect: 'disabled'}" type="primary">添加按钮</el-button>
    <el-button v-permission="{action: 'put',effect: 'disabled'}" type="warning">修改按钮</el-button>
    <el-button v-permission="{action: 'delete',effect: 'disabled'}" type="danger">删除按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'theme',
  mounted () {

  }
}
</script>

<style scoped>

</style>
