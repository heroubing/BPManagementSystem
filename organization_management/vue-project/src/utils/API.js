const API = {
  SYS_staffLogin: '/api/staff/login/',
  SYS_userLogin: '/api/user/login/',
  SYS_captcha: '/api/captcha/',

  USER_query: '/api/user/',
  USER_search: '/api/user/search/',
  USER_logout: '/api/user/logout/',

  // 附件
  File_create: '/api/file/create/',
  File_download: (id) => `/api/file/${id}/`,

  // 投资机构
  Investment_query: '/api/investment/organization/',

  // 投资用户组
  User_group_query: '/api/investment/user_group/',
  User_group_create: '/api/investment/user_group/create/',
  User_group_detail: (id) => `/api/investment/user_group/${id}/`,
  User_group_update: (id) => `/api/investment/user_group/${id}/update/`,
  User_group_delete: '/api/investment/user_group/delete/',

  // 投资用户组
  InvestmentUser_query: '/api/investment/user/',
  InvestmentUser_create: '/api/investment/user/create/',
  InvestmentUser_detail: (id) => `/api/investment/user/${id}/`,
  InvestmentUser_update: (id) => `/api/investment/user/${id}/update/`,
  InvestmentUser_delete: '/api/investment/user/delete/',

  // 投资项目
  InvestmentProject_query: '/api/investment/project/',
  InvestmentProject_create: '/api/investment/project/create/',
  InvestmentProject_detail: (id) => `/api/investment/project/${id}/`,
  InvestmentProject_update: (id) => `/api/investment/project/${id}/update/`,
  InvestmentProject_delete: '/api/investment/project/delete/'
}
export default API
