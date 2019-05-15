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
          <el-button v-if="scope.row.review_status === 'WAITING'" @click.native.prevent='openReview(scope.row)'
                     type='text' size='small'>
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

    <!--驳回审核填写弹出框-->
    <el-dialog title="审核" :visible.sync="dialog_rejectReview">
      <el-form :model="formData_rejectReview" :rules='rules_rejectReview' ref='ruleForm_rejectReview'
               label-width='100px' style=" text-align: left;">
        <el-form-item label="审核">
          <el-radio-group v-model="formData_rejectReview.review_status">
            <el-radio label="PASS">通过</el-radio>
            <el-radio label="REJECT">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formData_rejectReview.review_status === 'PASS'" label="审核备注" prop="reviewer_note_pass">
          <el-input v-model="formData_rejectReview.reviewer_note_pass"></el-input>
        </el-form-item>
        <el-form-item v-if="formData_rejectReview.review_status === 'REJECT'" label="审核备注" prop="reviewer_note_reject">
          <el-input v-model="formData_rejectReview.reviewer_note_reject"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_rejectReview = false">取 消</el-button>
        <el-button type="primary" @click="review">确 定</el-button>
      </div>
    </el-dialog>
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
      roundList: [],
      currentRow: {}, // 当前选中行
      dialog_rejectReview: false,
      formData_rejectReview: {
        review_status: 'PASS', // 是否通过
        reviewer_note_pass: '', // 通过备注
        reviewer_note_reject: '' // 驳回备注
      },
      rules_rejectReview: {
        reviewer_note_reject: [
          {required: true, message: '请输入驳回原因', trigger: 'blur'}
        ]
      }
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
  },
  methods: {
    info (row) {
      let url
      if (row.business_card) {
        url = row.business_card
      } else {
        url = window.location.origin + API.Investor_businessCard(row.user_id)
      }
      window.open(url)
    },
    // 打开审核页面
    openReview (row) {
      this.dialog_rejectReview = true
      this.currentRow = row
      setTimeout(() => this.$refs.ruleForm_rejectReview.resetFields(), 100)
    },
    // 审核
    review () {
      this.$refs.ruleForm_rejectReview.validate((valid) => {
        if (valid) {
          let {review_status: reviewStatus, reviewer_note_pass: reviewerNotePass, reviewer_note_reject: reviewerNoteReject} = this.formData_rejectReview
          let params = {
            id: this.currentRow.user_id,
            review_status: reviewStatus,
            reviewer_note: reviewStatus === 'PASS' ? reviewerNotePass : reviewerNoteReject
          }
          Utils.getInfoPost(API.Investor_review(params.id), params).then(() => {
            this.$notify.success({
              title: '成功',
              message: '操作成功'
            })
            this.$refs.ruleForm_rejectReview.resetFields()
            this.currentRow = {}
            this.dialog_rejectReview = false
            this.queryList()
          })
        }
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
      // PASS 通过 | REJECT 驳回 | WAITING 等待审核
      let reviewedName
      switch (row.review_status) {
        case 'PASS':
          reviewedName = '通过'
          break
        case 'WAITING':
          reviewedName = '等待审核'
          break
        case 'REJECT':
          reviewedName = '驳回'
      }
      return reviewedName
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
