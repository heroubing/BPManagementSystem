import API from './API'
import Utils from './Utils'

const MockData = function (url, params, isShowLoading) {
  return new Promise((resolve, reject) => {
    let mockData
    switch (url) {
      case API.SYS_captcha:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'captcha_image': 'data:image/png;base64,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',
            'captcha_key': '1234567890'
          },
          'info': null
        }
        break
      case API.SYS_staffLogin:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'user_name': 'staff10',
            'email': null,
            'phone': null,
            'sex': '',
            'reg_time': '2018-06-27T00:12:00+0800',
            'homepage': '',
            'qq': '',
            'points': 100,
            'user_avatar': '',
            'birthday': null,
            'address': '',
            'is_staff': true
          },
          'info': null
        }
        break
      case API.USER_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': '3',
              'user_name': 'user3',
              'email': 'user3@example.com',
              'phone': '13218105046',
              'sex': '',
              'reg_time': '2018-11-18T10:50:46+0800',
              'homepage': '',
              'qq': '',
              'points': 200,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'id': '2',
              'user_name': 'user2',
              'email': 'user2@example.com',
              'phone': '13218105000',
              'sex': '',
              'reg_time': '2018-11-18T10:50:00+0800',
              'homepage': '',
              'qq': '',
              'points': 400,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'user_name': 'user1',
              'email': 'user1@example.com',
              'phone': '13218105000',
              'sex': '',
              'reg_time': '2018-11-18T10:50:00+0800',
              'homepage': '',
              'qq': '',
              'points': 300,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'id': '1',
              'user_name': 'sun',
              'email': 'sun@example.com',
              'phone': '13217223453',
              'sex': '',
              'reg_time': '2018-11-17T22:34:53+0800',
              'homepage': '',
              'qq': '',
              'points': 30,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': {
                'organization': '',
                'reg_time': '2018-11-17T22:35:15+0800',
                'org_email': '',
                'fav_industries': '',
                'fav_round': '',
                'is_reviewed': true,
                'user_id': 2
              }
            },
            {
              'id': '4',
              'user_name': 'DefineFC',
              'email': 'DefineFC@example.com',
              'phone': '13216214902',
              'sex': '',
              'reg_time': '2018-11-16T21:49:02+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': {
                'organization': '',
                'reg_time': '2018-11-17T12:42:48+0800',
                'org_email': '',
                'fav_industries': '',
                'fav_round': '',
                'is_reviewed': true,
                'user_id': 1
              }
            }
          ],
          'info': {
            'pagination': {
              'count': 5,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.USER_search:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 2,
              'user_name': 'sun',
              'user_avatar': ''
            }
          ],
          'info': {
            'pagination': {
              'count': 1,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.USER_logout:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': true
        }
        break
      case API.BP_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 2,
              'project_name': '测试2',
              'brief': '',
              'upload_time': '2018-10-06T19:47:53+0800',
              'update_time': '2018-10-06T19:47:53+0800',
              'industries': '1,4',
              'round_id': 1,
              'round': 'pre-A',
              'bp_file': 'https://www.investdata.com.cn/api/bp/2/file/',
              'points': 10,
              'permission': false,
              'permission_contact': false,
              'contact_points': 2,
              'view_count': 9
            },
            {
              'id': 1,
              'project_name': '测试',
              'brief': '简介信息',
              'upload_time': '2018-10-06T19:47:53+0800',
              'update_time': '2018-10-06T19:47:53+0800',
              'industries': '41,39,38',
              'round_id': 11,
              'round': 'pre-A',
              'bp_file': 'https://www.investdata.com.cn/api/bp/1/file/',
              'points': 10,
              'permission': false,
              'permission_contact': false,
              'contact_points': 2,
              'view_count': 9
            }
          ],
          'info': {
            'pagination': {
              'count': 2,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.BP_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 6,
            'project_name': '1118',
            'brief': '',
            'upload_time': '2018-11-21T21:47:53+0800',
            'update_time': '2018-11-21T21:47:53+0800',
            'industries': '',
            'round_id': null,
            'round': null,
            'points': 500,
            'contact_points': 500,
            'view_count': 0
          },
          'info': null
        }
        break
      case API.BP_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_contact:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'user_id': 1,
              'organization': '美团',
              'contact_info': 'contact_info',
              'reg_time': '2018-11-23T15:18:51+0800',
              'business_plans': [1, 2],
              'is_reviewed': true,
              'user': {
                'user_name': '陈开心',
                'email': 'chenkaixin.meituan.com',
                'phone': '13327772991',
                'sex': '',
                'reg_time': '2018-06-27T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 100,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            },
            {
              'user_id': 2,
              'organization': '新东方',
              'contact_info': 'contact_info',
              'reg_time': '2018-11-23T15:38:51+0800',
              'is_reviewed': true,
              'business_plans': [],
              'user': {
                'user_name': '俞敏洪',
                'email': 'yuminhong@xindongfang.com',
                'phone': '13245678888',
                'sex': '',
                'reg_time': '2018-06-27T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 100,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            }
          ],
          'info': {
            'pagination': {
              'count': 2,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.BP_contactCreate:
        mockData = {
          'code': 200,
          'msg': 'OK'
        }
        break
      case API.BP_projectContactDetailApiView(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'organization': 'b',
            'contact_info': '',
            'user_id': 1,
            'reg_time': '2018-11-16T21:57:05+0800',
            'is_reviewed': true,
            'user': {
              'user_name': 'staff10',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-06-27T00:12:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          },
          'info': null
        }
        break
      case API.BP_Industry_query:
        if (params.page === 1) {
          mockData = {
            'code': 200,
            'msg': 'OK',
            'result': [{'id': 43, 'display_name': '其他'}, {'id': 42, 'display_name': '医疗健康'}, {
              'id': 41,
              'display_name': '汽车交通'
            }, {'id': 40, 'display_name': '电子商务'}, {'id': 39, 'display_name': '体育'}, {
              'id': 38,
              'display_name': '物流'
            }, {'id': 37, 'display_name': '影视'}, {'id': 36, 'display_name': '文化'}, {
              'id': 35,
              'display_name': '地产'
            }, {'id': 34, 'display_name': '金融'}, {'id': 33, 'display_name': '旅游'}, {
              'id': 32,
              'display_name': '制造业'
            }, {'id': 31, 'display_name': 'TMT'}, {'id': 30, 'display_name': '农业'}],
            'info': {'pagination': {'count': 14, 'num_pages': 1, 'per_page': 50}}
          }
        }
        break
      case API.BP_Industry_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '阶段1'
          },
          'info': null
        }
        break
      case API.BP_Industry_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_Industry_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '阶段2'
          },
          'info': null
        }
        break
      case API.BP_Industry_detail(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': 'Pre-A'
          },
          'info': null
        }
        break
      case API.BP_Round_query:
        if (params.page === 1) {
          mockData = {
            'code': 200,
            'msg': 'OK',
            'result': [{'id': 15, 'display_name': 'PRO-IPO'}, {'id': 14, 'display_name': 'E轮'}, {
              'id': 13,
              'display_name': 'D轮'
            }, {'id': 12, 'display_name': 'C轮'}, {'id': 11, 'display_name': 'B轮'}, {
              'id': 10,
              'display_name': 'A轮'
            }, {'id': 9, 'display_name': '天使轮'}],
            'info': {'pagination': {'count': 7, 'num_pages': 1, 'per_page': 50}}
          }
        }
        break
      case API.BP_Round_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业1'
          },
          'info': null
        }
        break
      case API.BP_Round_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_Round_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业2'
          },
          'info': null
        }
        break
      case API.BP_Round_detail(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业1'
          },
          'info': null
        }
        break
      case API.Investor_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [{
            'organization': '中投长富投资基金管理（北京）有限公司',
            'reg_time': '2019-05-24T08:07:48+0800',
            'org_email': 'xuejie0924@163.com',
            'fav_industries': '38,32,43,37,35,39,40,36,30,31,34,42,33,41',
            'fav_round': '10,14,11,9,12,15,13',
            'is_reviewed': false,
            'review_status': 'WAITING',
            'review_update_time': null,
            'reviewer_note': '',
            'user_id': 6846,
            'business_card': null,
            'user': {
              'user_name': 'lazeman',
              'email': 'lazeman@qq.com',
              'phone': '18610045286',
              'sex': '',
              'reg_time': '2019-05-24T08:03:34+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '上海歆义龙文化传播有限公司',
            'reg_time': '2019-05-20T14:11:54+0800',
            'org_email': '414147082@qq.com',
            'fav_industries': '32',
            'fav_round': '',
            'is_reviewed': false,
            'review_status': 'WAITING',
            'review_update_time': null,
            'reviewer_note': '',
            'user_id': 6836,
            'business_card': 'https://www.investdata.com.cn/api/investor/6836/business_card/',
            'user': {
              'user_name': '丹尼公园',
              'email': '414147082@qq.com',
              'phone': '13774494907',
              'sex': '',
              'reg_time': '2019-05-20T14:11:54+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '浙江台州湾产业投资有限公司',
            'reg_time': '2019-05-13T21:15:00+0800',
            'org_email': '1274457665@qq.com',
            'fav_industries': '38,32,35,36,30,31,34,42,33,41',
            'fav_round': '15,12,14,13',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:15:26+0800',
            'reviewer_note': '',
            'user_id': 6810,
            'business_card': 'https://www.investdata.com.cn/api/investor/6810/business_card/',
            'user': {
              'user_name': '张华培',
              'email': '1274457665@qq.com',
              'phone': '13819683000',
              'sex': '',
              'reg_time': '2019-05-13T21:08:28+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': '1974-08-31',
              'address': ''
            }
          }, {
            'organization': '业晟网络',
            'reg_time': '2019-05-13T21:08:08+0800',
            'org_email': 'yyykkk823@126.com',
            'fav_industries': '37,36',
            'fav_round': '9',
            'is_reviewed': false,
            'review_status': 'REJECT',
            'review_update_time': '2019-05-23T20:13:25+0800',
            'reviewer_note': '请上传您的商务名片',
            'user_id': 6809,
            'business_card': 'https://www.investdata.com.cn/api/investor/6809/business_card/',
            'user': {
              'user_name': 'yyykkk823',
              'email': 'yyykkk823@126.com',
              'phone': '13510996730',
              'sex': '',
              'reg_time': '2019-05-13T21:08:08+0800',
              'homepage': '',
              'qq': '',
              'points': 99,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': 'star-net',
            'reg_time': '2019-05-13T13:42:42+0800',
            'org_email': 'jameszhang18@qq.com',
            'fav_industries': '',
            'fav_round': '',
            'is_reviewed': false,
            'review_status': 'REJECT',
            'review_update_time': '2019-05-23T20:13:04+0800',
            'reviewer_note': '请上传您的商务名片',
            'user_id': 6806,
            'business_card': 'https://www.investdata.com.cn/api/investor/6806/business_card/',
            'user': {
              'user_name': 'jameszhang18',
              'email': 'jameszhang18@qq.com',
              'phone': '13809506880',
              'sex': '',
              'reg_time': '2019-05-13T13:42:42+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '西安正大鑫实业有限公司',
            'reg_time': '2019-05-12T17:07:54+0800',
            'org_email': '596216579@qq.com',
            'fav_industries': '37,33,43,36',
            'fav_round': '9',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:11:36+0800',
            'reviewer_note': '',
            'user_id': 6803,
            'business_card': 'https://www.investdata.com.cn/api/investor/6803/business_card/',
            'user': {
              'user_name': '江志飞',
              'email': '596216579@qq.com',
              'phone': '13227042561',
              'sex': '',
              'reg_time': '2019-05-12T17:04:33+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '国圣投资',
            'reg_time': '2019-05-12T16:23:11+0800',
            'org_email': 'songc@goldensum.cn',
            'fav_industries': '42,43,31,41',
            'fav_round': '11,12,13',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:11:26+0800',
            'reviewer_note': '',
            'user_id': 6802,
            'business_card': 'https://www.investdata.com.cn/api/investor/6802/business_card/',
            'user': {
              'user_name': 'vincentsc',
              'email': 'songc@goldensum.cn',
              'phone': '15618453900',
              'sex': '',
              'reg_time': '2019-05-12T16:23:11+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '朗荣投资',
            'reg_time': '2019-05-10T20:02:46+0800',
            'org_email': '13761910016@163.com',
            'fav_industries': '38,32,43,37,39,40,36,30,31,42,33,41',
            'fav_round': '10,11,9',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:11:17+0800',
            'reviewer_note': '',
            'user_id': 6796,
            'business_card': 'https://www.investdata.com.cn/api/investor/6796/business_card/',
            'user': {
              'user_name': '投资机构',
              'email': '13761910016@163.com',
              'phone': '13761910016',
              'sex': '',
              'reg_time': '2019-05-10T20:02:46+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '广深联合控股',
            'reg_time': '2019-05-10T09:11:23+0800',
            'org_email': 'yuanw@gsunion.com',
            'fav_industries': '32,35,31,34,42',
            'fav_round': '10,14,11,9,12,15,13',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:11:10+0800',
            'reviewer_note': '',
            'user_id': 6791,
            'business_card': 'https://www.investdata.com.cn/api/investor/6791/business_card/',
            'user': {
              'user_name': '袁兴玮',
              'email': '562126868@qq.com',
              'phone': '13902306435',
              'sex': '',
              'reg_time': '2019-05-10T09:05:57+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': '1972-12-23',
              'address': ''
            }
          }, {
            'organization': '深圳市鹏安工艺品集成科技有限公司',
            'reg_time': '2019-05-03T01:01:58+0800',
            'org_email': '578386860@qq.com',
            'fav_industries': '38,37,30,36,42',
            'fav_round': '10,11,12,13',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:11:03+0800',
            'reviewer_note': '',
            'user_id': 6743,
            'business_card': 'https://www.investdata.com.cn/api/investor/6743/business_card/',
            'user': {
              'user_name': '孙公斌',
              'email': '578386860@qq.com',
              'phone': '13838816866',
              'sex': '',
              'reg_time': '2019-05-03T01:01:58+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '建行重庆两江分行',
            'reg_time': '2019-05-02T22:28:56+0800',
            'org_email': '243785060@qq.com',
            'fav_industries': '38,32,39,40,36,30,42,41',
            'fav_round': '',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:10:55+0800',
            'reviewer_note': '',
            'user_id': 6742,
            'business_card': 'https://www.investdata.com.cn/api/investor/6742/business_card/',
            'user': {
              'user_name': 'htieo',
              'email': '243785060@qq.com',
              'phone': '18580244386',
              'sex': '',
              'reg_time': '2019-05-02T22:28:56+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '安粮',
            'reg_time': '2019-04-27T21:57:17+0800',
            'org_email': '930326082@qq.com',
            'fav_industries': '34',
            'fav_round': '',
            'is_reviewed': false,
            'review_status': 'REJECT',
            'review_update_time': '2019-05-23T20:13:59+0800',
            'reviewer_note': '请上传您的商务名片',
            'user_id': 6725,
            'business_card': 'https://www.investdata.com.cn/api/investor/6725/business_card/',
            'user': {
              'user_name': '壹陆捌',
              'email': '930326082@qq.com',
              'phone': '13365684925',
              'sex': '',
              'reg_time': '2019-04-27T21:57:17+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '上海华鹿兄弟投资管理有限公司',
            'reg_time': '2019-04-22T19:56:23+0800',
            'org_email': 'tom@xiongdifund.com',
            'fav_industries': '43',
            'fav_round': '9',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:10:48+0800',
            'reviewer_note': '',
            'user_id': 6696,
            'business_card': 'https://www.investdata.com.cn/api/investor/6696/business_card/',
            'user': {
              'user_name': 'Tom',
              'email': 'tom@xiongdifund.com',
              'phone': '18516558681',
              'sex': '',
              'reg_time': '2019-04-22T19:56:23+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '普华资本',
            'reg_time': '2019-04-12T22:02:41+0800',
            'org_email': 'baixue@datoucapital.com',
            'fav_industries': '',
            'fav_round': '',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:10:41+0800',
            'reviewer_note': '',
            'user_id': 6635,
            'business_card': 'https://www.investdata.com.cn/api/investor/6635/business_card/',
            'user': {
              'user_name': '白雪',
              'email': 'baixue@datoucapital.com',
              'phone': '13120617797',
              'sex': '',
              'reg_time': '2019-04-12T22:02:41+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '无',
            'reg_time': '2019-04-12T09:18:53+0800',
            'org_email': '174736316@qq.com',
            'fav_industries': '',
            'fav_round': '',
            'is_reviewed': false,
            'review_status': 'REJECT',
            'review_update_time': '2019-05-23T20:12:26+0800',
            'reviewer_note': '请上传您的商务名片',
            'user_id': 6634,
            'business_card': 'https://www.investdata.com.cn/api/investor/6634/business_card/',
            'user': {
              'user_name': '13636318872',
              'email': '174736316@qq.com',
              'phone': '13636318872',
              'sex': '',
              'reg_time': '2019-04-12T09:18:53+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': '测试',
            'reg_time': '2019-03-30T13:04:18+0800',
            'org_email': 'fzehyy@qq.com',
            'fav_industries': '36,30,41',
            'fav_round': '13',
            'is_reviewed': false,
            'review_status': 'WAITING',
            'review_update_time': null,
            'reviewer_note': '',
            'user_id': 6584,
            'business_card': 'https://www.investdata.com.cn/api/investor/6584/business_card/',
            'user': {
              'user_name': 'Test010',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2019-03-30T13:04:18+0800',
              'homepage': '',
              'qq': '',
              'points': 1850,
              'user_avatar': '',
              'birthday': '1999-09-08',
              'address': ''
            }
          }, {
            'organization': 'niubility',
            'reg_time': '2019-04-09T21:57:57+0800',
            'org_email': 'a804194423@163.com',
            'fav_industries': '39,42,40,34',
            'fav_round': '10',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:09:59+0800',
            'reviewer_note': '测试',
            'user_id': 6486,
            'business_card': 'https://www.investdata.com.cn/api/investor/6486/business_card/',
            'user': {
              'user_name': '蓝胖',
              'email': '804194423@qq.com',
              'phone': '15620522945',
              'sex': '',
              'reg_time': '2019-03-10T23:55:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': '1992-12-25',
              'address': ''
            }
          }, {
            'organization': 'investdata',
            'reg_time': '2019-04-18T22:10:44+0800',
            'org_email': '12345678@qq.com',
            'fav_industries': '',
            'fav_round': '',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:09:52+0800',
            'reviewer_note': '',
            'user_id': 6108,
            'business_card': 'https://www.investdata.com.cn/api/investor/6108/business_card/',
            'user': {
              'user_name': 'investdata31',
              'email': '12345678@qq.com',
              'phone': null,
              'sex': '',
              'reg_time': '2018-12-14T22:38:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100085,
              'user_avatar': '',
              'birthday': '1992-03-04',
              'address': ''
            }
          }, {
            'organization': '合力投资',
            'reg_time': '2019-05-07T19:13:53+0800',
            'org_email': 'joepeng@empowerinvestment.com',
            'fav_industries': '38,40,31,42,41',
            'fav_round': '10,9',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:10:28+0800',
            'reviewer_note': '',
            'user_id': 5849,
            'business_card': 'https://www.investdata.com.cn/api/investor/5849/business_card/',
            'user': {
              'user_name': 'jhpeng',
              'email': 'joepeng@yeah.net',
              'phone': '13730836007',
              'sex': '',
              'reg_time': '2018-10-13T14:08:45+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          }, {
            'organization': 'invest',
            'reg_time': '2019-04-09T13:07:45+0800',
            'org_email': '13916389845@163.com',
            'fav_industries': '38,32,43,37,35,39,40,36,30,31,34,42,33,41',
            'fav_round': '10,11,9,15',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:09:48+0800',
            'reviewer_note': '',
            'user_id': 4510,
            'business_card': 'https://www.investdata.com.cn/api/investor/4510/business_card/',
            'user': {
              'user_name': 'liciaolan',
              'email': '13916389845@1163.com',
              'phone': '13916389845',
              'sex': '',
              'reg_time': '2018-02-21T04:34:00+0800',
              'homepage': '',
              'qq': '',
              'points': 16,
              'user_avatar': '',
              'birthday': '1991-01-01',
              'address': ''
            }
          }, {
            'organization': 'Tianjin University',
            'reg_time': '2019-04-02T22:48:11+0800',
            'org_email': 'qq@tju.edu.cn',
            'fav_industries': '31',
            'fav_round': '',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:09:46+0800',
            'reviewer_note': '',
            'user_id': 485,
            'business_card': 'https://www.investdata.com.cn/api/investor/485/business_card/',
            'user': {
              'user_name': 'DefineFC',
              'email': '554895611@qq.com',
              'phone': null,
              'sex': '男',
              'reg_time': '2015-04-25T05:04:17+0800',
              'homepage': '',
              'qq': '',
              'points': 97785,
              'user_avatar': 'http://www.d-long.cn/img/face/15.gif',
              'birthday': '1982-06-16',
              'address': ''
            }
          }, {
            'organization': '投资部',
            'reg_time': '2019-04-17T11:21:31+0800',
            'org_email': '18365939266@163.com',
            'fav_industries': '',
            'fav_round': '',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:10:19+0800',
            'reviewer_note': '',
            'user_id': 467,
            'business_card': 'https://www.investdata.com.cn/api/investor/467/business_card/',
            'user': {
              'user_name': '刘东建',
              'email': '864371476@qq.com',
              'phone': null,
              'sex': '男',
              'reg_time': '2015-04-09T06:14:34+0800',
              'homepage': '',
              'qq': '',
              'points': 0,
              'user_avatar': '',
              'birthday': '1988-10-10',
              'address': ''
            }
          }, {
            'organization': '德隆',
            'reg_time': '2019-04-05T16:30:49+0800',
            'org_email': 'xs_lee@126.com',
            'fav_industries': '33',
            'fav_round': '15',
            'is_reviewed': true,
            'review_status': 'PASS',
            'review_update_time': '2019-05-23T20:09:42+0800',
            'reviewer_note': '',
            'user_id': 13,
            'business_card': 'https://www.investdata.com.cn/api/investor/13/business_card/',
            'user': {
              'user_name': 'lxslxs',
              'email': 'xs_lee@126.com',
              'phone': '13817307973',
              'sex': '男',
              'reg_time': '2012-01-15T23:20:00+0800',
              'homepage': '',
              'qq': '',
              'points': 194811,
              'user_avatar': '',
              'birthday': '2000-01-01',
              'address': ''
            }
          }],
          'info': {'pagination': {'count': 23, 'num_pages': 1, 'per_page': 50}}
        }
        break
      case API.Learning_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'permission': true,
              'id': 1,
              'points': 0,
              'view_count': 0,
              'outline_file': 'https://www.investdata.com.cn/media/public/online_learning/outline/null',
              'video_file': 'https://www.investdata.com.cn/media/public/online_learning/outline/20190108170016_c7714f79a9.jpg',
              'material_title': '在线学习test',
              'update_time': '2019-01-08T17:00:16+0800'
            }
          ],
          'info': {
            'pagination': {
              'count': 1,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.Learning_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 2,
            'points': 1,
            'view_count': 0,
            'outline_file': 'http://localhost:8000/media/public/online_learning/outline/20190108204146_537888c67f.jpg',
            'material_title': 'ttt',
            'update_time': '2019-01-08T20:41:46+0800'
          },
          'info': null
        }
        break
      case API.Learning_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'points': 0,
            'view_count': 0,
            'outline_file': 'http://localhost:8000/media/public/online_learning/outline/20190108170016_c7714f79a9.jpg',
            'material_title': 'tt',
            'update_time': '2019-01-08T17:00:16+0800'
          },
          'info': null
        }
        break
      case API.Learning_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.ads_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 1,
              'display_image': 'http://investdata-public.stor.sinaapp.com/Ads/Pub-Huttopia-2015.jpg',
              'ad_type': 'vid',
              'ad_title': 'Pub Huttopia 2015',
              'ad_link_url': '/API/AdsView/1',
              'ad_info': null
            },
            {
              'id': 2,
              'display_image': 'http://investdata-public.stor.sinaapp.com/Ads/ad02.jpg',
              'ad_type': 'pdf',
              'ad_title': '易观：中国SaaS客服市场专题研究报告',
              'ad_link_url': '/Home/Article/19963',
              'ad_info': null
            },
            {
              'id': 6,
              'display_image': 'http://investdata-public.stor.sinaapp.com/Ads/ad06.jpg',
              'ad_type': 'img',
              'ad_title': '新书推荐：企业上市审核标准实证解析',
              'ad_link_url': '/API/AdsView/6',
              'ad_info': null
            },
            {
              'id': 9,
              'display_image': 'http://investdata-public.stor.sinaapp.com/Ads/ad09.png',
              'ad_type': 'pdf',
              'ad_title': '上海国资委交流纪要：上海本地股及2017年上海国改主线深度解析2016',
              'ad_link_url': '/Home/Article/29234',
              'ad_info': null
            }
          ],
          'info': {
            'pagination': {
              'count': 4,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.ads_detail(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 2,
            'target': 'android,ios',
            'show_order': 2,
            'display_image': 'http://investdata-public.stor.sinaapp.com/Ads/ad02.jpg',
            'ad_type': 'vid',
            'ad_title': '易观：中国SaaS客服市场专题研究报告',
            'ad_link_url': '/Home/Article/19963',
            'ad_info': '{"Entries":[{"src":"https://test.com/test1.mp4","poster":"https://test.com/test1.jpg"},{"src":"https://test.com/test2.mp4","poster":"https://test.com/test2.jpg"}]}'
          },
          'info': null
        }
        break
      case API.ads_create:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_image': 'http://127.0.0.1:8000/media/public/advertisement/20190620143940_fc816a2500.png',
            'resource_url': 'http://127.0.0.1:8000/media/public/advertisement/20190620143940_fc816a2500.png',
            'ad_type': 'img',
            'ad_title': 'test',
            'ad_link_url': ''
          },
          'info': null
        }
        break
      case API.ads_update(2):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 10,
            'display_image': 'http://127.0.0.1:8000/media/public/advertisement/20190620143940_fc816a2500.png',
            'resource_url': 'http://127.0.0.1:8000/media/public/advertisement/20190620143940_fc816a2500.png',
            'ad_type': 'img',
            'ad_title': 'test——new',
            'ad_link_url': ''
          },
          'info': null
        }
        break
      case API.ads_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_contactUpdate(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_contactDelete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_detailApiView(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            contact: {
              user_id: '12',
              user: {
                user_name: '开心'
              }
            }
          },
          'info': null
        }
        break
      case API.Investment_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 1,
              'org_name': '11111',
              'is_active': true
            },
            {
              'id': 2,
              'org_name': '2222',
              'is_active': false
            },
            {
              'id': 3,
              'org_name': '3333',
              'is_active': false
            }
          ],
          'info': {
            'pagination': {
              'count': 3,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.Investment_create:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 4,
            'org_name': '444',
            'is_active': true
          },
          'info': null
        }
        break
      case API.User_group_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 1,
              'display_name': '11111',
              'is_active': false,
              'is_admin': false
            },
            {
              'id': 2,
              'display_name': '2222',
              'is_active': false,
              'is_admin': true
            },
            {
              'id': 3,
              'display_name': '3333',
              'is_active': false,
              'is_admin': false
            }
          ],
          'info': {
            'pagination': {
              'count': 3,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.User_group_create:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 4,
            'display_name': '444',
            'is_active': true
          },
          'info': null
        }
        break
      case API.USER_charge:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'order_id': 'iap202003010952537f9d48ef93734aa',
            'pay_cny_fen': 100,
            'source': 'iap',
            'pay_time': '2020-03-01T17:52:53+0800',
            'expire_time': '2020-03-01T20:52:53+0800',
            'status': 'generate_order',
            'total': null
          },
          'info': {
            'id': 1,
            'user_name': 'DefineFC',
            'email': null,
            'phone': null,
            'sex': '',
            'reg_time': '2019-08-16T22:43:20+0800',
            'homepage': '',
            'qq': '',
            'points': 100,
            'user_avatar': '',
            'birthday': null,
            'address': '',
            'subscription': [],
            'investor': null
          }
        }
        break
      default:
        mockData = {
          'code': 400,
          'msg': '未找到模拟接口'
        }
    }
    setTimeout(() => {
      if (isShowLoading) Utils.closeLoading()
      console.log('【模拟-网络请求出参】', mockData)
      resolve(mockData)
    }, 1000)
  }
  )
}
export default MockData
