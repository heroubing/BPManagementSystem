<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='投资阶段名称' prop='display_name'>
      <el-input v-model='ruleForm.display_name'/>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click="submitForm('ruleForm')">{{isAdd ? '确定新增' : '确定保存'}}</el-button>
      <el-button @click="resetForm('ruleForm')">{{isAdd ? '清空重写' : '重置'}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Utils from '../../../utils/Utils'
import API from '../../../utils/API'

export default {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '',
          display_name: '' // 投资阶段名称
        }
      }
    }
  },
  data () {
    return {
      isAdd: this.data.id === '', // 是否为新增
      ruleForm: {
        id: this.data.id,
        display_name: this.data.display_name // 投资阶段名称
      },
      rules: {
        display_name: [
          {required: true, message: '请输入投资阶段名称', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            display_name: this.ruleForm.display_name
          }
          if (this.isAdd) {
            Utils.getInfoPost(API.BP_Round_add, params).then(() => {
              this.$notify.success({
                title: '成功',
                message: '录入成功'
              })
              this.resetForm('ruleForm')
              this.$emit('saved')
            })
          } else {
            Utils.getInfoPost(API.BP_Round_update(this.data.id), params).then(() => {
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
    }
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
</style>
