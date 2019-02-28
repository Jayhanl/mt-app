<template>
  <div class="m-geo">
    <i class="el-icon-location">{{$store.state.geo.position.city}}</i>
    <nuxt-link
     class="changeCity"
     to="/changeCity">切换城市</nuxt-link>
     [金湾 香洲 唐家]
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>