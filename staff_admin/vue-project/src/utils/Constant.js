export default {
  AJAX_ERROR_NO_AUTH: '您无权限登录此系统，如有问题请联系管理员',
  AJAX_ERROR_NO_AUTH_LOGIN: '您的登录信息已过期或还未登录，请重新登录',
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
  ],
  // 订阅- 产品类型
  product_type: [
    {value: 'annual', label: '拍卖年鉴'},
    {value: 'article', label: '文章报告'},
    {value: 'business_plan', label: '互联网投行'}
  ]
}
