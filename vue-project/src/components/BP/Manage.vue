<template>
  <div class="content">
    <el-form :inline='true' :model='formData' @submit.native.prevent style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-input placeholder="请输入项目名称或简介进行检索" style="width: 250px;" v-model='formData.search_key'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click='queryList(true)' type='primary'>搜索</el-button>
        <el-button @click='createNew()' type='primary'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' style='width: 100%; margin-top: 20px' tooltip-effect='dark'>
      <el-table-column label='BPID' prop='id'></el-table-column>
      <el-table-column label='项目名称' prop='project_name'></el-table-column>
      <el-table-column :formatter="formatterUploadTime" label='上传时间' prop='upload_time'
                       show-overflow-tooltip></el-table-column>
      <el-table-column label='阅读商业计划书积分' prop='points'></el-table-column>
      <el-table-column label='获取联系信息积分' prop='contact_points'></el-table-column>
      <el-table-column label='操作' width='200px'>
        <template slot-scope='scope'>
          <el-button @click.native.prevent='downloadFile(scope.row)' size='small' type='text'>下载文件</el-button>
          <el-button @click.native.prevent='editRow(scope.row)' size='small' type='text'>编辑</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible_edit" v-if="dialogVisible_edit">
      <Add :data="dialogData" @saved="editSaved"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '../../utils/Utils'
import Add from './Add'
import API from '../../utils/API'

export default {
  name: 'Manage',
  components: {Add},
  data () {
    return {
      formData: {
        search_key: ''
      },
      dialogData: {},
      dialogTitle: '编辑',
      dialogVisible_edit: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 50
    }
  },
  methods: {
    // 下载商业计划书文件
    downloadFile (row) {
      let url = API.BP_fileApiView(row.id)
      window.open(window.location.origin + url)
    },
    // 删除
    deleteRow (row) {
      console.log(row)
      this.$confirm(`确认删除"${row.project_name}"项目吗？`)
        .then(_ => {
          let params = {id: row.id}
          Utils.getInfoPost(API.BP_delete, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.queryList()
          })
        })
        .catch(_ => {
        })
    },
    // 新增
    createNew () {
      this.dialogData = {
        id: '',
        project_name: '', // 项目名称
        brief: '', // 项目简介
        points: '500', // 阅读商业计划书积分，默认500
        contact_points: '500', // 阅读联系信息积分，默认500
        industries: [], // 行业，逗号分隔，每一个元素是一个行业ID
        round_id: '' // 投资阶段ID
      }
      this.dialogTitle = `新增商业计划书（BP）`
      this.dialogVisible_edit = true
    },
    // 编辑
    editRow (row) {
      let tempRow = JSON.parse(JSON.stringify(row))
      tempRow.industries = tempRow.industries ? tempRow.industries.split(',').map((item) => parseInt(item)) : []
      console.log(tempRow)
      this.dialogData = tempRow
      this.dialogTitle = `编辑-${tempRow.project_name}`
      this.dialogVisible_edit = true
    },
    // 编辑成功回调
    editSaved () {
      // 关闭弹框
      this.dialogVisible_edit = false
      // 重新查询列表
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
      Utils.getInfo(API.BP_query, params).then(({result, info}) => {
        this.tableData = result
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
    },
    // 时间截取
    formatterUploadTime (row, column) {
      return row.upload_time.replace('T', ' ').substr(0, 19)
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
