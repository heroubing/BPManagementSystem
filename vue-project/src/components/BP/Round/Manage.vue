<template>
  <div class="content">
    <el-form :inline='true' :model='formData' class='demo-form-inline' style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-input v-model='formData.search_key' placeholder="请输入投资阶段名称进行检索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='queryList'>搜索</el-button>
        <el-button type='primary' @click='add'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' tooltip-effect='dark' style='width: 100%; margin-top: 20px'>
      <el-table-column prop='id' label='投资阶段ID' width='100px'></el-table-column>
      <el-table-column prop='display_name' label='投资阶段名称' width='210px'></el-table-column>
      <el-table-column label='操作' width='180px'>
        <template slot-scope='scope'>
          <el-button @click.native.prevent='editRow(scope.row)' type='text' size='small'>编辑</el-button>
          <el-button @click.native.prevent='deleteRow(scope.row)' type='text' size='small'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[pageSize]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible_edit">
      <Edit v-if="dialogVisible_edit" :data="dialogData" @saved="editSaved"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '../../../utils/Utils'
import Edit from './Edit'
import API from '../../../utils/API'

export default {
  name: 'Manage',
  components: {Edit},
  data () {
    return {
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
    add () {
      this.dialogData = {}
      this.dialogTitle = '新增投资阶段'
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      console.log(row)
      this.$confirm(`确认删除"${row.display_name}"投资阶段吗？`)
        .then(_ => {
          let params = {id: row.id}
          Utils.getInfoPost(API.BP_Round_delete, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.queryList()
          })
        })
        .catch(_ => {})
    },
    // 编辑
    editRow (row) {
      this.dialogData = row
      this.dialogTitle = `编辑 ${row.id}-${row.display_name}`
      this.dialogVisible_edit = true
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
      Utils.getInfo(API.BP_Round_query, params).then(({result, info}) => {
        this.tableData = result
        this.currentPage = info.pagination.num_pages
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
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
  }

  .select {
    width: 120px;
  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
