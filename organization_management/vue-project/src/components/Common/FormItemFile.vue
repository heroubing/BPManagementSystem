<template>
  <el-form-item :label="label" :prop='prop'>
    <el-upload
      :action="uploadApi"
      :before-remove="beforeRemove"
      :class="{'public-upload-show': readonly}"
      :disabled="readonly"
      :file-list="fileList"
      :http-request="httpRequest"
      :on-preview="onPreview"
      :on-remove="onRemove"
      class="public-upload"
      with-credentials
    >
      <el-button size='small' type='primary' v-if="!readonly">点击上传</el-button>
    </el-upload>
  </el-form-item>
</template>

<script>
import API from '@/utils/API'
import Utils from '@/utils/Utils'

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
      fileList = this.value.map(item => ({
        name: `${item.filename}.${item.ext}`,
        id: item.id
      }))
    } else {
      fileList = []
    }
    return {
      fileList
    }
  },
  methods: {
    getFileName () {
      Promise.all(this.fileList.map(({id}) => Utils.getInfo(API.File_detail(id)))).then(jsonList => {
        this.fileList = this.fileList.map((item, index) => Object.assign(item, {
          name: `${jsonList[index].result.filename}.${jsonList[index].result.ext}`
        }))
      })
    },
    onPreview (file) {
      window.open(API.File_download(file.id))
    },
    onRemove (file, fileList) {
      // 更新当前附件列表
      this.fileList = fileList
      // 抛出附件信息
      let attachmentList = this.value.filter(item => file.id !== item.id)
      this.$emit('input', attachmentList)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    httpRequest ({file}) {
      let {name} = file
      let ext = name.substring(name.lastIndexOf('.') + 1, name.length)
      let filename = name.substring(0, name.lastIndexOf('.')).trim()
      // eslint-disable-next-line no-useless-escape
      let re = /^[^*|\\:"<>?/\.]+$/
      if (!filename || !re.test(filename)) {
        // 上传失败  还原附件列表
        this.fileList = this.fileList.slice(0, this.fileList.length)
        this.$notify.error({
          title: '错误',
          message: '文件名不能为空，且不能包含特殊字符，请修改后再次上传'
        })
        return
      }
      let params = Object.assign({}, this.params, {filename, ext, file})
      Utils.getInfoPost(this.uploadApi, params, true, false).then((response) => {
        let {result, msg, code} = response
        if (code === 200) { // 上传成功
          // 更新当前附件列表
          file.id = result.id
          this.fileList.push(file)
          // 抛出附件信息
          this.$emit('input', [...this.value, result])
        } else { // 上传失败
          // 还原附件列表
          this.fileList = this.fileList.slice(0, this.fileList.length)
          // 提示异常
          this.$notify.error({
            title: '错误',
            message: `${msg}【错误代码：${code}】`
          })
        }
      }).catch(e => {
        // 上传失败  还原附件列表
        this.fileList = this.fileList.slice(0, this.fileList.length)
        this.$notify.error({
          title: '错误',
          message: e.message
        })
      })
    }
  },
  mounted () {
    // this.getFileName()
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
