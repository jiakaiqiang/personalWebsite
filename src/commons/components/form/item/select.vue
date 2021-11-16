<template>
  <div class='selectItem'>
        <el-select v-model="selectValue" v-bind="$attrs" @change="handleEvent('changeSelect')">
    <el-option
      v-for="(item,index) in selectList"
      :key="index"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script>
  import {ref,watch}  from 'vue'
export default {
name:'fromSelect',
props:{
  value:{
    type:[String,Number],
    default:""
  },
  selectList:{
      type:Array,
      default:()=>{
          return []
      }
  }
},
setup(props,context){
  let selectValue=ref(props.value)
  watch(selectValue,(val)=>{
    context.emit('update:value',val)
  })
  let handleEvent=(data)=>{
    context.emit('handleEvent','changeSelect',data)
  }
  return{
    handleEvent,
    selectValue
  }
}

}

</script>
<style lang="scss">
.selectItem{
  width: 130px;
}
</style>
