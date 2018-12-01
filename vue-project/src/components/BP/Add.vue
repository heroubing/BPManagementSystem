<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='BP标题' prop='project_name'>
      <el-input v-model='ruleForm.project_name'></el-input>
    </el-form-item>
    <el-form-item label='BP录入' prop='name2'>
      <el-input v-model='ruleForm.name2'></el-input>
    </el-form-item>
    <el-form-item label='项目简介' prop='brief'>
      <el-input v-model='ruleForm.brief'></el-input>
    </el-form-item>
    <el-form-item prop='name6'>
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
      <el-input v-model='ruleForm.name6' readonly></el-input>
    </el-form-item>
    <el-form-item label='阅读积分' prop='points'>
      <el-input v-model='ruleForm.points'></el-input>
    </el-form-item>
    <el-form-item label='上传BP联系信息' prop='desc'>
      <el-input type='textarea' v-model='ruleForm.desc'></el-input>
    </el-form-item>
    <el-form-item label='阅读BP联系信息积分' prop='contact_points'>
      <el-input v-model='ruleForm.contact_points'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click="submitForm('ruleForm')">{{isAdd ? '确定新增' : '确定保存'}}</el-button>
      <el-button @click="resetForm('ruleForm')">{{isAdd ? '清空重写' : '重置'}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Utils from '../../utils/Utils'

export default {
  name: 'Add',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '',
          project_name: '',
          name2: '',
          brief: '',
          points: '500',
          contact_points: '500',
          name6: '',
          desc: ''
        }
      }
    }
  },
  data () {
    return {
      isAdd: this.data.id === '',
      ruleForm: {
        project_name: this.data.project_name,
        name2: this.data.name2,
        brief: this.data.brief,
        points: this.data.points,
        contact_points: this.data.contact_points,
        name6: this.data.name6,
        desc: this.data.desc,
        fileList: []
      },
      rules: {
        project_name: [
          {required: true, message: '请输入BP标题', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        name2: [
          {required: true, message: '请输入BP录入', trigger: 'blur'}
        ],
        brief: [
          {required: true, message: '请输入BP关键字', trigger: 'blur'}
        ],
        points: [
          {required: true, message: '请输入阅读积分', trigger: 'blur'}
        ],
        contact_points: [
          {required: true, message: '请输入阅读BP联系信息积分', trigger: 'blur'}
        ],
        name6: [
          {required: true, message: '请上传BP文件', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写上传BP联系信息', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
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

    onSubmit () {
      console.log('submit!')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            project_name: this.ruleForm.project_name,
            brief: this.ruleForm.brief,
            contact: this.ruleForm.contact,
            points: this.ruleForm.points,
            contact_points: this.ruleForm.contact_points
          }
          if (this.isAdd) {
            Utils.getInfoPost('/api/bp/add/', params, this).then(() => {
              this.$notify.success({
                title: '成功',
                message: '录入成功'
              })
            })
          } else {
            Utils.getInfoPost(`/api/bp/${this.data.id}/update/`, params, this).then(() => {
              this.$notify.success({
                title: '成功',
                message: '保存成功'
              })
              this.$emit('saved')
            })
          }
        } else {
          console.log('error submit!!')
          return false
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

  .upload {
    text-align: end;
    width: 100%;
    margin-bottom: 22px;
    display: inline;
  }
</style>
