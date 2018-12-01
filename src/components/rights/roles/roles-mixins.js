export default {
  data () {
    return {
      // 角色列表
      roleList: [],
      // 弹出框 - 添加角色
      dialogFormVisibleAddRole: false,
      dialogFormVisibleEditRole: false,
      // 弹出层
      dialogVisibleAllotRights: false,
      // 角色
      roleAdd: {},
      // 当前角色
      current: -1,
      // 权限列表
      rightsList: [],
      // 默认选中数组
      defaultCheck: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }

    }
  },
  methods: {
    // 点击分配权限弹出框 - 确定点击
    async dialogVisibleAllotRightsOk () {
      // 获取全选按钮
      let arr1 = this.$refs.rightsCheck.getCheckedKeys()
      // 获取半选择按钮
      let arr2 = this.$refs.rightsCheck.getHalfCheckedNodes()
      let arr = [...arr1, ...arr2]
      let str = arr.join(',')
      console.log(str)
      const res = await this.$http.post(`roles/${this.current}/rights`, {
        rids: str
      })
      const {
        meta: {
          status,
          msg
        }
      } = res.data
      if (status !== 200) return this.$message.warning(msg)
      this.$message.success(msg)
      this.getRoleList()
      this.dialogVisibleAllotRights = false
    },
    // 获取叶子节点的ID，递归
    getyezi (node, arr) {
      if (!node.children) {
        arr.push(node.id)
      } else {
        node.children.forEach(item => {
          this.getyezi(item, arr)
        })
      }
    },
    // 点击分配权限弹出框
    async dialogVisibleRights (rightsid) {
      // 获取所有权限列表进行渲染
      const res = await this.$http.get(`rights/tree`)
      this.rightsList = res.data.data
      // 当前角色ID
      this.current = rightsid.id
      // 已有的权限用户Id
      let arr = []
      // 调用叶子
      this.getyezi(rightsid, arr)
      this.defaultCheck = arr
      this.dialogVisibleAllotRights = true
    },
    // 编辑弹出框 - close事件
    editClose () {
      this.getRoleList()
    },
    // 编辑弹出框 - 确定
    async dialogFormVisibleEditRoleOk () {
      const res = await this.$http.put(`roles/${this.current}`,
        this.roleAdd)
      const {
        meta: {
          status
        }
      } = res.data
      if (status !== 200) return this.$message.warning('更新失败...')
      this.$message.success('更新成功~')
      this.dialogFormVisibleEditRole = false
    },
    // 点击编辑弹出框
    editRoleRow (role) {
      this.roleAdd = role
      // 获取当前角色
      this.current = role.id
      this.dialogFormVisibleEditRole = true
      // const res = await this.$http.
    },
    // 删除tag权限
    async tagClose (roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId.id}/rights/${rightId}`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status !== 200) return this.$message.warning(msg)
      this.$message.success(msg)
      // 返回的数据替换当前传入的数据
      roleId.children = data
    },
    // 删除角色
    async deleteRoleRow (role) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`roles/${role.id}`)
        const {
          meta: {
            msg,
            status
          }
        } = res.data
        console.log(res.data)
        if (status !== 200) return this.$message.warning(msg)
        this.$message.success(msg)
        this.getRoleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加角色 - 确定
    async dialogFormVisibleAddRoleOk () {
      const res = await this.$http.post('roles', this.roleAdd)
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status !== 201) return this.$message.warning(msg)
      this.$message.success(msg)
      this.dialogFormVisibleAddRole = false
      this.roleAdd = {}
      this.getRoleList()
    },
    // 获取角色列表 &&
    async getRoleList () {
      const res = await this.$http.get('roles')
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status !== 200) return this.$message.error(msg)
      this.roleList = data
    }
  },
  created () {
    this.getRoleList()
  }
}
