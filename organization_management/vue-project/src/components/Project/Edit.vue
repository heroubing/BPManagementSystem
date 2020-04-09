<template>
  <el-form :model='ruleForm' :rules='rules' label-width='100px' ref='ruleForm'>
    <el-form-item label='项目全名' prop='full_name'>
      <el-input :readonly="readonly" v-model='ruleForm.full_name'/>
    </el-form-item>
    <el-form-item label='项目简称' prop='short_name'>
      <el-input :readonly="readonly" v-model='ruleForm.short_name'/>
    </el-form-item>
    <el-form-item label='项目代号' prop='code'>
      <el-input :readonly="readonly" v-model='ruleForm.code'/>
    </el-form-item>
    <el-form-item label='项目状态' prop='status'>
      <el-radio-group v-model="ruleForm.status">
        <el-radio
          :disabled="readonly && ruleForm.status !==item.value"
          :key="item.value"
          :label="item.value"
          v-for="item in Constant.statusList"
        >
          {{item.label}}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <form-item-file :params="{category:'investment_management/project/brief', is_private: true}" :readonly="readonly" label="项目简介"
                    prop="brief" v-model="ruleForm.brief"/>
    <form-item-file :params="{category:'investment_management/project/bp', is_private: true}" :readonly="readonly" label="项目计划书" prop="brief" v-model="ruleForm.bp"/>
    <form-item-file :params="{category:'investment_management/project/report', is_private: true}" :readonly="readonly" label="考察报告" prop="brief" v-model="ruleForm.reports"/>
    <form-item-file :params="{category:'investment_management/project/other', is_private: true}" :readonly="readonly" label="其他资料" prop="brief" v-model="ruleForm.other_file"/>
    <el-form-item label='所属行业' prop='industry'>
      <el-input :readonly="readonly" v-model='ruleForm.industry'/>
    </el-form-item>
    <el-form-item label='联系人信息' prop='contact_info'>
      <el-input :readonly="readonly" type="textarea" v-model='ruleForm.contact_info'/>
    </el-form-item>
    <form-item-file :params="{category:'investment_management/project/contact_card', is_private: true}" :readonly="readonly" label="联系人名片" prop="brief" v-model="ruleForm.contact_card"/>
    <el-form-item label='项目优势' prop='advantage'>
      <el-input :readonly="readonly" type="textarea" v-model='ruleForm.advantage'/>
    </el-form-item>
    <el-form-item label='项目来源' prop='origin'>
      <el-input :readonly="readonly" type="textarea" v-model='ruleForm.origin'/>
    </el-form-item>
    <el-form-item style="text-align: right" v-if="!readonly">
      <el-button @click="submitForm('ruleForm')" type='primary'>
        {{!isAdd?'确定保存':'确定新增'}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Utils from '@/utils/Utils'
import API from '@/utils/API'
import Constant from '@/utils/Constant'
import FormItemFile from '@/components/Common/FormItemFile'

export default {
  name: 'Edit',
  components: {FormItemFile},
  props: {
    method: {
      type: String,
      default: Constant.METHOD_ADD
    },
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // 投资项目id
          full_name: '', // 项目全名
          short_name: '', // 项目简称
          code: '', // 项目代号
          status: '', // 项目状态
          brief: '', // 项目简介，已上传文件的id
          bp: '', // 项目计划书，已上传文件的id
          reports: '', // 项目考察报告，已上传文件的id
          other_file: '', // 项目其他资料，已上传文件的id
          industry: '', // 项目所属行业
          contact_info: '', // 项目联系人信息
          contact_card: '', // 项目联系人名片，已上传文件的id
          advantage: '', // 项目优势
          origin: ''// 项目来源
        }
      }
    }
  },
  data () {
    return {
      Constant,
      isAdd: !this.data.id, // 是否为新增
      ruleForm: {
        full_name: this.data.full_name, // 项目全名
        short_name: this.data.short_name, // 项目简称
        code: this.data.code, // 项目代号
        status: this.data.status ? this.data.status : '储备', // 项目状态
        brief: this.data.brief ? this.data.brief.split(',') : [], // 项目简介，已上传文件的id
        bp: this.data.bp ? this.data.bp.split(',') : [], // 项目计划书，已上传文件的id
        reports: this.data.reports ? this.data.reports.split(',') : [], // 项目考察报告，已上传文件的id
        other_file: this.data.other_file ? this.data.other_file.split(',') : [], // 项目其他资料，已上传文件的id
        industry: this.data.industry, // 项目所属行业
        contact_info: this.data.contact_info, // 项目联系人信息
        contact_card: this.data.contact_card ? this.data.contact_card.split(',') : [], // 项目联系人名片，已上传文件的id
        advantage: this.data.advantage, // 项目优势
        origin: this.data.origin// 项目来源
      },
      rules: {
        full_name: [{required: true, message: '请输入项目全名', trigger: 'blur'}],
        short_name: [{required: true, message: '请输入项目简称', trigger: 'blur'}],
        code: [{required: true, message: '请输入项目代号', trigger: 'blur'}],
        status: [{required: true, message: '请选择项目状态', trigger: 'blur'}],
        industry: [{required: true, message: '请输入所属行业', trigger: 'blur'}],
        contact_info: [{required: true, message: '请输入联系人信息', trigger: 'blur'}],
        advantage: [{required: true, message: '请输入项目优势', trigger: 'blur'}],
        origin: [{required: true, message: '请输入项目来源', trigger: 'blur'}]
      }
    }
  },
  methods: {
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            full_name: this.ruleForm.full_name,
            short_name: this.ruleForm.short_name,
            code: this.ruleForm.code,
            status: this.ruleForm.status,
            brief: this.ruleForm.brief.join(','),
            bp: this.ruleForm.bp.join(','),
            reports: this.ruleForm.reports.join(','),
            other_file: this.ruleForm.other_file.join(','),
            industry: this.ruleForm.industry,
            contact_info: this.ruleForm.contact_info,
            contact_card: this.ruleForm.contact_card.join(','),
            advantage: this.ruleForm.advantage,
            origin: this.ruleForm.origin
          }
          let url = API.InvestmentProject_create
          if (!this.isAdd) {
            params.id = this.ruleForm.id
            url = API.InvestmentProject_update(this.ruleForm.id)
          }
          Utils.getInfoPost(url, params).then(() => {
            this.$notify.success({
              title: '成功',
              message: `${this.isAdd ? '新增' : '修改'}项目成功`
            })
            this.$emit('saved', params)
            this.$refs[formName].resetFields()
          })
        }
      })
    }
  },
  computed: {
    readonly: function () {
      return this.method === Constant.METHOD_SHOW
    }
  }
}
</script>

<style scoped>
  .el-form {
    width: 90%;
    text-align: left;
    margin: 0 auto 0 auto;
    padding-left: 50px;
    height: 60vh;
    overflow-y: auto;
  }

  .el-form-item {
    width: 90%;
  }

  .el-autocomplete {
    width: 100%;
  }
</style>
