<template>
  <div class="form-input">
    <el-input  v-bind="$attrs" v-model="inputValue"  size="small" @blur="handleEvent('blur')" @change="handleEvent('changeInput')"></el-input>
  </div>
</template>

<script>
  import {watch} from 'vue'
export default {
name:'inpust',
props:{
  value:{
    type:String,
    default:""
  }
},
  setup(props,context){
   let inputValue=props.value
     watch(()=>inputValue,(value)=>{
       context.emit('update:value',value)
     })

    let handleEvent=(event)=>{
      context.emit('handleEvent',event,inputValue)
    }
    return {
     handleEvent,
      inputValue
    }

  },
}
</script>
<style>


</style>
