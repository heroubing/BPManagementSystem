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
    catalogName: '投资数据库管理',
    catalogCode: 'bp',
    children: [
      {
        menuName: '添加BP',
        menuCode: 'bp_add',
        menuUrl: '/bp/add'
      },
      {
        menuName: 'BP管理',
        menuCode: 'bp_manage',
        menuUrl: '/bp/manage'
      },
      {
        menuName: '行业管理',
        menuCode: 'bp_industry_manage',
        menuUrl: '/bp/industry/manage'
      },
      {
        menuName: '投资阶段管理',
        menuCode: 'bp_round_manage',
        menuUrl: '/bp/round/manage'
      }
    ]
  },
  {
    catalogName: '投资人',
    catalogCode: 'investor',
    children: [
      {
        menuName: '投资人审核',
        menuCode: 'investor_review',
        menuUrl: '/investor/review'
      }
    ]
  },
  {
    menuName: '在线学习',
    menuCode: 'learning_manage',
    menuUrl: '/learning/manage'
  }
]
export default menus
