<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='机构名称' prop='org_name'>
        <el-input v-model='ruleForm.org_name'/>
      </el-form-item>
      <el-form-item label='是否激活' prop='is_active'>
        <el-radio-group v-model="ruleForm.is_active">
          <el-radio :key="item.value" :label="item.value" v-for="item in is_activeList">{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='初始管理员' prop='user' v-if="isAdd">
        <el-autocomplete
          :debounce="500"
          :disabled="!isAdd"
          :fetch-suggestions="(searchKey, cb) => queryInputList(searchKey, cb, 'user')"
          :trigger-on-focus="true"
          @select="(item) => handleSelect(item, 'user')"
          placeholder="请输入完整用户名查询"
          popper-class="Add-autocomplete"
          v-model="ruleForm.user_name"
        >
          <template slot-scope="{item}">
            <div class="name">{{item.user_name}}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label='初始管理员用户组' prop='user_group' v-if="isAdd">
        <el-input v-model='ruleForm.user_group'/>
      </el-form-item>
      <el-form-item label='过期时间' prop='expire_time'>
        <el-date-picker
          placeholder="选择日期时间"
          type="datetime"
          value-format="yyyy-MM-ddTHH:mm:ss"
          v-model="ruleForm.expire_time"
        >
        </el-date-picker>
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
          org_name: '', // 机构名称
          is_active: true, // 是否激活
          expire_time: '' // 过期时间
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      is_activeList: Constant.isNot_boolean,
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        org_name: data.org_name,
        is_active: data.is_active,
        user: null, // 用户id
        user_name: '', // 用户id显示信息
        expire_time: data.expire_time, // 过期时间
        user_group: 'admin' // 所属用户组
      },
      rules: {
        org_name: [
          {required: true, message: '请输入机构名称', trigger: 'blur'}
        ],
        user: [
          {required: true, message: '请通过查询点击选择指定初始管理员', trigger: 'blur'},
          {
            validator: (rule, value, callback) => this.validator(rule, value, callback, 'user'),
            message: '请通过查询点击选择指定初始管理员'
          }
        ],
        user_group: [
          {required: true, message: '请输入初始管理员用户组', trigger: 'blur'}
        ],
        expire_time: [
          {required: true, message: '请选择过期时间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 用户查询
    queryInputList (searchKey, cb, key) {
      if (!searchKey && key === 'user') {
        let result = []
        cb(result)
        return
      }
      // 清空key，确保key是用户点击选择的
      this.ruleForm[key] = ''
      let api = ''
      let value = ''
      let params = {search_key: searchKey, page: 1}
      switch (key) {
        case 'user':
          api = API.USER_search
          value = 'user_name'
          break
        case 'group':
          api = API.User_group_query
          value = 'display_name'
          params.is_admin = true
          break
      }
      Utils.getInfo(api, params, false).then(({result}) => {
        if (key === 'user') result = [result]
        cb(result.map(item => Object.assign({value: item[value]}, item)))
      })
    },
    // 选中联系人
    handleSelect (item, key) {
      this.ruleForm[key] = item.id
    },
    // 校验用户ID是否为用户选择而非手填
    validator (rule, value, callback, key) {
      if (this.ruleForm[key] === '') {
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
            org_name: this.ruleForm.org_name,
            is_active: this.ruleForm.is_active,
            user: this.ruleForm.user,
            user_group: this.ruleForm.user_group,
            expire_time: this.ruleForm.expire_time
          }
          let url = API.Investment_create
          let message = '录入成功'
          if (!this.isAdd) {
            delete params.user
            delete params.user_group
            url = API.Investment_update(this.data.id)
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
