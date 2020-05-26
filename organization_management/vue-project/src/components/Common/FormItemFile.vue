<template>
  <el-form-item :label="label" :prop='prop'>
    <el-upload
      :action="uploadApi"
      :before-remove="beforeRemove"
      :class="{'public-upload-show': readonly}"
      :data="params"
      :disabled="readonly"
      :file-list="fileList"
      :on-error="onError"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      class="public-upload"
      with-credentials
    >
      <el-button size='small' type='primary' v-if="!readonly">点击上传</el-button>
    </el-upload>
  </el-form-item>
</template>

<script>
import API from '@/utils/API'

export default {
  name: 'form-item-file',
  props: {
    prop: {
      type: String,
      default: 'prop'
    },
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    uploadApi: {
      type: String,
      default: API.File_create
    },
    params: {
      type: Object,
      default: function () {
        return {is_private: true}
      }
    }
  },
  data: function () {
    let fileList
    if (this.value && this.value.map) { // todo 查名字
      fileList = this.value.map(id => ({
        name: '已上传文件-' + id,
        id
      }))
    } else {
      fileList = []
    }
    return {
      fileList
    }
  },
  methods: {
    onPreview (file) {
      window.open(API.File_download(file.id))
    },
    onSuccess (response, file, fileList) {
      let {result, msg, code} = response
      if (code === 200) { // 上传成功
        // 更新当前附件列表
        file.id = result.id
        file.name = '已上传文件-' + result.id
        this.fileList = fileList
        // 抛出附件信息
        this.$emit('input', [...this.value, result.id])
      } else { // 上传失败
        // 还原附件列表
        fileList.pop()
        this.fileList = fileList
        // 提示异常
        this.$notify.error({
          title: '错误',
          message: `${msg}【错误代码：${code}】`
        })
      }
    },
    onRemove (file, fileList) {
      // 更新当前附件列表
      this.fileList = fileList
      // 抛出附件信息
      let attachmentList = this.value.filter(id => file.id !== id)
      this.$emit('input', attachmentList)
    },
    onError () {
      this.$notify.error({
        title: '错误',
        message: '文件上传失败，请重新尝试'
      })
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  computed: {
    hasFile: function () {
      return this.value || this.value === 0
    }
  },
  watch: {
    value: function (newValue) {
      if (newValue && newValue.map && newValue.length !== this.fileList.length) {
        this.fileList = this.value.map(id => ({
          name: id.name,
          status: 'success',
          id
        }))
      }
    }
  }
}
</script>

<style scoped>
  .public-upload {
    width: 50%;
    min-width: 250px;
  }
</style>
<style>
  .public-upload-show .el-upload--text,
  .public-upload-show .el-upload--picture-card {
    display: none;
  }
</style>
