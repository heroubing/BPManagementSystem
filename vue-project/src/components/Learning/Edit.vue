<template>
  <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='200px'>
    <el-form-item label='标题' prop='ol_date'>
      <el-input v-model='ruleForm.material_title'/>
    </el-form-item>
    <el-form-item label='所需积分' prop='points'>
      <el-input v-model='ruleForm.points'/>
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
          outline_file: null, // file 简介文件
          video_file: null // file 视频文件
        }
      }
    }
  },
  data () {
    return {
      isAdd: this.data.id === '', // 是否为新增
      ruleForm: {
        points: this.data.points, // int 在线学习视频所需积分
        material_title: this.data.material_title, // str 在线学习标题
        outline_file: this.data.outline_file, // file 简介文件
        video_file: this.data.material_title // file 视频文件
      },
      rules: {
        material_title: [
          {required: true, message: '请输入在线学习标题', trigger: 'blur'}
        ],
        points: [
          {required: true, message: '请输入所需积分', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 点击文件列表中已上传的文件时的钩子
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file, fileList) {
      this.ruleForm.bp_file = file.raw
      this.ruleForm.bp_file_input = file.name
      console.log('onChange', file, fileList)
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
            Utils.getInfoPost(API.Learning_add, params).then(() => {
              this.$notify.success({
                title: '成功',
                message: '录入成功'
              })
              this.resetForm('ruleForm')
            })
          } else {
            Utils.getInfoPost(API.Learning_update(this.data.id), params).then(() => {
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
