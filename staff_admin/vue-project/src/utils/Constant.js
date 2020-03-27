export default {
  AJAX_ERROR_NO_AUTH: '您的登录信息已过期或还未登录，请重新登录',
  publicPath: '/staff_admin_0',
  // 广告-广告类型
  ad_type: [
    {value: 'img', label: '图片'},
    {value: 'vid', label: '视频'},
    {value: 'pdf', label: 'PDF'},
    {value: 'url', label: '链接'}
  ],
  // 广告-投放目标
  target: [
    {value: 'android', label: 'android'},
    {value: 'ios', label: 'ios'},
    {value: 'web', label: 'web'}
  ],
  // 基本类型-是否（布尔值）
  isNot_boolean: [
    {value: true, label: '是'},
    {value: false, label: '否'}
  ]
}
