<template>
  <div class="box">

    <el-form label-position="top"
             class="form"
             label-width="80px">
      <h2>后台管理系统</h2>
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input></el-input>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {

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
