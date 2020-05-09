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
      <el-form-item label='外部订单ID'>
        <el-input v-model='ruleForm.extern_id'/>
      </el-form-item>
      <el-form-item label='备注'>
        <el-input v-model='ruleForm.note'/>
      </el-form-item>
      <el-form-item label=''>
        由于充值时用户可能有购买或其充值操作，该结果仅供参考
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="submit" type='primary'>充值</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import Utils from '@/utils/Utils'
import API from '@/utils/API'

export default {
  name: 'Charge',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '' // 用户id
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
        note: ''
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
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            user_id: this.data.id,
            pay_cny_fen: Number(this.ruleForm.pay_cny_fen) * 100,
            total: Number(this.ruleForm.total) * 100,
            extern_id: this.ruleForm.extern_id,
            note: this.ruleForm.note
          }
          Utils.getInfoPost(API.USER_charge, params).then(({result}) => {
            let message = ''
            switch (result.status) {
              case 'SUCCESS':
                message = '充值成功'
                this.$notify.success({title: '成功', message})
                break
              case 'FAILED':
                message = '充值失败'
                this.$notify.error({title: '失败', message})
                return
              case 'generate_order':
                message = '生成订单中，请稍后再次查询'
                this.$notify.info({title: '正在充值', message})
                break
              case 'handel_result':
                message = '正在处理结果中，请稍后再次查询'
                this.$notify.info({title: '正在充值', message})
                break
            }
            this.$emit('saved', 'charge')
          })
        }
      })
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
