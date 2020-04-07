<template>
  <el-form-item :label="label" :prop='prop'>
    <!--    <el-input :placeholder="readonly ? '未上传' : '请上传文件'" :value="hasFile ? '已上传，点击左侧按钮下载文件' : ''" readonly>-->
    <!--      <el-button @click="downloadFile" icon="el-icon-download" slot="prepend" v-if="hasFile"/>-->
    <el-upload
      :action="uploadApi"
      :before-remove="beforeRemove"
      :data="params"
      :disabled="readonly"
      :file-list="fileList"
      :on-error="onError"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      v-if="!readonly"
      with-credentials>
      <!--<div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>-->
      <el-button size='small' type='primary' v-if="!readonly">点击上传</el-button>
    </el-upload>
    <!--    </el-input>-->
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
        return {is_private: false}
      }
    }
  },
  data: function () {
    let fileList
    if (this.value && this.value.map) { // todo 查名字
      fileList = this.value.map(id => ({
        name: '已上传文件-' + id,
        status: 'success',
        id
      }))
    } else {
      fileList = []
    }
    return {
      // uploadApi: `${window.SERVER_URL}${API.Common.uploadFileTemp}`,
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
    onError (err, file) {
      this.$notify.error({
        title: '错误',
        message: err.message
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

</style>
