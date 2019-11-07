<template>
  <div class="content">
    <div class="icon"></div>
    <div>
      <h1>404</h1>
      <div class="dec">抱歉，你访问的页面不存在</div>
      <el-button type="primary" size="small" @click="goBackHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotExist',
  methods: {
    goBackHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
  .content {
    background-color: #f0f2f5;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 40px;
  }

  .icon {
    height: 360px;
    width: 100%;
    max-width: 430px;
    background: url("../assets/not-exist.svg") no-repeat 50% 50%;
    background-size: contain;
  }

  h1 {
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin: 0 0 24px 0;
  }

  .dec {
    color: rgba(0, 0, 0, .45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
</style>
