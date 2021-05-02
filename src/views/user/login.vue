<template>
  <div class="modoer-login">
    <el-form :model="ruleForm" hide-required-asterisk status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="security">
        <el-input v-model="ruleForm.security"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/users/users'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        name: '',
        pass: '',
        security: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        security: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录
          login(that.ruleForm).then((data) => {
            if (data) {
              // 保存Token
              this.$store.commit('user/SETTOKEN', data)
              this.$router.push({ path: '/' })
            }
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">
  .modoer-login {
    height: 100%;
    border-top: 1px solid transparent;
    background-color: #95aaba;

    .demo-ruleForm {
      width: 500px;
      margin: 180px auto 0;
      padding: 44px 65px 4px 0px;
      background-color: #4884B5;
      box-shadow: 0px 3px 10px #bbb;

      .el-form-item__label {
        color: #dbe1ec;
      }
      .el-button{
        width: 100%;
      }
    }
  }
</style>
