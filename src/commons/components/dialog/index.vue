<template>
    <div :class="['my-dialog',customClass?customClass:'']" >
        <el-dialog
                v-model="visible"
                :width="width"
                :fullscreen="fullscreen"
                top="30px"
                modal
                :custom-class="customClass"
                :close-on-click-modal="closeOnclickModal"
                :close-on-press-escape="closeOnPressEscape"
                :show-close="showClose"
                :before-close="handleClose">
            <!--title-->
            <div slot="title" class="dialog-title">
                {{title}}
            </div>
            <!--存放dialog的内容-->
            <div>
                <slot></slot>

            </div>
            <span slot="footer">
            <el-button v-for="(item,index) in btList" :type="item.type" :size="item.size?item.size:'small'" :key='index'
                   @click="handleClick(item.event)">{{item.label}}</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MyDialog",
        props: {
            title: {
                type: String,
                default: ""
            },
            customClass:{
              type:String,
              default:''
            },
            visible:{
              type:Boolean,
              default:false
            },
            closeOnclickModal: {
                type: Boolean,
                default: true,
            },
            closeOnPressEscape: {
                type: Boolean,
                default: true,
            },
            width: {
                type: String,
                default: "800px"
            },
            fullscreen: {
                type: Boolean,
                default: false
            },
            showClose: {
                type: Boolean,
                default: true
            },

            btList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        // eslint-disable-next-line no-unused-vars
        setup(props,{emit}){
            // eslint-disable-next-line no-unused-vars
            let handleClick=(event) =>{
                emit('handleClick', event)
            }
           let handleClose=(done) =>{
                //弹窗关闭前 修改visible的状态
                emit('update:visible', false)

            }
            return {
                handleClick,
                handleClose
            }
        }

    }
</script>

<style scoped lang="scss">
    .my-dialog{
        .el-dialog__header{
            padding: 0px 16px 10px 0px;
        }
        .dialog-title{
            height:50px;
            width: 100%;
            text-align: left;
            line-height: 50px;
            padding-left:16px;
            font-size:20px;
            background-color:hotpink;

        }
    }

</style>
