/**
 * Created by lzxil on 2018/7/3.
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
  }
]
export default menus
