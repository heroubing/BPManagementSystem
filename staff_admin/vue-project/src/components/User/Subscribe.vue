<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='支付金额' prop='pay_cny_fen'>
        <el-input v-model='ruleForm.pay_cny_fen'/>
        （单位：人民币 元，1元 = 10积分）
      </el-form-item>
      <el-form-item label='支付总额' prop='total'>
        <el-input v-model='ruleForm.total'/>
        （用户实际支付的金额（记账用），单位：人民币 元）
      </el-form-item>
      <el-form-item label='产品类型' prop='product_type'>
        <el-select placeholder="请选择" v-model="ruleForm.product_type">
          <el-option
            :key="item.value"
            v-bind="item"
            v-for="item in product_type_list">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='订阅起始时间' prop='start_time'>
        <el-date-picker
          placeholder="选择日期时间"
          type="datetime"
          v-model="ruleForm.start_time"
          value-format="yyyy-MM-ddTHH:mm:ss+0800">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='订阅截止时间' prop='end_time'>
        <el-date-picker
          placeholder="选择日期时间"
          type="datetime"
          v-model="ruleForm.end_time"
          value-format="yyyy-MM-ddTHH:mm:ss+0800">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='外部订单ID'>
        <el-input v-model='ruleForm.extern_id'/>
      </el-form-item>
      <el-form-item label='备注'>
        <el-input v-model='ruleForm.note'/>
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="submit" type='primary'>订阅</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import Utils from '@/utils/Utils'
import API from '@/utils/API'
import Constant from '@/utils/Constant'

export default {
  name: 'Subscribe',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // 用户id
          subscription: [] // 用户订阅信息
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        pay_cny_fen: 0,
        total: 0,
        extern_id: '',
        note: '',
        product_type: '',
        start_time: '',
        end_time: ''
      },
      rules: {
        pay_cny_fen: [
          {required: true, message: '请输入支付金额', trigger: 'change'},
          {
            validator (rule, value, callback) {
              let reg = /^[0-9]+(.[0-9]{1,2})?$/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error(`支付金额请输入数字，且最多保留两位小数`))
              }
            }
          }
        ],
        total: [
          {required: true, message: '请输入支付总额', trigger: 'change'},
          {
            validator (rule, value, callback) {
              let reg = /^[0-9]+(.[0-9]{1,2})?$/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error(`支付总额请输入数字，且最多保留两位小数`))
              }
            }
          }
        ],
        product_type: [{required: true, message: '请选择产品类型', trigger: 'change'}],
        start_time: [{required: true, message: '请选择订阅起始时间', trigger: 'change'}],
        end_time: [{required: true, message: '请选择截止时间', trigger: 'change'}]
      },
      product_type_list: Constant.product_type
    }
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            user_id: this.data.id, // 要订阅的用户
            pay_cny_fen: Number(this.ruleForm.pay_cny_fen) * 100, // 应支付金额
            total: Number(this.ruleForm.total) * 100, // 实际支付金额
            product_type: this.ruleForm.product_type, // 产品累着
            start_time: this.ruleForm.start_time, // 订阅起始时间
            end_time: this.ruleForm.end_time, // 订阅截止时间
            extern_id: this.ruleForm.extern_id, // 外部订单
            note: this.ruleForm.note // 备注
          }
          Utils.getInfoPost(API.USER_subscribe, params).then(({result}) => {
            let message = ''
            switch (result.status) {
              case 'SUCCESS':
                message = '订阅成功'
                this.$notify.success({title: '成功', message})
                this.$emit('saved')
                break
              case 'FAILED':
                message = '订阅失败'
                this.$notify.error({title: '失败', message})
                break
              default:
                message = `订阅失败，请联系管理员，状态：${result.status}`
                this.$notify.error({title: '失败', message})
            }
          })
        }
      })
    }
  },
  watch: {
    'ruleForm.product_type': function (value) {
      let {subscription = []} = this.data
      let info = subscription.find(item => item.product_type === value)
      if (info) {
        this.$set(this.ruleForm, 'start_time', info.end_time)
        this.$set(this.ruleForm, 'end_time', '')
      } else {
        this.$set(this.ruleForm, 'start_time', '')
        this.$set(this.ruleForm, 'end_time', '')
      }
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
  .el-form .el-date-editor.el-input{
    width: 100%;
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
