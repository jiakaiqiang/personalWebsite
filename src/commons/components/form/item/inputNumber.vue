<template>
    <div class="input-number">
        <el-input-number  v-model="inputNumberValue"></el-input-number>
    </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: "inputNumber",
        props:{
            value:{
                type:Number,
                default:""
            }
        },
        setup(props,context){
            let inputNumberValue=ref(props.value)
            return{
                inputNumberValue
            }
        }

    }
</script>

<style lang="scss">
.input-number{
    width: 130px;
}
</style>
