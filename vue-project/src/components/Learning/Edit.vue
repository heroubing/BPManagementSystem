<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='项目名称' prop='project_name'>
      <el-input v-model='ruleForm.project_name'/>
    </el-form-item>
    <el-form-item label='项目简介' prop='brief'>
      <el-input v-model='ruleForm.brief'/>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click="submitForm('ruleForm')">{{isAdd ? '确定新增' : '确定保存'}}</el-button>
      <el-button @click="resetForm('ruleForm')">{{isAdd ? '清空重写' : '重置'}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Utils from '../../utils/Utils'
import API from '../../utils/API'

export default {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '',
          project_name: '', // 项目名称
          brief: '', // 项目简介
          contact: '', // 联系人ID
          points: '500', // 阅读商业计划书积分，默认500
          contact_points: '500', // 阅读联系信息积分，默认500
          industries: [], // 行业，逗号分隔，每一个元素是一个行业ID
          round_id: '', // 投资阶段ID
          bp_file_input: '' // 文件校验占用
        }
      }
    }
  },
  data () {
    return {
      dialogVisible_addContact: false, // 新建联系人弹出框
      industriesList: [], // 行业列表
      roundList: [], // 投资阶段列表
      isAdd: this.data.id === '', // 是否为新增
      ruleForm: {
        id: this.data.id,
        project_name: this.data.project_name, // 项目名称
        brief: this.data.brief, // 项目简介
        contact: this.data.contact, // 联系人ID
        contact_value: '', // 联系人显示信息
        points: this.data.points, // 阅读商业计划书积分，默认500
        contact_points: this.data.contact_points, // 阅读联系信息积分，默认500
        industries: this.data.industries, // 行业，逗号分隔，每一个元素是一个行业ID
        round_id: this.data.round_id, // 投资阶段ID
        bp_file_input: this.data.bp_file_input, // 文件校验占用
        bp_file: null // BP文件
      },
      rules: {
        project_name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        brief: [
          {required: true, message: '请输入项目简介', trigger: 'blur'}
        ],
        contact_value: [
          {required: true, message: '请选择联系人', trigger: 'blur'},
          {validator: this.validatorContact, message: '请通过点击选择现有联系人或通过右侧新增按钮新增'}
        ]
      }
    }
  },
  methods: {
    // 新增联系人回传
    contactSaved (contactData) {
      this.dialogVisible_addContact = false
      this.ruleForm.contact = contactData.user
      this.ruleForm.contact_value = contactData.user
    },
    // 联系人查询
    queryContactList (searchKey, cb) {
      if (searchKey === '') {
        return null
      }
      // 清空contact，确保联系人是用户点击选择的
      this.ruleForm.contact = ''
      let params = {search_key: searchKey}
      Utils.getInfo(API.BP_contact, params, false).then(({result}) => {
        cb(result.map(item => Object.assign({value: item.user.user_name}, item)))
      })
    },
    // 选中联系人
    handleSelect (item) {
      this.ruleForm.contact = item.user_id
    },
    // 点击文件列表中已上传的文件时的钩子
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file, fileList) {
      this.ruleForm.bp_file = file.raw
      this.ruleForm.bp_file_input = file.name
      console.log('onChange', file, fileList)
    },
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            project_name: this.ruleForm.project_name,
            brief: this.ruleForm.brief,
            contact: this.ruleForm.contact,
            points: this.ruleForm.points,
            contact_points: this.ruleForm.contact_points,
            industries: this.ruleForm.industries.join(','),
            round_id: this.ruleForm.round_id,
            bp_file: this.ruleForm.bp_file
          }
          if (this.isAdd) {
            Utils.getInfoPost(API.BP_add, params).then(() => {
              this.$notify.success({
                title: '成功',
                message: '录入成功'
              })
              this.resetForm('ruleForm')
            })
          } else {
            Utils.getInfoPost(API.BP_update(this.data.id), params).then(() => {
              this.$notify.success({
                title: '成功',
                message: '保存成功'
              })
              this.$emit('saved')
            })
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 校验联系人是否为用户选择而非手填
    validatorContact (rule, value, callback) {
      if (this.ruleForm.contact === '') {
        callback(new Error())
      } else {
        callback()
      }
    }
  },
  mounted () {
    // // 获取行业列表
    // Utils.getAllPageList(API.BP_industry, [], 1).then((result) => {
    //   this.industriesList = result
    // })
    // // 获取投资阶段列表
    // Utils.getAllPageList(API.BP_round, [], 1).then((result) => {
    //   this.roundList = result
    // })
  }
}
</script>

<style scoped>
  .el-form {
    width: 100%;
    max-width: 500px;
    text-align: start;
    margin-right: 150px;
    padding: 20px;
  }

  .upload {
    text-align: end;
    width: 100%;
    margin-bottom: 22px;
    display: inline;
  }

  .el-autocomplete {
    width: 100%;
  }

  .my-autocomplete li {
    line-height: normal;
    padding: 7px;

  }

  .my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .my-autocomplete .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .my-autocomplete .highlighted .addr {
    color: #ddd;
  }

</style>
