/**
 * Created by heroubing on 2018/7/3.
 */
const menus = [
  {
    menuName: '首页',
    menuCode: 'home',
    menuUrl: '/home'
  },
  {
    menuName: '广告',
    menuCode: 'ads_manage',
    menuUrl: '/ads/manage'
  },
  {
    catalogName: '用户',
    catalogCode: 'user',
    children: [
      {
        menuName: '投资人',
        menuCode: 'investor_review',
        menuUrl: '/investor/review'
      },
      {
        menuName: '项目联系人',
        menuCode: 'projectContact_manage',
        menuUrl: '/projectContact/manage'
      }
    ]
  },
  {
    catalogName: '产品',
    catalogCode: 'product',
    children: [
      {
        catalogName: '互联网投行',
        catalogCode: 'internet',
        children: [
          {
            menuName: '商业计划书（BP）',
            menuCode: 'bp_manage',
            menuUrl: '/bp/manage'
          },
          {
            menuName: '投资行业',
            menuCode: 'bp_industry_manage',
            menuUrl: '/bp/industry/manage'
          },
          {
            menuName: '投资阶段',
            menuCode: 'bp_round_manage',
            menuUrl: '/bp/round/manage'
          },
          {
            menuName: '投资人',
            menuCode: 'investor_review',
            menuUrl: '/investor/review'
          },
          {
            menuName: '项目联系人',
            menuCode: 'projectContact_manage',
            menuUrl: '/projectContact/manage'
          }
        ]
      },
      {
        catalogName: '投资管理',
        catalogCode: 'investment',
        children: [
          {
            menuName: '投资机构',
            menuCode: 'investment_manage',
            menuUrl: '/investment/manage'
          },
          {
            menuName: '投资机构用户组',
            menuCode: 'userGroup_manage',
            menuUrl: '/userGroup/manage'
          }
        ]
      },
      {
        menuName: '在线学习',
        menuCode: 'learning_manage',
        menuUrl: '/learning/manage'
      }
    ]
  }
]
export default menus
