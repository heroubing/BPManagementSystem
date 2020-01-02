<template>
  <div class="content">
    <el-form :inline='true' :model='formData' @submit.native.prevent style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-input placeholder="请输入机构名称进行检索" style="width: 250px;" v-model='formData.search_key'/>
      </el-form-item>
      <el-form-item>
        <el-button @click='queryList(true)' type='primary'>搜索</el-button>
        <el-button @click='openDialog()' type='primary'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' style='width: 100%; margin-top: 20px' tooltip-effect='dark'>
      <el-table-column label='ID' prop='id' width='100px'/>
      <el-table-column label='机构名称' prop='org_name'/>
      <el-table-column :formatter="formatterIsActive" label='是否激活' prop='is_active' width='100px'/>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible_edit" width="60%">
      <Edit :data="dialogData" @saved="editSaved" v-if="dialogVisible_edit"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '@/utils/Utils'
import Edit from './Edit'
import API from '@/utils/API'

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
    // 是否激活格式转换
    formatterIsActive (row) {
      return row.is_active ? '是' : '否'
    },
    // 新增/编辑
    openDialog (row) {
      this.dialogData = row
      this.dialogTitle = row ? `编辑投资机构-${row.id}` : '新增投资机构'
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      this.$confirm(`确认删除"${row.id}-${row.org_name}"吗？`)
        .then(() => {
          let params = {id: row.id}
          Utils.getInfoPost(API.Investment_delete, params).then(() => {
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
      let params = {page: this.currentPage, search_key: this.formData.search_key}
      Utils.getInfo(API.Investment_query, params).then(({result, info}) => {
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

  .el-pagination {
    margin-top: 20px;
  }
</style>
