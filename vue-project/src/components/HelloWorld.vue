<template>
  <div class='hello'>
    <img src='../assets/logo.png' class='icon'>
    <h1>{{ msg }}</h1>
    <el-row>
      <el-button type='primary'>开始</el-button>
    </el-row>
    <router-link to='/Login'>登录</router-link>
    <router-link to='/Home'>主页</router-link>
    <router-link to='/Login'>登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .icon {
    width: 100px;
  }
</style>
