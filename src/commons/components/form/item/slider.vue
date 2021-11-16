<template>
    <div class="item-slider">
        <el-slider v-bind="$attrs" v-model="sliderValue"></el-slider>
    </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: "itemSlider",
        props:{
            value:{
                type:Number,
                default:0
            }
        },

        setup(props,context){
            let sliderValue=ref(props.value)
          return{
                sliderValue
          }
        }

    }
</script>

<style lang='scss'>
.item-slider{
    width: 320px;
}
</style>
