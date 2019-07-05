<template>
  <div class="content">
    <el-form :inline='true' :model='formData' @submit.native.prevent style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-input v-model='formData.search_key' placeholder="请输入联系人信息进行检索" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click='queryList' type='primary'>搜索</el-button>
        <el-button @click='openDialog({user_id: "", user: {user_name: ""}})' type='primary'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' style='width: 100%; margin-top: 20px' tooltip-effect='dark'>
      <el-table-column label='用户ID' prop='user_id' width='100px'></el-table-column>
      <el-table-column label='用户名称' prop='user.user_name' width='100px'></el-table-column>
      <el-table-column label='用户电话' prop='user.phone' width='120px'></el-table-column>
      <el-table-column label='所属机构' prop='organization' align="center"></el-table-column>
      <el-table-column label='联系方式' prop='contact_info' align="center"></el-table-column>
      <el-table-column label='注册时间' prop='reg_time' width='150px' :formatter="formatterRegTime"></el-table-column>
      <el-table-column label='操作' width='200px'>
        <template slot-scope='scope'>
          <el-button @click.native.prevent='openDialog(scope.row)' size='small' type='text'>编辑</el-button>
          <el-button @click.native.prevent='deleteRow(scope.row)' size='small' type='text'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[pageSize]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible_edit" width="40%">
      <Edit :data="dialogData" @saved="editSaved" v-if="dialogVisible_edit"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '../../utils/Utils'
import Edit from './Edit'
import API from '../../utils/API'
import Constant from '@/utils/Constant'

export default {
  name: 'Manage',
  components: {Edit},
  data () {
    return {
      targetList: Constant.target,
      formData: {
        search_key: ''
      },
      dialogData: {},
      dialogTitle: '',
      dialogVisible_edit: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 50
    }
  },
  methods: {
    // 广告类型格式转换
    formatterAdType (row) {
      return Constant.ad_type.find(item => item.value === row.ad_type).label
    },
    // 新增/编辑
    openDialog (row) {
      this.dialogData = Object.assign({}, row, {user: row.user_id, user_value: row.user.user_name})
      this.dialogTitle = row.id ? `编辑联系人-${row.user.user_name}` : '新增联系人'
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      this.$confirm(`确认删除用户【${row.user_id}】${row.user.user_name} 吗？`)
        .then(() => {
          let params = {id: row.user_id}
          Utils.getInfoPost(API.BP_contactDelete, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.queryList()
          })
        })
        .catch(() => null)
    },
    // 编辑成功回调
    editSaved () {
      this.dialogVisible_edit = false
      this.queryList()
    },
    // 修改每页显示数量
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.queryList()
    },
    // 跳转到某页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryList()
    },
    // 分页查询
    queryList () {
      let params = {page: this.currentPage, search_key: this.formData.search_key}
      Utils.getInfo(API.BP_contact, params).then(({result, info}) => {
        this.tableData = result
        this.currentPage = info.pagination.num_pages
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
    },
    // 时间截取
    formatterUploadTime (row, column) {
      return row.update_time.replace('T', ' ').substr(0, 19)
    },
    // 时间截取
    formatterRegTime (row, column) {
      return row.reg_time.replace('T', ' ').substr(0, 19)
    }
  },
  mounted: function () {
    this.queryList()
  }
}
</script>

<style scoped>
  .content {
    padding: 20px;
    width: 90%;
    max-width: 1400px;
  }

  .select {
    width: 120px;
  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
