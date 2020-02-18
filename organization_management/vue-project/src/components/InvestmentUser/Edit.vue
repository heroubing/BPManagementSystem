<template>
  <el-form :model='ruleForm' :rules='rules' label-width='100px' ref='ruleForm'>
    <el-form-item label='用户' prop='user'>
      <el-autocomplete
        :disabled="!isAdd"
        :debounce="500"
        :fetch-suggestions="(searchKey, cb) => queryInputList(searchKey, cb, 'user')"
        :trigger-on-focus="true"
        @select="(item) => handleSelect(item, 'user')"
        placeholder="请输入关键字查询"
        popper-class="Add-autocomplete"
        v-model="ruleForm.user_name"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.id}}-{{ item.user_name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label='所属机构' prop='organization'>
      <el-autocomplete
        :debounce="500"
        :fetch-suggestions="(searchKey, cb) => queryInputList(searchKey, cb, 'organization')"
        :trigger-on-focus="true"
        @select="(item) => handleSelect(item, 'organization')"
        placeholder="请输入关键字查询"
        popper-class="Add-autocomplete"
        v-model="ruleForm.organization_name"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.id}}-{{ item.org_name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label='所属用户组' prop='group'>
      <el-autocomplete
        :debounce="500"
        :fetch-suggestions="(searchKey, cb) => queryInputList(searchKey, cb, 'group')"
        :trigger-on-focus="true"
        @select="(item) => handleSelect(item, 'group')"
        placeholder="请输入关键字查询"
        popper-class="Add-autocomplete"
        v-model="ruleForm.group_name"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.id}}-{{ item.display_name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label='内部用户名' prop='inner_user_name'>
      <el-input v-model='ruleForm.inner_user_name'/>
    </el-form-item>
    <el-form-item label='是否激活' prop='is_active'>
      <el-radio-group v-model="ruleForm.is_active">
        <el-radio :key="item.value" :label="item.value" v-for="item in is_activeList">{{item.label}}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm('ruleForm')" type='primary'>{{!isAdd?'确定保存':'确定新增'}}</el-button>
    </el-form-item>
  </el-form>
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
          user: {
            id: null, // 用户id
            user_name: '' // 用户id显示信息
          },
          organization: {
            id: null, // 所属机构id
            org_name: '', // 所属机构id显示信息
            is_active: true
          },
          group: {
            id: null, // 所属用户组id
            display_name: '', // 所属用户组id显示信息
            is_active: true
          },
          inner_user_name: '', // 内部用户名
          is_active: true // 是否激活
        }
      }
    }
  },
  data () {
    return {
      is_activeList: Constant.isNot_boolean,
      isAdd: !this.data.user.id, // 是否为新增
      ruleForm: {
        user: this.data.user.id, // 用户id
        user_name: this.data.user.user_name, // 用户id显示信息
        organization: this.data.organization.id, // 所属机构id
        organization_name: this.data.organization.org_name, // 所属机构id显示信息
        group: this.data.group.id, // 所属用户组id
        group_name: this.data.group.display_name, // 所属用户组id显示信息
        inner_user_name: this.data.inner_user_name, // 内部用户名
        is_active: this.data.is_active // 是否激活
      },
      rules: {
        user: [
          {required: true, message: '请通过查询点击选择现有用户', trigger: 'blur'},
          {
            validator: (rule, value, callback) => this.validator(rule, value, callback, 'user'),
            message: '请通过查询点击选择现有用户'
          }
        ],
        organization: [
          {required: true, message: '请通过查询点击选择现有所属机构', trigger: 'blur'},
          {
            validator: (rule, value, callback) => this.validator(rule, value, callback, 'organization'),
            message: '请通过查询点击选择现有所属机构'
          }
        ],
        group: [
          {required: true, message: '请通过查询点击选择现有用户组', trigger: 'blur'},
          {
            validator: (rule, value, callback) => this.validator(rule, value, callback, 'group'),
            message: '请通过查询点击选择现有用户组'
          }
        ],
        inner_user_name: [
          {required: true, message: '请输入内部用户名', trigger: 'blur'}
        ],
        is_active: [
          {required: true, message: '请输入联系方式', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 用户查询
    queryInputList (searchKey, cb, key) {
      // 清空key，确保key是用户点击选择的
      this.ruleForm[key] = ''
      let api = ''
      let value = ''
      switch (key) {
        case 'user':
          api = API.USER_query
          value = 'user_name'
          break
        case 'organization':
          api = API.Investment_query
          value = 'org_name'
          break
        case 'group':
          api = API.User_group_query
          value = 'display_name'
          break
      }
      let params = {search_key: searchKey, page: 1}
      Utils.getInfo(api, params, false).then(({result}) => {
        cb(result.map(item => Object.assign({value: item[value]}, item)))
      })
    },
    // 选中联系人
    handleSelect (item, key) {
      this.ruleForm[key] = String(item.id)
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
            user: this.ruleForm.user,
            organization: this.ruleForm.organization,
            group: this.ruleForm.group,
            inner_user_name: this.ruleForm.inner_user_name,
            is_active: this.ruleForm.is_active
          }
          let url = API.InvestmentUser_create
          if (!this.isAdd) {
            url = API.InvestmentUser_update(this.ruleForm.user.id)
          }
          Utils.getInfoPost(url, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: `${this.isAdd ? '新增' : '修改'}投资用户成功`
            })
            this.$emit('saved', params)
            this.$refs[formName].resetFields()
          })
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
    margin: 0 auto 0 auto;
    padding-left: 50px;
  }

  .el-form-item {
    width: 80%;
  }

  .el-autocomplete {
    width: 100%;
  }
</style>
