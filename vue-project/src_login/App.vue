<template>
  <div id='app'>
    <div class='header'>
      <img src='./assets/logo.png' alt='联通图标' class='icon'>
      BP后台管理系统
    </div>
    <div class='main'>
      <img src='./assets/bg.jpg' alt='BP后台管理系统' v-bind:height='height - 161'>
      <div class='innerDiv'>
        <el-input
          class='input'
          placeholder='账号'
          size='small'
          v-model='id'>
          <img slot='prefix' src='./assets/user.svg' alt='用户名' class='input-icon'>
        </el-input>
        <el-input
          class='input'
          placeholder='密码'
          size='small'
          v-model='password'
          maxlength='30'
          type='password'>
          <img slot='prefix' src='./assets/lock.svg' alt='密码' class='input-icon'>
        </el-input>
        <div class='verDiv'>
          <el-input
            class='input'
            size='small'
            v-model='verificationCode'
            v-on:keyup.enter.native='login'
            v-bind:maxlength='4'>
          </el-input>
          <img src='./assets/verf-1.png' alt='验证码' class='verImg' v-on:click='handleVerfClick'>
        </div>
        <div style='width: 100%;height: 20px;'>
          <!--<el-button type='text' class='forgetPassword' v-bind:click='handleForgetPassword'>忘记密码？</el-button>-->
        </div>
        <el-button size='small' type='primary' class='loginButton' v-bind:loading='loading' v-on:click='login'>登 录
        </el-button>
      </div>
    </div>
    <div class='footer'>
      COPYRIGHT © 2018 POWERED BY xiaohetongxue.com @xiaohetongxue.cn
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      id: '',
      password: '',
      verificationCode: '',
      loading: false,
      time: 0,
      lock: false
    }
  },
  methods: {
    login () {
      // 校验是否输入用户名、密码、验证码
      if (!this.validator(this.id, '账号') ||
          !this.validator(this.password, '密码') ||
          !this.validator(this.verificationCode, '验证码')) {
        return false
      }
      // 校验验证码是否通过 todo
      // 校验用户名密码是否正确 todo
      // if (this.id !== 'admin' || this.password !== '123456') {
      //   this.$message({showClose: true, message: '用户名或密码不正确，请重新输入', type: 'error'})
      //   return false
      // }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // 页面跳转 TODO
        console.log('登录成功')
        window.location.href = 'http://localhost:8080/home/'
      }, 500)
    },
    validator (value, label) {
      if (value.trim() === '') {
        this.$message({showClose: true, message: '请输入' + label, type: 'warning'})
        return false
      } else {
        return true
      }
    },
    handleVerfClick () {
    },
    handleForgetPassword () {
      this.$message({showClose: true, message: '请联系管理员重置密码', type: 'warning'})
    }
  },
  watch: {
  //   verificationCode: function (verificationCode) {
  //     this.verificationCode = verificationCode.replace(/\D/g, '')
  //   }
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

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    padding-left: 100px;
    letter-spacing: 5px;
    height: 80px;
  }

  .icon {
    height: 50px;
    width: auto;
    border-right: 2px solid #eeeeee;
    padding-right: 10px;
    margin-right: 10px;
  }

  .main {
    padding: 0;
    overflow-x: hidden;
    display: flex;
  }

  .footer {
    background-color: #414141;
    color: #bbbbbb;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 80px;
  }

  .innerDiv {
    background-color: white;
    position: absolute;
    right: 10%;
    top: 18%;
    width: 220px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 30px;
  }

  .input {
    margin-top: 10px;
  }

  .input input, .loginButton {
    border-radius: 0;
  }

  .input-icon {
    width: 25px;
    height: auto;
    margin-top: 3px;
  }

  .verDiv {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .loginButton {
    width: 100%;
    background-color: #ff6d22;
    color: white;
    border: none;
  }

  .verImg {
    width: 60px;
    height: 30px;
    border: 1px solid #dcdfe6;
    margin-left: 5px;
    margin-top: 10px;
  }
</style>
