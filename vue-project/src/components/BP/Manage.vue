<template>
  <div class="content">
    <el-form :inline='true' :model='formData' class='demo-form-inline' style='margin-top: 20px;'>
      <el-form-item label='搜索(BP列表)关键字:'>
        <el-input v-model='formData.project_name'></el-input>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-select v-model='formInline.region' class='select'>-->
      <!--<el-option label='按标题' value='shanghai'></el-option>-->
      <!--<el-option label='按关键字' value='beijing'></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type='primary' @click='queryList'>搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data='tableData'
      tooltip-effect='dark'
      style='width: 100%; margin-top: 20px'>
      <el-table-column
        prop='project_name'
        label='BP标题'
        width='210px'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='提交人'
        width='180px'>
      </el-table-column>
      <el-table-column
        prop='upload_time'
        label='上传时间'
        width='180px'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label='操作'
        width='180px'>
        <template slot-scope='scope'>
          <el-button
            @click.native.prevent='editRow(scope.row)'
            type='text'
            size='small'>
            编辑
          </el-button>
          <el-button
            @click.native.prevent='deleteRow(scope.row)'
            type='text'
            size='small'>
            删除
          </el-button>
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
      <Add :data="dialogData" @saved="editSaved"/>
    </el-dialog>
  </div>
</template>

<script>
import Utils from '../../utils/Utils'
import Add from './Add'

export default {
  name: 'Manage',
  components: {Add},
  data () {
    return {
      formData: {
        project_name: '',
        region: 'shanghai'
      },
      dialogData: {},
      dialogTitle: '编辑',
      dialogVisible_edit: false,
      tableData: [],
      currentPage: 1,
      total: 4,
      pageSize: 50
    }
  },
  // computed: {
  //   isMultiSelect: function () {
  //     return this.multipleSelection.length > 0
  //   }
  // },
  methods: {
    // 删除
    deleteRow (row) {
      console.log(row)
      let params = {id: row.id}
      Utils.getInfoPost('/api/bp/delete/', params, this).then(() => {
        this.queryList()
      })
    },
    // 编辑
    editRow (row) {
      console.log(row)
      this.dialogData = row
      this.dialogTitle = `编辑-${row.project_name}`
      this.dialogVisible_edit = true
    },
    // 编辑成功回调
    editSaved () {
      console.log('编辑成功')
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
      let params = {page: this.currentPage}
      Utils.getInfo('/api/bp/', params, this).then(({result, info}) => {
        this.tableData = result
        this.currentPage = info.pagination.num_pages
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
      // setTimeout(() => {
      //   this.tableData = [
      //     {
      //       id: 2,
      //       project_name: '测试2',
      //       brief: '',
      //       upload_time: '2018-10-06T19:47:53+0800',
      //       update_time: '2018-10-06T19:47:53+0800',
      //       industries: '1,4',
      //       round_id: 1,
      //       round: 'pre-A',
      //       points: 10,
      //       permission: false,
      //       permission_contact: false
      //     },
      //     {
      //       id: 1,
      //       project_name: '测试',
      //       brief: '',
      //       upload_time: '2018-10-06T19:47:53+0800',
      //       update_time: '2018-10-06T19:47:53+0800',
      //       industries: '9',
      //       round_id: 1,
      //       round: 'pre-A',
      //       points: 10,
      //       permission: false,
      //       permission_contact: false
      //     }
      //   ]
      // }, 1000)
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
