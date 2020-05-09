<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='用户名' prop='user_name'>
        <el-input readonly v-model='ruleForm.user_name'/>
      </el-form-item>
      <el-form-item label='邮箱' prop='email'>
        <el-input readonly v-model='ruleForm.email'/>
      </el-form-item>
      <el-form-item label='电话' prop='phone'>
        <el-input readonly v-model='ruleForm.phone'/>
      </el-form-item>
      <el-form-item label='性别' prop='sex'>
        <el-input readonly v-model='ruleForm.sex'/>
      </el-form-item>
      <el-form-item label='注册时间' prop='reg_time'>
        <el-input readonly v-model='ruleForm.reg_time'/>
      </el-form-item>
      <el-form-item label='主页' prop='homepage'>
        <el-input readonly v-model='ruleForm.homepage'/>
      </el-form-item>
      <el-form-item label='QQ号' prop='qq'>
        <el-input readonly v-model='ruleForm.qq'/>
      </el-form-item>
      <el-form-item label='积分' prop='points'>
        <el-input readonly v-model='ruleForm.points'/>
      </el-form-item>
      <el-form-item label='生日' prop='birthday'>
        <el-input readonly v-model='ruleForm.birthday'/>
      </el-form-item>
      <el-form-item label='地址' prop='address'>
        <el-input readonly v-model='ruleForm.address'/>
      </el-form-item>
      <el-form-item label-width=150px>
        <el-table :data="data.subscription">
          <el-table-column :formatter="format" label="订阅内容" prop="product_type" width="100"/>
          <el-table-column :formatter="format" label="起始时间" prop="start_time"/>
          <el-table-column :formatter="format" label="截止时间" prop="end_time"/>
        </el-table>
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="dialogVisible_charge = true" type='primary'>充值</el-button>
        <el-button @click="dialogVisible_subscribe = true" type='primary'>订阅</el-button>
      </div>
    </el-form>
    <el-dialog :visible.sync="dialogVisible_charge" append-to-body title="充值" width="60%">
      <Charge :data="data" @saved="saveSuccess"/>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_subscribe" append-to-body title="订阅" width="60%">
      <Subscribe :data="data" @saved="saveSuccess"/>
    </el-dialog>
  </div>
</template>

<script>

import Charge from '@/components/User/Charge'
import Subscribe from '@/components/User/Subscribe'
import Constant from '@/utils/Constant'

export default {
  name: 'Edit',
  components: {Subscribe, Charge},
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // 广告id
          user_name: '', // 用户名
          email: '', // 邮箱
          phone: '', // 电话
          sex: '', // 性别
          reg_time: '', // 注册时间
          homepage: '', // 主页
          qq: '', // QQ号
          points: 0, // 积分
          birthday: '', // 生日
          address: '' // 地址
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        user_name: data.user_name,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        reg_time: data.reg_time,
        homepage: data.homepage,
        qq: data.qq,
        points: data.points,
        birthday: data.birthday,
        address: data.address
      },
      rules: {},
      dialogVisible_charge: false,
      dialogVisible_subscribe: false
    }
  },
  methods: {
    format (row, column, cellValue, index) {
      switch (column.property) {
        case 'product_type':
          return Constant.product_type.find(({value}) => value === cellValue).label
        case 'start_time':
        case 'end_time':
          return cellValue.substring(0, 10) + ' ' + cellValue.substring(11, 19)
      }
      console.log(row, column, cellValue, index)
    },
    saveSuccess (key) {
      this[`dialogVisible_${key}`] = false
      this.$emit('saved')
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    height: 60vh;
    overflow-y: auto;
  }

  .el-form {
    width: 100%;
    max-width: 600px;
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

  .el-select {
    width: 100%;
  }
</style>
