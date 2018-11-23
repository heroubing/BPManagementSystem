<template>
  <div id='app'>
    <el-container>
      <el-header>
        <div class='icon'>
          <img src='../src_login/assets/logo.png' class='iconImg'/>
          <span class='title'>BP后台管理系统</span>
        </div>
        <div class='funcDiv'>
          <div class='topButtonDiv'>
            <img src='./assets/button-logout.png' alt='退出' class='buttonImg'>
            <el-button class='topButton' size='mini' type='text' v-on:click='handleLogout'>退出</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width='210px'>
          <el-menu
            v-bind:default-active='activeIndex'
            v-on:select='handleSelect'
            background-color='#545c64'
            text-color='#fff'
            active-text-color='#ffd04b'
            unique-opened
          >
            <menu-item
              v-for='(menu, index) in menus'
              v-bind:key='index'
              v-bind:menu-data='menu'
            >
            </menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuItem from './components/MenuItem'
import menus from './menu'

export default {
  name: 'App',
  components: {MenuItem},
  data: function () {
    // 初始化首页
    let initMenu = menus[0]
    return {
      // 当前选中菜单编码
      activeIndex: initMenu.menuCode,
      // 当前选中tab页编码
      menuIndex: 0,
      menuLength: menus.length,
      menus: menus
    }
  },
  methods: {
    /**
       * 根据keyPath查找菜单
       * @param keyPath
       * @returns {menuData}
       */
    findMenuDataByKeyPath (keyPath) {
      let catalog = menus
      for (let i = 0; i < keyPath.length - 1; i++) {
        catalog = catalog.find(data => {
          return data.catalogCode && data.catalogCode === keyPath[i]
        }).children
      }
      return catalog.find(menu => {
        return menu.menuCode && menu.menuCode === keyPath[keyPath.length - 1]
      })
    },
    handleSelect (key, keyPath) {
      // TODO
      console.log('key:', key)
      console.log('keyPath:', keyPath)
      // 新打开tab页
      let menu = this.findMenuDataByKeyPath(keyPath)
      console.log(menu)
      this.$router.push(menu.menuUrl)
    },
    /**
       * 退出
       */
    handleLogout () {
      // TODO
      this.$confirm('确认退出当前账号？')
        .then(_ => {
          console.log('退出')
          document.location.href = '/'
        })
        .catch(_ => {
        })
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.$notify({
        title: '欢迎回来',
        type: 'success',
        duration: 2000,
        offset: 90
      })
    }, 1500)
  }
}
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  body,
  html {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #545c64;
    color: #fff;
    display: flex;
    justify-content: center;
    align-content: space-between;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: start;
  }

  .el-main {
    background-color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .icon {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
  }

  .iconImg {
    height: 45px;
    margin-right: 10px;
  }

  .title {
    font-family: 微软雅黑, 宋体, Arial, serif;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    color: #fff;
  }

  .topButtonDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }

  .topButtonDiv:last-child {
    margin-right: 30px;
  }

  .topButton {
    color: #fff;
  }

  .buttonImg {
    width: auto;
    height: 15px;
    font-size: 13px;
    margin-right: 3px;
  }

  .funcDiv {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
</style>
