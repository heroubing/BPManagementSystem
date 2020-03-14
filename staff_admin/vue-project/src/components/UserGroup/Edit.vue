<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='投资用户组名称' prop='display_name'>
        <el-input v-model='ruleForm.display_name'/>
      </el-form-item>
      <el-form-item label='是否激活' prop='is_active'>
        <el-radio-group v-model="ruleForm.is_active">
          <el-radio :key="item.value" :label="item.value" v-for="item in is_activeList">{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='是否为管理员组' prop='is_admin'>
        <el-radio-group v-model="ruleForm.is_admin">
          <el-radio :key="item.value" :label="item.value" v-for="item in is_adminList">{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="submitForm('ruleForm')" type='primary'>{{isAdd ? '确定新增' : '确定保存'}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{isAdd ? '清空重写' : '重置'}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Utils from '@/utils/Utils'
import API from '@/utils/API'
import Constant from '@/utils/Constant'

export default {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // id
          display_name: '', // 投资用户组
          is_active: true, // 是否激活
          is_admin: true, // 是否为管理员组
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      is_activeList: Constant.isNot_boolean,
      is_adminList: Constant.isNot_boolean,
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        display_name: data.display_name,
        is_active: data.is_active,
        is_admin: data.is_admin
      },
      rules: {
        display_name: [
          {required: true, message: '请输入投资用户组名称', trigger: 'blur'}
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
            display_name: this.ruleForm.display_name,
            is_active: this.ruleForm.is_active,
            is_admin: this.ruleForm.is_admin
          }
          let url = API.User_group_create
          let message = '录入成功'
          if (!this.isAdd) {
            url = API.User_group_update(this.data.id)
            message = '保存成功'
          }
          Utils.getInfoPost(url, params).then(() => {
            this.$notify.success({title: '成功', message})
            this.resetForm('ruleForm')
            this.$emit('saved')
          })
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
  .container {
    display: flex;
    justify-content: center;
  }

  .el-form {
    width: 100%;
    max-width: 600px;
    text-align: start;
    margin-right: 150px;
    padding: 20px;
  }
</style>
