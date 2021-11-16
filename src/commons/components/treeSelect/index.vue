<template>
    <div class="test-tree">
        {{treeDataLabel}}
        <el-select v-model="treeDataLabel" ref="treeSelect" no-match-text='没有数据啦....' clearable :multiple='multiple'>
            <el-option :value="optionValue" class="select-tree-class">
                <el-tree :data='treeData' :node-key='nodeKey' @node-click="nodeClick" @node-expand="nodeExpand"
                         ref="tree" :check-strictly='true' :expand-on-click-node='expandOnClikcNode'
                         :default-expanded-keys='expandNode'>
                </el-tree>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import MyTree from "@/commons/components/tree/index";
    import {watch, ref, reactive, toRefs, getCurrentInstance} from 'vue'

    export default {
        name: "treeSelect",
        components: {
            MyTree,
        },
        props: {
            // //选中的树的值
            treeValue: {
                type: [Number,Array],

            },
            //树形数据
            treeData: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            //树的默认参数
            defaultProps: {
                type: Object,
                default: () => {
                    return {label: "label", children: "chilren", id: "id"};
                },
            },
            nodeKey: {
                type: String,
                default: 'id'
            },

            multiple: {
                type: Boolean,
                default: false
            },

            //1代表传入的值，2代表api请求过来的数据
            dataType: {
                type: Number,
                default: 1,
            },
        },

        setup(props, context) {
            console.log(props,'wewe')
            let {proxy} = getCurrentInstance()

            let dataInfo = reactive({
                optionValue: "",
                expandOnClikcNode: false,
                treeDataLabel: '111',
                expandNode: [],
                treeId: [],
                ids: []
            })
            if (props.multiple) {
                dataInfo.treeDataLabel = []
            } else {
                dataInfo.treeDataLabel = ''
            }
            dataInfo.ids = props.treeValue instanceof Array ? props.treeValue : [props.treeValue]
            let initData = (ids) => {
                if (ids.length === 0 || props.treeData.length === 0) {
                    dataInfo.treeDataLabel = props.multiple ? [] : ''
                    if (props.multiple) {
                        el.setCheckedKeys([])
                    } else {
                        el.setCurrentKey(null)
                    }
                    return
                }
                let el = proxy.$refs.tree
                if (props.multiple) {
                    //设置选中的树
                    el.setCheckedKeys(ids)
                    //获取值
                    dataInfo.treeDataLabel = el.getCheckedNodes().map(item => {
                        return item.label
                    })
                } else {
                    el.setCurrentKey(ids[0])
                    if (el.getCurrentNode()) {

                        dataInfo.treeDataLabel = el.getCurrentNode().label

                        console.log(dataInfo.treeDataLabel)
                    } else {
                        dataInfo.treeDataLabel = ''
                    }

                }
            }
            let handleEvent = (event, data) => {
                switch (event) {

                }
            }
            let handleClick = (event, data) => {
                context.emit('handleClick', event, data)
                proxy.$refs.treeSelect.blur()
            }
            let initTree = () => {
                if (dataInfo.treeId.length > 0) {
                    ///获取node节点
                    context.emit()
                }
            }
            let nodeClick = (data, node) => {
                console.log(data)
                //获取当前的节点
                if (!props.multiple) {
                    dataInfo.ids = [data.id]
                    proxy.$refs.treeSelect.blur()
                } else {
                    dataInfo.ids.push(data.id)
                }
                context.emit('input', [...new Set(dataInfo.ids)])
                context.emit('handleClick', 'nodeClick', data, node)

            }
            let nodeExpand = (data, node) => {
                context.emit('handleEvent', 'nodeExpand', data, node)
            }

            watch(() => props.treeValue, (val) => {
                if (props.multiple) {
                    dataInfo.ids = [...val]
                } else {
                    dataInfo.ids = val
                }
            })
            watch(() => dataInfo.ids, (val) => {
                console.log('wewe')
                initData(val)
            })
            return {
                ...toRefs(dataInfo),
                initData,
                nodeExpand,
                nodeClick,
                initTree,
                handleClick,
                handleEvent
            }
        },

        methods: {


            handleEvent() {

            },

        },
    };
</script>

<style lang='scss'>
    .select-tree-class {
        height: 100% !important;
        line-height: 100%;
        padding: 0 !important;
        font-weight: 500 !important;
    }

    .selectOption {
        display: none !important;
    }

    .el-select-dropdown__wrap {
        max-height: none !important;
    }
</style>
