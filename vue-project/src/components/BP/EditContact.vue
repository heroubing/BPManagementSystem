<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px'>
    <el-form-item label='用户' prop='user_value'>
      <el-autocomplete
        popper-class="Add-autocomplete"
        v-model="ruleForm.user_value"
        :fetch-suggestions="queryUserList"
        placeholder="请输入关键字查询"
        @select="handleSelect"
        :trigger-on-focus="true"
        :debounce="500"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.id}}-{{ item.user_name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label='所属机构' prop='organization'>
      <el-input v-model='ruleForm.organization'/>
    </el-form-item>
    <el-form-item label='联系方式' prop='contact_info'>
      <el-input type="textarea" v-model='ruleForm.contact_info'/>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click="submitForm('ruleForm')">{{!isAdd?'确定保存':'确定新增'}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Utils from '../../utils/Utils'
import API from '../../utils/API'

export default {
  name: 'EditContact',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          user: '', // 用户ID
          user_value: '', // 用户ID显示信息
          organization: '', // 所属机构
          contact_info: '' // 联系方式
        }
      }
    }
  },
  data () {
    const checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户ID不能为空'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('用户ID必须为数字'))
      } else {
        callback()
      }
    }
    return {
      isAdd: !this.data.user, // 是否为新增
      ruleForm: {
        user: this.data.user, // 用户ID
        user_value: this.data.user_value, // 用户ID显示信息
        organization: this.data.organization, // 所属机构
        contact_info: this.data.contact_info // 联系方式
      },
      rules: {
        user: [
          {required: true, validator: checkUser, trigger: 'blur'}
        ],
        user_value: [
          {required: true, message: '请选择用户', trigger: 'blur'},
          {validator: this.validatorUser, message: '请通过查询点击选择现有用户'}
        ],
        organization: [
          {required: true, message: '请输入所属机构', trigger: 'blur'}
        ],
        contact_info: [
          {required: true, message: '请输入联系方式', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 用户查询
    queryUserList (searchKey, cb) {
      // 清空user，确保user是用户点击选择的
      this.ruleForm.user = ''
      let params = {search_key: searchKey, page: 1}
      Utils.getInfo(API.USER_query, params, false).then(({result}) => {
        cb(result.map(item => Object.assign({value: item.user_name}, item)))
      })
    },
    // 选中联系人
    handleSelect (item) {
      this.ruleForm.user = item.id
    },
    // 校验用户ID是否为用户选择而非手填
    validatorUser (rule, value, callback) {
      if (this.ruleForm.user === '') {
        callback(new Error())
      } else {
        callback()
      }
    },
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            user_value: this.ruleForm.user_value,// 用于回显
            user: this.ruleForm.user,
            organization: this.ruleForm.organization,
            contact_info: this.ruleForm.contact_info
          }
          if (this.isAdd) {
            Utils.getInfoPost(API.BP_contactCreate, params).then(() => {
              this.$notify.success({
                title: '成功',
                message: '新增联系人成功'
              })
              this.$emit('saved', params)
              this.$refs[formName].resetFields()
            })
          } else {
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-form {
    width: 100%;
    text-align: right;
    margin:0 auto 0 auto;
    padding-left: 50px;
  }

  .el-form-item {
    width: 80%;
  }

  .el-autocomplete {
    width: 100%;
  }
</style>
