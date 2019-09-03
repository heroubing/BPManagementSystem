const API = {
  SYS_staffLogin: '/api/staff/login/',
  SYS_captcha: '/api/captcha/',

  USER_query: '/api/user/',
  USER_logout: '/api/user/logout/',

  // 投资机构
  Investment_query: '/api/investment/organization/',
  Investment_create: '/api/investment/organization/create/',
  Investment_detail: (id) => `/api/investment/organization/${id}/`,
  Investment_update: (id) => `/api/investment/organization/${id}/update/`,
  Investment_delete: '/api/investment/organization/delete/',
  // 投资机构
  User_group_query: '/api/investment/user_group/',
  User_group_create: '/api/investment/user_group/create/',
  User_group_detail: (id) => `/api/investment/user_group/${id}/`,
  User_group_update: (id) => `/api/investment/user_group/${id}/update/`,
  User_group_delete: '/api/investment/user_group/delete/'
}
export default API
