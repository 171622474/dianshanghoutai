export default {
  data () {
    return {
      // 搜索框
      searchValue: '',
      // 当前角色ID
      currentRole: '',
      // 添加用户对话框数据
      dialogAddUserForm: {},
      // 分配角色
      dialogFormRole: false,
      // 添加用户对话框隐藏
      dialogFormVisibleAddUser: false,
      dialogFormVisibleEditUser: false,
      userList: [],
      // 查询参数
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 2,
      // 总条数
      total: -1,
      // 角色列表
      roleList: []
    }
  },
  created () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    // 点击搜索
    searchOk () {
      this.getUserList()
    },
    // 分配角色 - 确定
    async setRoleOk () {
      const res = await this.$http.put(`users/${this.dialogAddUserForm.id}/role`, {
        rid: this.currentRole
      })
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status !== 200) return this.$message.warning(msg)
      this.$message.success(msg)
      this.dialogFormRole = false
      this.getUserList()
    },
    // 请求所有角色列表
    async getRoleList () {
      const res = await this.$http.get('roles')
      this.roleList = res.data.data
    },
    // 点击分配校色
    setRole (user) {
      this.dialogFormRole = true
      this.dialogAddUserForm = user
    },
    // 点击删除
    dialogFormVisibleDeleteUserRow (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${user.id}`)
        const {
          meta: {
            msg,
            status
          }
        } = res.data
        if (status !== 200) return this.$message.warning(msg)
        this.$message.success(msg)
        // 判断是否长度是不是1，且不是第一页
        if (this.userList.length === 1 && this.pagenum !== 1) {
          this.pagenum--
          return this.getUserList()
        }
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击切换状态
    async dialogFormVisibleEditUserState (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const {
        meta: {
          msg,
          status
        }
      } = res.data

      if (status !== 200) return this.$message.warning(msg)
      this.$message.success(msg)
    },
    // 点击编辑用户-确定
    async dialogFormVisibleEditUserOk () {
      const res = await this.$http.put(`users/${this.dialogAddUserForm.id}`)
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status !== 200) return this.$message.warning(msg)
      this.$message.success(msg)
      this.dialogFormVisibleEditUser = false
      this.getUserList()
    },
    // 点击编辑用户
    dialogFormVisibleEditUserRow (user) {
      console.log(user)
      this.dialogAddUserForm = user
      this.dialogFormVisibleEditUser = true
    },
    // 确定添加用户
    async dialogFormVisibleAddUserOk () {
      const res = await this.$http.post('users', this.dialogAddUserForm)

      const {

        meta: {
          msg,
          status
        }
      } = res.data
      // 判断是否添加成功
      if (status !== 201) this.$message.warning(msg)
      this.$message.success(msg)
      this.dialogFormVisibleAddUser = false
      this.getUserList()
    },
    // 获取用户列表
    async getUserList () {
      // 设置请求头
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(`users?query=${this.query}&&pagenum=${this.pagenum}&&pagesize=${this.pagesize}`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      // 替换当前userList
      this.userList = data.users
      this.total = data.total
      console.log(data, msg, status)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()

      console.log(`当前页: ${val}`)
    }
  },
  watch: {
    query (newV, oldV) {
      if (newV === '') {
        this.getUserList()
      }
    }
  }
}
