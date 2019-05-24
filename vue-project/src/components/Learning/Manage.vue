<template>
  <div class="content">
    <el-form :inline='true' :model='formData' style='margin-top: 20px;' @submit.native.prevent>
      <el-form-item label=''>
        <el-input v-model='formData.search_key' placeholder="请输入标题进行检索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='queryList'>搜索</el-button>
        <el-button type='primary' @click='add'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' tooltip-effect='dark' style='width: 100%; margin-top: 20px'>
      <el-table-column prop='id' label='ID' width='100px'></el-table-column>
      <el-table-column label='标题'>
        <template slot-scope='scope'>
          {{scope.row.material_title}}
          <el-button @click.native.prevent='viewFile(scope.row.outline_file)' type='text' size='small'>
            [简介]
          </el-button>
          <el-button @click.native.prevent='viewFile(scope.row.video_file)' type='text' size='small'>
            [视频]
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop='update_time' label='上传时间' :formatter='formatterUploadTime'
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop='points' label='所需积分' width="150px"></el-table-column>
      <el-table-column prop='view_count' label='浏览数' width="150px"></el-table-column>
      <!--      <el-table-column label='是否有读取权限'>-->
      <!--        <template slot-scope='scope'>-->
      <!--          <div>{{scope.row.permission?'是':'否'}}</div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label='操作' width='200px'>
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
import Utils from '../../utils/Utils'
import Edit from './Edit'
import API from '../../utils/API'

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
      this.dialogData = {id: ''}
      this.dialogTitle = '新增在线学习'
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      this.$confirm(`确认删除"${row.material_title}"吗？`)
        .then(() => {
          let params = {id: row.id}
          Utils.getInfoPost(API.Learning_delete, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.queryList()
          })
        })
        .catch(() => null)
    },
    // 编辑
    editRow (row) {
      this.dialogData = row
      this.dialogTitle = `编辑-${row.material_title}`
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
      Utils.getInfo(API.Learning_query, params).then(({result, info}) => {
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
    // 获取文件
    viewFile (url) {
      if (!url || url.indexOf('/null') >= 0) {
        this.$message({
          showClose: true,
          message: '您还未上传相关文件',
          type: 'warning'
        })
        return
      }
      window.open(url)
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
