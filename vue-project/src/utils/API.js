const API = {
  SYS_staffLogin: '/api/staff/login/',
  SYS_captcha: '/api/captcha/',

  BP_add: '/api/bp/create/',
  BP_query: '/api/bp/',
  BP_delete: '/api/bp/delete/',
  BP_update: (id) => `/api/bp/${id}/update/`,
  BP_industry: '/api/bp/industry/',
  BP_round: '/api/bp/round/',
  BP_contact: '/api/project_contact/',
  BP_contactCreate: '/api/project_contact/create',

  Investor_query: '/api/investor/'
}
export default API
