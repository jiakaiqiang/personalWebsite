<template>
    <div class="item-checkbox">
        <el-checkbox-group v-model="checkList" @change="handleEvent">
            <el-checkbox  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    import {watch,ref} from 'vue'
    export default {
        name: "checkbox",
        props: {
            value: {
                type: Array,
            },
            selectList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        setup(props,context){
           //根据elementplus的规则v-model绑定的数据 是通过ref定义的
            let checkList=ref([])
            watch(checkList,(val)=>{
                context.emit('update:value',val)
            },{deep:true})
            let  handleEvent=(data)=>{
                  context.emit('handleEvent','changeCheck',data)
            }
            return {
                handleEvent,
                checkList
            }
        },
    }

</script>

<style lang='scss'>
    .item-checkbox {
        width: 320px;
    }

</style>
