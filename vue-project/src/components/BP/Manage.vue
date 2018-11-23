<template>
  <div class="content">
    <el-form :inline='true' :model='formInline' class='demo-form-inline' style='margin-top: 20px;'>
      <el-form-item label='搜索(BP列表)关键字:'>
        <el-input v-model='formInline.user'></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model='formInline.region' class='select'>
          <el-option label='按标题' value='shanghai'></el-option>
          <el-option label='按关键字' value='beijing'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>搜索</el-button>
      </el-form-item>
      <el-form-item v-if="isMultiSelect">
        <el-button type='danger' @click='onSubmit'>批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref='multipleTable'
      :data='tableData'
      tooltip-effect='dark'
      style='width: 100%; margin-top: 20px'
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='80px'>
      </el-table-column>
      <el-table-column
        prop='id'
        label='BP标题'
        width='210px'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='提交人'
        width='180px'>
      </el-table-column>
      <el-table-column
        prop='date'
        label='上传时间'
        width='180px'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label='操作'
        width='180px'>
        <template slot-scope='scope'>
          <el-button
            @click.native.prevent='editRow(scope.$index, tableDate)'
            type='text'
            size='small'>
            编辑
          </el-button>
          <el-button
            @click.native.prevent='deleteRow(scope.$index, tableDate)'
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
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {
      formInline: {
        user: '',
        region: 'shanghai'
      },
      tableData: [
        {
          id: 'BP1-共享单车的商业计划书',
          date: '2016-05-03',
          name: 'service1'
        },
        {
          id: 'BP2',
          date: '2016-05-02',
          name: 'service2'
        },
        {
          id: 'BP3',
          date: '2016-05-04',
          name: 'service6'
        },
        {
          id: 'BP4',
          date: '2016-05-01',
          name: 'service7'
        }
      ],
      multipleSelection: [],
      currentPage: 1,
      total: 4
    }
  },
  computed: {
    isMultiSelect: function () {
      return this.multipleSelection.length > 0
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    editRow (index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
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

  .el-pagination{
    margin-top: 20px;
  }
</style>
