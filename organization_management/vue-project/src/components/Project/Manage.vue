<template>
  <div class="content">
    <el-form :inline='true' :model='formData' @submit.native.prevent style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-input placeholder="请输入项目全名、简称或编码进行检索" style="width: 300px;" v-model='formData.search_key'/>
      </el-form-item>
      <el-form-item>
        <el-button @click='queryList(true)' type='primary'>搜索</el-button>
        <el-button @click='openDialog()' type='primary'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' style='width: 100%; margin-top: 20px' tooltip-effect='dark'>
      <el-table-column label='投资项目ID' prop='id' width='100px'/>
      <el-table-column label='项目全称' prop='full_name'/>
      <el-table-column label='简称' prop='short_name' width='150px'/>
      <el-table-column label='编码' prop='code' width='100px'/>
      <el-table-column label='状态' prop='status' width='100px'/>
      <el-table-column label='所属行业' prop='industry' width='100px'/>
      <el-table-column label='来源' prop='origin' width='100px'/>
      <el-table-column label='操作' width='200px'>
        <template slot-scope='scope'>
          <el-button
            @click.native.prevent='openDialog(scope.row, userInfo.id === scope.row.upload_user ? Constant.METHOD_EDIT : Constant.METHOD_SHOW)'
            size='small'
            type='text'
          >
            {{userInfo.id === scope.row.upload_user ? '编辑' : '查看'}}
          </el-button>
          <!--          <el-button @click.native.prevent='deleteRow(scope.row)' size='small' type='text'>删除</el-button>-->
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible_edit" width="65%">
      <Edit :data="dialogData" @saved="editSaved" v-if="dialogVisible_edit" :method="dialogMethod"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '@/utils/Utils'
import Edit from './Edit'
import API from '@/utils/API'
import Constant from '@/utils/Constant'

export default {
  name: 'Manage',
  components: {Edit},
  data () {
    return {
      userInfo: Utils.getUserInfo(),
      Constant,
      formData: {
        search_key: ''
      },
      dialogData: {},
      dialogTitle: '',
      dialogVisible_edit: false,
      dialogMethod: Constant.METHOD_ADD,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 50
    }
  },
  methods: {
    // 是否激活格式转换
    formatterIsActive (row) {
      return row.is_active ? '是' : '否'
    },
    // 新增/编辑/查看
    openDialog (row, method = Constant.METHOD_ADD) {
      this.dialogData = row
      switch (method) {
        case Constant.METHOD_ADD:
          this.dialogTitle = `新增项目`
          break
        case Constant.METHOD_EDIT:
          this.dialogTitle = `编辑项目-${row.id}`
          break
        case Constant.METHOD_SHOW:
          this.dialogTitle = `查看项目-${row.id}`
          break
      }
      this.dialogMethod = method
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      this.$confirm(`确认删除项目【${row.id}】${row.full_name} 吗？`)
        .then(() => {
          let params = {id: row.id}
          Utils.getInfoPost(API.InvestmentProject_delete, params).then(() => {
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
      this.queryList(true)
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
    queryList (isFirstQuery) {
      if (isFirstQuery) this.currentPage = 1
      let params = {page: this.currentPage, name: this.formData.search_key}
      Utils.getInfo(API.InvestmentProject_query, params).then(({result, info}) => {
        this.tableData = result
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
    }
  },
  mounted: function () {
    this.queryList(true)
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
