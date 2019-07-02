<template>
  <div class="content">
    <el-form :inline='true' :model='formData' @submit.native.prevent style='margin-top: 20px;'>
      <el-form-item label=''>
        <el-radio-group v-model="formData.target">
          <el-radio :key="target.value" :label="target.value" border v-for="target in targetList">{{target.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click='queryList' type='primary'>搜索</el-button>
        <el-button @click='openDialog({id: ""})' type='primary'>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' style='width: 100%; margin-top: 20px' tooltip-effect='dark'>
      <el-table-column label='ID' prop='id' width='100px'></el-table-column>
      <el-table-column label='标题'>
        <template slot-scope='scope'>
          <el-button @click.native.prevent="info(scope.row.resource_url)" type='text'>{{scope.row.ad_title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label='广告类型' prop='ad_type' width='100px' :formatter="formatterAdType"></el-table-column>
      <el-table-column label='投放目标' prop='target' width='120px'></el-table-column>
      <el-table-column label='显示顺序' prop='show_order' width='100px'></el-table-column>
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
        target: Constant.target[0].value
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
    // 查看图片
    info (url) {
      window.open(url)
    },
    // 广告类型格式转换
    formatterAdType (row) {
      return Constant.ad_type.find(item => item.value === row.ad_type).label
    },
    // 新增/编辑
    openDialog (row) {
      this.dialogData = row
      this.dialogTitle = row.id ? `编辑广告-${row.id}` : '新增广告'
      this.dialogVisible_edit = true
    },
    // 删除
    deleteRow (row) {
      this.$confirm(`确认删除ID为"${row.id}"的广告吗？`)
        .then(() => {
          let params = {id: row.id}
          Utils.getInfoPost(API.ads_delete(row.id), params).then(() => {
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
      let params = {page: this.currentPage, target: this.formData.target}
      Utils.getInfo(API.ads_query, params).then(({result, info}) => {
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
