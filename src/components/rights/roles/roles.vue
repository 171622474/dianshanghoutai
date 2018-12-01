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
                     @click="dialogFormVisibleAddRole = true">
            添加角色
          </el-button>
        </el-col>
      </el-row>
      <!-- table 开始 -->
      <el-table :data="roleList"
                class="userList"
                border
                stripe
                style="width: 100%">
        <el-table-column type="expand"
                         label=""
                         width="80">
          <template slot-scope="scope">
            <el-row v-for="(item1,i1) in scope.row.children"
                    :key="i1">
              <el-col :span="4">
                <el-row>
                  <el-tag closable
                          @close="tagClose(scope.row,item1.id)">
                    {{item1.authName}}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-row>

              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2,i2) in item1.children"
                        :key="i2">
                  <el-col :span="4">
                    <el-tag closable
                            @close="tagClose(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable
                            @close="tagClose(scope.row,item3.id)"
                            v-for="(item3,i3) in item2.children"
                            :key="i3">{{item3.authName}}</el-tag>

                  </el-col>
                  <el-col>

                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 暂无内容 -->
            <span v-if="scope.row.children.length === 0">暂无任何权限</span>
          </template>
        </el-table-column>
        <el-table-column type='index'
                         label="#"
                         width="80">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"
                         width="200">
        </el-table-column>
        <el-table-column prop="roleDesc"
                         label="用户管理"
                         width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click.prevent="editRoleRow(scope.row)"
                       circle></el-button>
            <el-button type="danger"
                       @click="deleteRoleRow(scope.row)"
                       icon="el-icon-delete"
                       circle></el-button>
            <el-button type="success"
                       @click="dialogVisibleRights(scope.row)"
                       icon="el-icon-check"
                       circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色弹出框 -->
    <el-dialog title="添加角色"
               :model="roleAdd"
               :visible.sync="dialogFormVisibleAddRole">
      <el-form>
        <el-form-item label="角色名称"
                      label-width="100px">
          <el-input autocomplete="off"
                    v-model="roleAdd.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      label-width="100px">
          <el-input autocomplete="off"
                    v-model="roleAdd.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleAddRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisibleAddRoleOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色弹出框 -->
    <el-dialog title="编辑角色"
               :model="roleAdd"
               @close="editClose"
               :visible.sync="dialogFormVisibleEditRole">
      <el-form>
        <el-form-item label="角色名称"
                      label-width="100px">
          <el-input autocomplete="off"
                    v-model="roleAdd.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      label-width="100px">
          <el-input autocomplete="off"
                    v-model="roleAdd.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleEditRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisibleEditRoleOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹出框 -->
    <el-dialog title="分配权限"
               :visible.sync="dialogVisibleAllotRights"
               width="50%">
      <el-tree :data="rightsList"
      ref="rightsCheck"
               show-checkbox
               node-key="id"
               default-expand-all
               :default-checked-keys="defaultCheck"
               :props="defaultProps">
      </el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisibleAllotRights = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisibleAllotRightsOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixins from './roles-mixins.js'
export default {
  mixins: [mixins]
}
</script>

<style>
.box-card {
  margin-top: 20px;
}
.userList {
  margin-top: 20px;
}
</style>
