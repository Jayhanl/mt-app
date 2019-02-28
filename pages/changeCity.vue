<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <is-select/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IsSelect from '../components/changeCity/iselect.vue'
import HotCity from '../components/changeCity/hotcity.vue'
import Categroy from '../components/changeCity/categroy.vue'
  export default {
    components:{
      IsSelect,
      HotCity,
      Categroy
    }
  }
</script>

<style scoped>

</style>