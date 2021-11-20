<template>
   <el-header>
      <div class="app-header">
         <el-link :href="personLink" target="_blank">个人简介</el-link>

      </div>
   </el-header>
   <div class="home">

   </div>
</template>

<script>
    export default {
        name:'home',
        setup(){
       let personLink='/personal'
       return{
          personLink
       }
    }
    }
</script>
<style lang="scss">
   @import "@/styles/index.scss";

</style>
