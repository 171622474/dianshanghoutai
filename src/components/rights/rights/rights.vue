<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片开始 -->
    <el-card class="box-card">
      <!-- 输入框 -->
      <el-row>
        <el-col :span="1"
                class="addUsers">
          <el-button type="primary"
                     @click="dialogFormVisibleAddUser = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- table 开始 -->
      <el-table :data="userList"
                class="userList"
                border
                stripe
                style="width: 100%">
        <el-table-column type='index'
                         label="#"
                         width="80">
        </el-table-column>
        <el-table-column prop="username"
                         label="角色名称"
                         width="200">
        </el-table-column>
        <el-table-column prop="username"
                         label="角色描述"
                         width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

</script>

<style>
.box-card {
  margin-top: 20px;
}
.userList {
  margin-top: 20px;
}
</style>
