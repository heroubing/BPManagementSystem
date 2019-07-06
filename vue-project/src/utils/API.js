const API = {
  SYS_staffLogin: '/api/staff/login/',
  SYS_captcha: '/api/captcha/',

  USER_query: '/api/user/',
  USER_logout: '/api/user/logout/',

  BP_add: '/api/bp/create/',
  BP_query: '/api/bp/',
  BP_delete: '/api/bp/delete/',

  BP_update: (id) => `/api/bp/${id}/update/`,
  BP_fileApiView: (id) => `/api/bp/${id}/`,
  BP_detailApiView: (id) => `/api/bp/${id}/detail/`,

  BP_contact: '/api/project_contact/',
  BP_contactCreate: '/api/project_contact/create/',
  BP_projectContactDetailApiView: (id) => `/api/bp/${id}/contact`, // 通过id获取项目联系人
  BP_contactDelete: '/api/project_contact/delete/',
  BP_contactUpdate: (id) => `/api/project_contact/${id}/update`,

  BP_Industry_query: '/api/bp/industry/',
  BP_Industry_add: '/api/bp/industry/create/',
  BP_Industry_delete: '/api/bp/industry/delete/',
  BP_Industry_update: (id) => `/api/bp/industry/${id}/update/`,
  BP_Industry_detail: (id) => `/api/bp/industry/${id}/`,

  BP_Round_query: '/api/bp/round/',
  BP_Round_add: '/api/bp/round/create/',
  BP_Round_delete: '/api/bp/round/delete/',
  BP_Round_update: (id) => `/api/bp/round/${id}/update/`,
  BP_Round_detail: (id) => `/api/bp/round/${id}/`,

  Investor_query: '/api/investor/',
  Investor_review: (id) => `/api/investor/${id}/review/`,
  Investor_businessCard: (id) => `/api/investor/${id}/business_card/`,

  // 在线学习
  Learning_query: '/api/learning/',
  Learning_add: '/api/learning/create/',
  Learning_update: (id) => `/api/learning/${id}/update/`,
  Learning_delete: '/api/learning/delete/',

  // 广告
  ads_query: '/api/ads/',
  ads_create: '/api/ads/create/',
  ads_detail: (id) => `/api/ads/${id}/`,
  ads_update: (id) => `/api/ads/${id}/update/`,
  ads_delete: '/api/ads/delete/'
}
export default API
