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
        <el-col :span="6">
          <el-input placeholder="请输入内容"
                    v-model="query"
                    class="input-with-select">
            <el-button slot="append"
                    @click="searchOk"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
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
                         label="用户名"
                         width="120">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色"
                         width="120">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         width="160">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话"
                         width="180">
        </el-table-column>
        <el-table-column label="时间"
                         width="180">
          <template slot-scope="scope">
            {{scope.row.create_time | fmtData("YYYY年MM月DD日")}}
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         width="100">
          <!-- 开关 插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="dialogFormVisibleEditUserState(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       @click.prevent="dialogFormVisibleEditUserRow(scope.row)"
                       icon="el-icon-edit"
                       circle></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       @click.prevent="dialogFormVisibleDeleteUserRow(scope.row)"
                       circle></el-button>
            <el-button type="success"
                       @click.prevent="setRole(scope.row)"
                       icon="el-icon-check"
                       circle></el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     class="pagination"
                     @current-change="handleCurrentChange"
                     :current-page="pagenum"
                     :page-sizes="[2, 4, 6, 8]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户弹出框 -->
    <el-dialog title="收货地址"
               :visible.sync="dialogFormVisibleAddUser">
      <el-form :model="dialogAddUserForm">
        <el-form-item label="用户名"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleAddUser = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisibleAddUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹出框 -->
    <el-dialog title="编辑用户"
               :visible.sync="dialogFormVisibleEditUser">
      <el-form :model="dialogAddUserForm">
        <el-form-item label="用户名"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.username"
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      label-width='80px'>
          <el-input v-model="dialogAddUserForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleEditUser = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisibleEditUserOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="编辑用户"
               :visible.sync="dialogFormRole">
      <el-form :model="dialogAddUserForm">
        <el-form-item label="当前的用户:"
                      label-width='100px'>
          <span>{{dialogAddUserForm.username}}</span>
        </el-form-item>

        <el-form-item label="当前的角色:"
                      label-width='100px'>
          <span>{{dialogAddUserForm.role_name}}</span>
        </el-form-item>
        <el-form-item label="分配新角色:"
                      label-width='100px'>
          <el-select v-model="currentRole"
                     placeholder="请选择">
            <el-option v-for="(item,i) in roleList"
                       :key="i"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="setRoleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixins from './user-mixins.js'
export default {
  mixins: [mixins]
}
</script>

<style>
.pagination {
  margin-top: 20px;
}
.userList {
  padding: 0 5px;
}

.addUsers {
  margin-left: 5px;
}
.box-card {
  margin-top: 20px;
}
.userList {
  margin-top: 20px;
}
</style>
