<template>
  <el-form-item :label="label" :prop='prop'>
    <el-input :value="hasFile ? '已上传，点击左侧按钮下载文件' : ''" :placeholder="readonly ? '未上传' : '请上传文件'" readonly>
      <el-button @click="downloadFile" icon="el-icon-download" slot="prepend" v-if="hasFile"/>
      <el-upload
        v-if="!readonly"
        :auto-upload='false'
        :on-change='onChange'
        :show-file-list='false'
        action=""
        slot="append">
        <!--<div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>-->
        <el-button size='small' slot="trigger" type='primary'>{{hasFile? '重新上传' : '上传附件'}}</el-button>
      </el-upload>
    </el-input>
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
      type: [Number, null],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    downloadFile () {
      window.open(API.File_download(this.value))
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file) {
      let params = {
        file_type: file.raw.type,
        is_private: false,
        file: file.raw
      }
      Utils.getInfoPost(API.File_create, params).then(({result}) => {
        this.$emit('input', result.id)
      })
    }
  },
  computed: {
    hasFile: function () {
      return this.value || this.value === 0
    }
  }
}
</script>

<style scoped>

</style>
