<template>
  <div class="content">
    <el-form :inline='true' :model='formData' class='demo-form-inline' style='margin-top: 20px;' @submit.native.prevent>
      <el-form-item label=''>
        <el-input v-model='formData.search_key' placeholder="请输入投资人信息进行检索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='queryList'>搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='tableData' tooltip-effect='dark' style='width: 100%; margin-top: 20px'>
      <el-table-column prop='user_id' label='用户id' width='100px'></el-table-column>
      <el-table-column prop='user.user_name' label='用户名称'></el-table-column>
      <el-table-column prop='organization' label='所属机构'></el-table-column>
      <el-table-column prop='org_email' label='机构邮箱'></el-table-column>
      <el-table-column prop='fav_round' :formatter="formatterRound" label='偏好阶段'></el-table-column>
      <el-table-column prop='fav_industries' :formatter="formatterIndustries" label='偏好行业'></el-table-column>
      <el-table-column prop='reg_time' label='注册时间' show-overflow-tooltip
                       :formatter="formatterRegTime"></el-table-column>
      <el-table-column prop='is_reviewed' label='审核状态' width='100px' :formatter="formatterIsReview"></el-table-column>
      <el-table-column label='操作' width='200px'>
        <template slot-scope='scope'>
          <el-button @click.native.prevent='info(scope.row)' type='text' size='small'>查看名片</el-button>
          <el-button v-if="!scope.row.is_reviewed" @click.native.prevent='review(scope.row)' type='text' size='small'>
            审核
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
  </div>
</template>

<script>
import Utils from '../../utils/Utils'
import API from '../../utils/API'

export default {
  name: 'Review',
  data () {
    return {
      formData: {
        search_key: ''
      },
      search_key: '',
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 50,
      industriesList: [],
      roundList: []
    }
  },
  methods: {
    info (row) {
      let url = API.Investor_businessCard(row.user_id)
      window.open(window.location.origin + url)
    },
    // 删除
    review (row) {
      this.$confirm(`确认审核通过"${row.user.user_name}"吗？`)
        .then(_ => {
          let params = {id: row.user_id, result: true}
          Utils.getInfoPost(API.Investor_review(params.id), params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '审核通过'
            })
            this.queryList()
          })
        })
        .catch(_ => {
        })
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
      let params = {
        page: this.currentPage,
        search_key: this.formData.search_key
      }
      Utils.getInfo(API.Investor_query, params).then(({result, info}) => {
        this.tableData = result
        this.currentPage = info.pagination.num_pages
        this.total = info.pagination.count
        this.pageSize = info.pagination.per_page
      })
    },
    // 时间截取
    formatterRegTime (row, column) {
      return row.reg_time.replace('T', ' ').substr(0, 19)
    },
    // 时间截取
    formatterIsReview (row, column) {
      return row.is_reviewed ? '已审核' : '未审核'
    },
    formatterRound (row, column) {
      let roundObjList = this.roundList
      let roundList = row.fav_round ? row.fav_round.split(',') : []
      roundList = roundList.map(round => {
        let returnItem = roundObjList.find(item => item.id === Number(round))
        return returnItem.display_name
      })
      return roundList.join(',')
    },
    formatterIndustries (row, column) {
      let industriesObjList = this.industriesList
      let industriesList = row.fav_industries ? row.fav_industries.split(',') : []
      industriesList = industriesList.map(industry => {
        let returnItem = industriesObjList.find(item => item.id === Number(industry))
        return returnItem.display_name
      })
      return industriesList.join(',')
    }
  },
  mounted: function () {
    // 获取行业列表/投资阶段列表
    Promise.all([Utils.getAllPageList(API.BP_Industry_query, [], 1), Utils.getAllPageList(API.BP_round, [], 1)]).then((resultList) => {
      console.log(resultList)
      this.industriesList = resultList[0]
      this.roundList = resultList[1]
      this.queryList()
    })
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
