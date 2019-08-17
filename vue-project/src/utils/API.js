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
}
export default API
