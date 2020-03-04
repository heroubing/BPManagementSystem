<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='用户名' prop='user_name'>
        <el-input v-model='ruleForm.user_name' readonly/>
      </el-form-item>
      <el-form-item label='邮箱' prop='email'>
        <el-input v-model='ruleForm.email' readonly/>
      </el-form-item>
      <el-form-item label='电话' prop='phone'>
        <el-input v-model='ruleForm.phone' readonly/>
      </el-form-item>
      <el-form-item label='性别' prop='sex'>
        <el-input v-model='ruleForm.sex' readonly/>
      </el-form-item>
      <el-form-item label='注册时间' prop='reg_time'>
        <el-input v-model='ruleForm.reg_time' readonly/>
      </el-form-item>
      <el-form-item label='主页' prop='homepage'>
        <el-input v-model='ruleForm.homepage' readonly/>
      </el-form-item>
      <el-form-item label='QQ号' prop='qq'>
        <el-input v-model='ruleForm.qq' readonly/>
      </el-form-item>
      <el-form-item label='积分' prop='points'>
        <el-input v-model='ruleForm.points' readonly/>
      </el-form-item>
      <el-form-item label='生日' prop='birthday'>
        <el-input v-model='ruleForm.birthday' readonly/>
      </el-form-item>
      <el-form-item label='地址' prop='address'>
        <el-input v-model='ruleForm.address' readonly/>
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="openChargeDialog()" type='primary'>充值</el-button>
      </div>
    </el-form>
    <el-dialog :visible.sync="dialogVisible_charge" title="充值" width="60%" append-to-body>
      <Charge :data="dialogData" @saved="chargeSuccess"/>
    </el-dialog>
  </div>
</template>

<script>

import Charge from '@/components/User/Charge'

export default {
  name: 'Edit',
  components: {Charge},
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
      dialogData: {}
    }
  },
  methods: {
    openChargeDialog () {
      this.dialogData = this.data
      this.dialogVisible_charge = true
    },
    chargeSuccess () {
      this.dialogVisible_charge = false
      this.$emit('saved')
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
