<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='项目名称' prop='project_name'>
      <el-input v-model='ruleForm.project_name'/>
    </el-form-item>
    <el-form-item label='项目简介' prop='brief'>
      <el-input v-model='ruleForm.brief'/>
    </el-form-item>
    <el-form-item label='联系人ID' prop='contact'>
      <el-autocomplete
        popper-class="Add-autocomplete"
        v-model="ruleForm.contact"
        :fetch-suggestions="queryContactList"
        placeholder="请输入联系人ID查询"
        @select="handleSelect"
        :debounce="1000"
      >
        <i class="el-icon-search el-input__icon" slot="suffix"></i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.user_id}}-{{ item.user.user_name }}-{{ item.user.phone }}</div>
          <div class="addr">{{ item.organization }} {{ item.user.email }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label='阅读商业计划书积分' prop='points'>
      <el-input v-model='ruleForm.points'/>
    </el-form-item>
    <el-form-item label='阅读联系信息积分' prop='contact_points'>
      <el-input v-model='ruleForm.contact_points'/>
    </el-form-item>
    <el-form-item label='行业' prop='industries'>
      <el-checkbox-group v-model="ruleForm.industries">
        <el-checkbox v-for="item in industriesList" :key="item.id" :label="item.id" name="industries">
          {{item.display_name}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label='投资阶段' prop='round_id'>
      <el-radio-group v-model="ruleForm.round_id">
        <el-radio v-for="item in roundList" :key="item.id" :label="item.id">{{item.display_name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop='bp_file_input'>
      <el-upload
        slot='label'
        class='upload'
        action='https://jsonplaceholder.typicode.com/posts/'
        :on-preview='onPreview'
        :on-remove='onRemove'
        :on-success='onSuccess'
        :on-error='onError'
        :on-progress='onProgress'
        :on-change='onChange'
        :before-upload='beforeUpload'
        :before-remove='beforeRemove'
        :on-exceed='onExceed'
        :limit='2'
        :auto-upload='false'
        :show-file-list='false'>
        <el-button size='small' type='primary'>点击上传</el-button>
        <!--<div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <el-input v-model='ruleForm.name6' readonly/>
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
  name: 'Add',
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
      industriesList: [], // 行业列表
      roundList: [], // 投资阶段列表
      isAdd: this.data.id === '', // 是否为新增
      ruleForm: {
        id: this.data.id,
        project_name: this.data.project_name, // 项目名称
        brief: this.data.brief, // 项目简介
        contact: this.data.contact, // 联系人ID
        points: this.data.points, // 阅读商业计划书积分，默认500
        contact_points: this.data.contact_points, // 阅读联系信息积分，默认500
        industries: this.data.industries, // 行业，逗号分隔，每一个元素是一个行业ID
        round_id: this.data.round_id, // 投资阶段ID
        bp_file_input: this.data.bp_file_input, // 文件校验占用
        fileList: []
      },
      rules: {
        project_name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
          {min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        brief: [
          {required: true, message: '请输入项目简介', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        points: [
          {required: true, message: '请输入阅读商业计划书积分', trigger: 'blur'}
        ],
        contact_points: [
          {required: true, message: '请输入阅读联系信息积分', trigger: 'blur'}
        ],
        industries: [
          {required: true, message: '请输入行业', trigger: 'change'}
        ],
        round_id: [
          {required: true, message: '请输入投资阶段ID', trigger: 'change'}
        ],
        bp_file_input: [
          {required: true, message: '请上传BP文件', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 联系人查询
    queryContactList (searchKey, cb) {
      let params = {search_key: searchKey}
      Utils.getInfo(API.BP_contact, params, this, false).then(({result}) => {
        cb(result.map(item => Object.assign({value: item.user.user_name}, item)))
      })
    },
    handleSelect (item) {
      console.log(item)
    },
    // 点击文件列表中已上传的文件时的钩子
    onPreview (file) {
      console.log('onPreview', file)
    },
    // 文件列表移除文件时的钩子
    onRemove (file, fileList) {
      console.log('onRemove', file, fileList)
    },
    // 文件上传成功时的钩子
    onSuccess (response, file, fileList) {
      console.log('onSuccess', response, file, fileList)
    },
    // 文件上传失败时的钩子
    onError (err, file, fileList) {
      console.log('onError', err, file, fileList)
    },
    // 文件上传时的钩子
    onProgress (event, file, fileList) {
      console.log('onProgress', event, file, fileList)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file, fileList) {
      this.ruleForm.fileList = []
      this.ruleForm.fileList.push(file)
      this.ruleForm.name6 = file.name
      console.log('onChange', file, fileList)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload (file) {
      console.log('beforeUpload', file)
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeRemove (file, fileList) {
      console.log('beforeRemove', file, fileList)
    },
    // 文件超出个数限制时的钩子
    onExceed (files, fileList) {
      console.log('onExceed', files, fileList)
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
            Utils.getInfoPost(API.BP_add, params, this).then(() => {
              this.$notify.success({
                title: '成功',
                message: '录入成功'
              })
            })
          } else {
            Utils.getInfoPost(API.BP_update(this.data.id), params, this).then(() => {
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
  },
  mounted () {
    // 获取行业列表
    Utils.getAllPageList(API.BP_industry, [], 1).then((result) => {
      this.industriesList = result
    })
    // 获取投资阶段列表
    Utils.getAllPageList(API.BP_round, [], 1).then((result) => {
      this.roundList = result
    })
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
