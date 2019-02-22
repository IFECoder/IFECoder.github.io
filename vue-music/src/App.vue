<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <!-- keep-alive的作用：在组件切换过程中将状态保留在内存中,防止重复渲染DOM。这样的话就不会重新发起请求 -->
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab.vue'
import player from './components/player/player.vue'
export default {
  components:{
    MHeader,
    Tab,
    player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
