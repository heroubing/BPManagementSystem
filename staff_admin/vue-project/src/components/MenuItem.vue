<template>
  <el-menu-item
    v-if='isMenuItem'
    v-bind:index='menuData.menuCode'
  >{{menuData.menuName}}
  </el-menu-item>
  <el-submenu
    v-else-if='!menuData.hidden'
    v-bind:index='menuData.catalogCode'
    v-bind:show-timeout='50'
    v-bind:hide-timeout='50'
    popper-append-to-body
  >
    <template slot='title'>{{menuData.catalogName}}</template>
    <menu-item
      v-for='(menu, index) in menuData.children'
      v-bind:key='index'
      v-bind:menu-data='menu'
    ></menu-item>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuData: {
      type: Object,
      default: function () {
        return {
          menuName: '菜单名字',
          menuCode: 'menuCode',
          menuUrl: './'
        }
      }
    }
  },
  data: function () {
    return {
      isMenuItem: !this.menuData.children
    }
  }
}
</script>

<style scoped>

</style>
