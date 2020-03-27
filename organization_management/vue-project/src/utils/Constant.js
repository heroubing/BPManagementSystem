export default {
  AJAX_ERROR_NO_AUTH: '您的登录信息已过期或还未登录，请重新登录',
  publicPath: '/org_manage',

  METHOD_ADD: 'add', // 新增
  METHOD_EDIT: 'edit', // 修改
  METHOD_SHOW: 'show', // 展示

  // 基本类型-是否（布尔值）
  isNot_boolean: [
    {value: true, label: '是'},
    {value: false, label: '否'}
  ],
  statusList: [
    {value: '储备', label: '储备'},
    {value: '立项', label: '立项'},
    {value: '尽调', label: '尽调'},
    {value: '投决', label: '投决'},
    {value: '投中', label: '投中'},
    {value: '投后', label: '投后'},
    {value: '退出', label: '退出'}
  ]
}
