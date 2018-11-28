<template>
  <div class="box">

    <el-form label-position="top"
             class="form"
             :rules="loginFormChecked"
             label-width="80px">
      <h2>后台管理系统</h2>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"
                  prop="user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password"
                  prop="pas"
                  type="password"></el-input>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 @click="toLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async toLogin () {
      const res = await this.$http.post('login', this.loginForm)
      const { meta: { msg, status } } = res.data
      if (status !== 200) this.$message.warning(msg)
      this.$message.success(msg)
    }
  }

}
</script>

<style>
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  padding: 40px;
  width: 500px;
  background-color: #fff;
  border-radius: 20px;
}
.login-btn {
  width: 100%;
}
</style>
