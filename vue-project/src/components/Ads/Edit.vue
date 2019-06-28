<template>
  <div class="container">
    <el-form :model='ruleForm' :rules='rules' label-width='200px' ref='ruleForm'>
      <el-form-item label='广告标题' prop='ad_title'>
        <el-input v-model='ruleForm.ad_title'/>
      </el-form-item>
      <el-form-item label='投放目标' prop='target'>
        <el-checkbox-group v-model="ruleForm.target">
          <el-checkbox :key="item.value" :label="item.value" v-for="item in targetList">
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label='广告类型' prop='ad_type'>
        <el-radio-group v-model="ruleForm.ad_type">
          <el-radio :key="item.value" :label="item.value" v-for="item in ad_typeList">{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="封面图片" prop='display_image_input'>
        <el-input placeholder='请上传封面图片' readonly v-model='ruleForm.display_image_input'>
          <el-button
            @click="downloadFile(data.display_image)"
            icon="el-icon-download"
            slot="prepend"
            v-if="!isAdd && !ruleForm.display_image && ruleForm.display_image_input"
          />
          <el-upload
            :auto-upload='false'
            :on-change='onChangeDisplayImageFile'
            :show-file-list='false'
            action=""
            slot="append">
            <el-button size='small' slot="trigger" type='primary'>{{isAdd? '上传附件' : '重新上传'}}</el-button>
          </el-upload>
        </el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="show_order">
        <el-tooltip content="越大越靠前，0表示隐藏" effect="dark" placement="right">
          <el-input-number :max="100" :min="0" controls-position="right"
                           v-model="ruleForm.show_order"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="目标URL" prop="ad_link_url" v-show="isShowAdLinkUrl">
        <el-input v-model='ruleForm.ad_link_url'/>
      </el-form-item>
      <el-form-item label="图片地址" prop="imgEntriesList" v-show="isImg">
        <el-input :key="index" size="small" v-for="(item, index) in ruleForm.imgEntriesList"
                  v-model='ruleForm.imgEntriesList[index].src'>
          <el-button
            @click="ruleForm.imgEntriesList.splice(index, 1)"
            slot="append"
          >删除
          </el-button>
        </el-input>
        <el-button @click="ruleForm.imgEntriesList.push({src:''})" size="small">添加</el-button>
      </el-form-item>
      <el-form-item label="视频" prop="vidEntriesList" v-show="isVid">
        <template v-for="(item, index) in ruleForm.vidEntriesList">
          <el-input :key="index + '-src'" size="small" v-model='ruleForm.vidEntriesList[index].src'>
            <template slot="prepend">{{index + 1}}-视频地址</template>
            <el-button
              @click="ruleForm.vidEntriesList.splice(index, 1)"
              slot="append"
            >删除
            </el-button>
          </el-input>
          <el-input :key="index + '-poster'" size="small" v-model='ruleForm.vidEntriesList[index].poster'>
            <template slot="prepend">{{index + 1}}-封面地址</template>
            <el-button
              @click="ruleForm.vidEntriesList.splice(index, 1)"
              slot="append"
            >删除
            </el-button>
          </el-input>
        </template>
        <el-button @click="ruleForm.vidEntriesList.push({src:'',poster:''})" size="small">添加</el-button>
      </el-form-item>
      <div style="text-align: end;">
        <el-button @click="submitForm('ruleForm')" type='primary'>{{isAdd ? '确定新增' : '确定保存'}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{isAdd ? '清空重写' : '重置'}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Utils from '../../utils/Utils'
import API from '../../utils/API'
import Constant from '@/utils/Constant'

export default {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          id: '', // 广告id
          target: '', // 投放目标，可选 android/ios/web ，可以多选，多选时使用 , 分隔
          display_image: '', // 广告的封面图片
          ad_type: '', // 广告类型，可选 img/vid/pdf/url ，分别表示 图片/视频/PDF/链接 类型
          ad_title: '', // 广告标题
          show_order: 0, // 显示顺序，越大越靠前，0表示隐藏
          ad_link_url: '', // 链接/PDF类型广告的目标 URL
          ad_info: '' // (json) 广告信息，字符表示的 JSON 字符串
        }
      }
    }
  },
  data () {
    let data = this.data
    return {
      targetList: Constant.target,
      ad_typeList: Constant.ad_type,
      isAdd: !data.id, // 是否为新增
      ruleForm: {
        target: data.target ? data.target.join[','] : [],
        display_image: null,
        ad_type: data.ad_type,
        ad_title: data.ad_title,
        show_order: data.show_order ? data.show_order : 0,
        ad_link_url: data.ad_link_url,
        ad_info: data.ad_info,
        display_image_input: (data.display_image && data.display_image.indexOf('/null') < 0) ? '已上传封面图片' : '', // 文件校验占用
        imgEntriesList: [], // 广告类型为图片时的Entries列表
        vidEntriesList: [] // 广告类型为视频时的Entries列表
      },
      rules: {
        ad_title: [
          {required: true, message: '请输入广告标题', trigger: 'blur'}
        ],
        target: [
          {required: true, message: '请选择投放目标', trigger: 'blur'}
        ],
        ad_type: [
          {required: true, message: '请选择广告类型', trigger: 'change'}
        ],
        display_image_input: [
          {required: true, message: '请上传封面图片', trigger: 'change'}
        ],
        ad_link_url: [
          {required: true, validator: this.validatorAdLinkUrl, trigger: 'blur'}
        ],
        imgEntriesList: [
          {required: true, validator: this.validatorImgEntriesList, trigger: 'blur'}
        ],
        vidEntriesList: [
          {required: true, validator: this.validatorVidEntriesList, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 校验-ad_link_url
    validatorAdLinkUrl (rule, value, callback) {
      if (this.isShowAdLinkUrl && !value) {
        callback(new Error('请输入目标URL'))
      } else {
        callback()
      }
    },
    // 校验-imgEntriesList
    validatorImgEntriesList (rule, value, callback) {
      if (this.isImg && (value.length === 0 || value.findIndex(item => item.src.trim() === '') >= 0)) {
        callback(new Error('请至少输入一个图片地址，并删除多余的输入框'))
      } else {
        callback()
      }
    },
    // 校验-imgEntriesList
    validatorVidEntriesList (rule, value, callback) {
      if (this.isVid && (value.length === 0 || value.findIndex(item => item.src.trim() === '' || item.poster.trim() === '') >= 0)) {
        callback(new Error('请至少输入一个视频和封面地址，并删除多余的输入框'))
      } else {
        callback()
      }
    },
    // 文件下载
    downloadFile (url) {
      window.open(url)
    },
    // 点击文件列表中已上传的文件时的钩子
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChangeDisplayImageFile (file, fileList) {
      this.ruleForm.display_image = file.raw
      this.ruleForm.display_image_input = file.name
      console.log('onChange', file, fileList)
    },
    // 表单提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let adInfo = ''
          if (this.isImg) {
            adInfo = JSON.stringify({Entries: this.ruleForm.imgEntriesList})
          }
          if (this.isVid) {
            adInfo = JSON.stringify({Entries: this.ruleForm.vidEntriesList})
          }
          let params = {
            target: this.ruleForm.target.join(','),
            display_image: this.ruleForm.display_image,
            ad_type: this.ruleForm.ad_type,
            ad_title: this.ruleForm.ad_title,
            show_order: this.ruleForm.show_order,
            ad_link_url: this.isShowAdLinkUrl ? this.ruleForm.ad_link_url : '',
            ad_info: adInfo
          }
          let url = API.ads_create
          let message = '录入成功'
          if (!this.isAdd) {
            url = API.ads_update(this.data.id)
            message = '保存成功'
            // 非新增时若用户不更改文件则不进行文件提交 todo
            if (this.ruleForm.display_image_input === '已上传封面图片') delete params.display_image
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
      this.ruleForm = Object.assign({}, this.ruleForm, {display_image: null})
    }
  },
  computed: {
    isShowAdLinkUrl: function () {
      return this.ruleForm.ad_type === 'pdf' || this.ruleForm.ad_type === 'url'
    },
    isImg: function () {
      return this.ruleForm.ad_type === 'img'
    },
    isVid: function () {
      return this.ruleForm.ad_type === 'vid'
    }
  },
  mounted () {
    if (!this.isAdd) {
      Utils.getInfo(API.ads_detail(this.data.id)).then(({result}) => {
        if (result.ad_info) {
          if (this.isImg) {
            this.ruleForm.imgEntriesList = JSON.parse(result.ad_info).Entries
          }
          if (this.isVid) {
            this.ruleForm.vidEntriesList = JSON.parse(result.ad_info).Entries
          }
        }
        this.ruleForm.target = result.target.split(',')
        this.ruleForm.show_order = Number(result.show_order)
      })
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  .el-form {
    width: 100%;
    max-width: 600px;
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

  .el-select {
    width: 100%;
  }
</style>
