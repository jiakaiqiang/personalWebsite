<template>
    <div class="my-tree" >
        <el-tree :data="treeData" :props="treeParamProps" :empty-text="emptyText" :node-key="nodeKey"
                 :default-expand-all="defaultExpandAll" :default-checked-keys="defaultCheckedkeys"
                 :default-expanded-keys="defaultExpandedKeys" :expand-on-click-node="expandOnClickNode"
                  :check-on-click-node="checkOnClickNode" :accordion="accordion"    :icon-class="iconClass"
                  :show-checkbox="showCheckBox"
                 :lazy="lazy"
                 :load="loadNode"
                 @node-click="nodeClick"
                 @check="check"
                 @node-contextmenu="nodeContextMenu"
                 @node-expand="nodeExpand"
                >
           <template v-slot="{data,node}" v-if="slotContent">
              <slot :data="data" :node="node"></slot>
           </template>
        </el-tree>
            <ul class="menu-class" ref="menu" v-if="menuList.length>0&&showMenu" :style="{top:menuStyle.top+'px',left:menuStyle.left+'px',position:'absolute'}">
                <li v-for="(item,index) in menuList" @click="menuListClick(item.event,item)" :key="index">{{item.label}}</li>
            </ul>
    </div>
</template>

<script>
    import {reactive,toRefs,nextTick,watchEffect} from 'vue'
    import {post,get} from '@/util/request.js'

    export default {
        name: "Mytree",
        props:{
            treeData:{
                type:Array,
                default:[]
            },
            /*是否自定义树内容 ，默认不可以自定义内容*/
            slotContent:{
              type:Boolean,
              default:false
            },
            /*是否懒加载(true的时候通过接口去请求数据,false则是通过外部传递过来的)*/
            lazy:{
                type:Boolean,
                default:false
            },
            api:{
              type:String,
              default:''
            },
            /*数据来源方式 1 外部2 内部请求*/
            dataType:{
              type:Number,
              default:1
            },
            treeParamProps:{
                type:Object,
                default:()=>{
                    return {
                        label:'label',
                        children:'children'
                    }
                }
            },
            iconClass:{
                type:String,
                default:''
            },
            accordion:{
                type:Boolean,
                default:false,
            },
            /*默认选中的*/
            defaultCheckedkeys:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            showCheckBox:{
                type:Boolean,
                default:false
            },
            /*默认展开的节点*/
            defaultExpandedKeys:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            /*点击节点进行选中*/
            checkOnClickNode:{
                type:Boolean,
                default:false
            },
            /*点击节点不展开子节点*/
            expandOnClickNode:{
                type:Boolean,
                default:false
            },
            /*默认展开的节点*/
            defaultExpandAll:{
                type:Boolean,
                default:false
            },
            /*树节点的唯一标识*/
            nodeKey:{
                type:String,
                default:'id'
            },
            emptyText:{
                type:String,
                default:'暂无数据'
            },
            /*获取右键的list*/
            menuList:{
                type:Array,
                default:()=>{
                    return []
                }
            }
        },
        setup(props,context){
          let dataInfo=reactive({ showMenu:false,
              menuStyle: {
                  top: 0,
                  left: 0
              },
              loading:true})
            /*tree展开*/
            let nodeClick=(data,node)=>{
                dataInfo.showMenu=false
                context.emit('handleClick','nodeClick',data,node)
            }
            let check=(data,node)=>{
                context.emit('handleClick','check',data,node)
            }
            let nodeExpand=(data,node)=>{
                context.emit('handleEvent','nodeExpand',data,node)
            }
            let nodeContextMenu=(event,data,node)=>{
                dataInfo.showMenu=true
                dataInfo.menuStyle={top:event.clientY,left:event.clientX}
                context.emit('handleEvent','nodeContextMenu',event,data,node)

            }
            /*右侧菜单 点击*/
            let menuListClick=(event,data)=>{
                context.emit('handleClick',event,data)
                //菜单隐藏
                dataInfo.showMenu=false
            }
            /*懒加载的节点*/
            let loadNode=(node,reslove)=>{
                if(props.dataType===2&&props.lazy&&props.api){
                    post(props.api,node.data.id).then(res=>{
                        res&&res.data&&reslove(res.data)
                    })

                }else{
                    throw new Error('参数传递不正确')
                }

            }

            return {
                //将不是响应式的数据转成响应式
                ...toRefs(dataInfo),
                loadNode,
                menuListClick,
                nodeContextMenu,
                nodeExpand,
                nodeClick,
                check
            }

        }
    }
</script>

<style scoped lang="scss">
    .my-tree{
        .menu-class{
            margin:0px;
            padding:0;
            width: 100px;
            text-align:center;
            background-color: #fff1fa;
            list-style: none;
            border-radius: 3px;
            li{
                height:30px;
                line-height:30px;
                border-bottom:1px solid snow;
            }
        }
    }


</style>
