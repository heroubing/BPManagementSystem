<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='标题' prop='material_title'>
      <el-input v-model='ruleForm.material_title'/>
    </el-form-item>
    <el-form-item label='所需积分' prop='points'>
      <el-input v-model='ruleForm.points'/>
    </el-form-item>

    <el-form-item prop='outline_file_input' label="简介文件">
      <el-input v-model='ruleForm.outline_file_input' readonly placeholder='请上传简介文件'>
        <el-button
          v-if="!isAdd && !ruleForm.outline_file && ruleForm.outline_file_input"
          slot="prepend"
          icon="el-icon-download"
          @click="downloadFile(data.outline_file)"
        />
        <el-upload
          slot="append"
          action=""
          :on-change='onChangeOutlineFile'
          :auto-upload='false'
          :show-file-list='false'>
          <el-button slot="trigger" size='small' type='primary'>{{isAdd? '上传附件' : '重新上传'}}</el-button>
        </el-upload>
      </el-input>
    </el-form-item>
    <el-form-item prop='video_file_input' label="视频文件">
      <el-input v-model='ruleForm.video_file_input' readonly placeholder='请上传视频文件'>
        <el-button
          v-if="!isAdd && !ruleForm.video_file && ruleForm.video_file_input"
          slot="prepend"
          icon="el-icon-download"
          @click="downloadFile(data.video_file)"
        />
        <el-upload
          slot="append"
          action=""
          :on-change='onChangeVideoFile'
          :auto-upload='false'
          :show-file-list='false'>
          <el-button slot="trigger" size='small' type='primary'>{{isAdd? '上传附件' : '重新上传'}}</el-button>
        </el-upload>
      </el-input>
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
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // int 在线学习ID
          points: '', // int 在线学习视频所需积分
          material_title: '', // str 在线学习标题
          outline_file: '', // file 简介文件
          video_file: '' // file 视频文件
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        points: data.points, // int 在线学习视频所需积分
        material_title: data.material_title, // str 在线学习标题
        outline_file: null, // file 简介文件
        video_file: null, // file 视频文件
        outline_file_input: (data.outline_file && data.outline_file.indexOf('/null') < 0) ? '已上传简介文件' : '', // 文件校验占用
        video_file_input: (data.video_file && data.video_file.indexOf('/null') < 0) ? '已上传视频文件' : ''// 文件校验占用
      },
      rules: {
        material_title: [
          {required: true, message: '请输入在线学习标题', trigger: 'blur'}
        ],
        points: [
          {required: true, message: '请输入所需积分', trigger: 'blur'}
        ],
        video_file_input: [
          {required: true, message: '请上传视频文件', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 文件下载
    downloadFile (url) {
      window.open(url)
    },
    // 点击文件列表中已上传的文件时的钩子
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChangeOutlineFile (file, fileList) {
      this.ruleForm.outline_file = file.raw
      this.ruleForm.outline_file_input = file.name
      console.log('onChange', file, fileList)
    },
    onChangeVideoFile (file, fileList) {
      this.ruleForm.video_file = file.raw
      this.ruleForm.video_file_input = file.name
      console.log('onChange', file, fileList)
    },
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            points: this.ruleForm.points,
            material_title: this.ruleForm.material_title,
            outline_file: null,
            video_file: null
          }
          if (this.ruleForm.outline_file) params.outline_file = this.ruleForm.outline_file
          if (this.ruleForm.video_file) params.video_file = this.ruleForm.video_file
          let url = API.Learning_add
          let message = '录入成功'
          if (this.isAdd) {
            url = API.Learning_update(this.data.id)
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
  },
  mounted () {
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
