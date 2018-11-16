<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px' class='demo-ruleForm'>
    <el-form-item label='BP标题' prop='name1'>
      <el-input v-model='ruleForm.name1'></el-input>
    </el-form-item>
    <el-form-item label='BP录入' prop='name2'>
      <el-input v-model='ruleForm.name2'></el-input>
    </el-form-item>
    <el-form-item label='BP关键字' prop='name3'>
      <el-input v-model='ruleForm.name3'></el-input>
    </el-form-item>
    <el-upload
      class='upload'
      action='https://jsonplaceholder.typicode.com/posts/'
      :on-preview='handlePreview'
      :on-remove='handleRemove'
      :before-remove='beforeRemove'
      :limit='1'
      :on-exceed='handleExceed'
      :file-list='ruleForm.fileList'>
      <el-button size='small' type='primary'>点击上传</el-button>
      <!--<div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
    <el-form-item label='阅读积分' prop='name4'>
      <el-input v-model='ruleForm.name4'></el-input>
    </el-form-item>
    <el-form-item label='上传BP联系信息' prop='desc'>
      <el-input type='textarea' v-model='ruleForm.desc'></el-input>
    </el-form-item>
    <el-form-item label='阅读BP联系信息积分' prop='name5'>
      <el-input v-model='ruleForm.name5'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click="submitForm('ruleForm')">确定新增</el-button>
      <el-button @click="resetForm('ruleForm')">清空重写</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        desc: '',
        fileList: []
      },
      rules: {
        name1: [
          {required: true, message: '请输入BP标题', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        name2: [
          {required: true, message: '请输入BP录入', trigger: 'blur'}
        ],
        name3: [
          {required: true, message: '请输入BP关键字', trigger: 'blur'}
        ],
        name4: [
          {required: true, message: '请输入阅读积分', trigger: 'blur'}
        ],
        name5: [
          {required: true, message: '请输入阅读BP联系信息积分', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请填写上传BP联系信息', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
    width: 50%;
    text-align: start;
    margin-right: 300px;
  }

  .upload {
    text-align: end;
    width: 100%;
    margin-bottom: 22px;
  }
</style>
