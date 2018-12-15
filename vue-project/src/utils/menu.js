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
    catalogName: 'BP录入界面',
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
  }
]
export default menus
