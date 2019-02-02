<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px'>
    <el-form-item label='用户ID' prop='user'>
      <el-input v-model='ruleForm.user'/>
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
          organization: '', // 所属机构
          contact_info: '' // 联系方式
        }
      }
    }
  },
  data () {
    return {
      isAdd: !this.data.user, // 是否为新增
      ruleForm: {
        user: this.data.user, // 用户ID
        organization: this.data.organization, // 所属机构
        contact_info: this.data.contact_info // 联系方式
      },
      rules: {
        user: [
          {required: true, message: '请输入用户ID', trigger: 'blur'}
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
    // 表单提交
    submitForm (formName) {
      console.log(12)
      this.$refs[formName].validate((valid) => {
        console.log(1)
        if (valid) {
          console.log(3)
          let params = {
            user: parseInt(this.ruleForm.user),
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
    /*max-width: 400px;*/
    text-align: center;
    margin-right: 150px;
    /*padding: 20px;*/
  }

  .el-form-item {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
