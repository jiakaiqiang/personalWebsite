<template>
    <div class="home">
        <Dialog :title="dialogInfo.title" v-model:visible="dialogInfo.visible">
         弹框的内容
        </Dialog>
        <page-form  @handleEvent="handleEvent" v-model:formRef="formInfo.ref" :formData="formInfo.data" :formItem="formInfo.formItem" :rules="formInfo.rules" :list-type-info="listTypeInfo"></page-form>
       <el-button @click="showDialogInfo">显示</el-button>
        <page-table v-model:data="tableInfo.data" :fieldList="tableInfo.fieldList" :handle="tableInfo.handle" :list-type-info="listTypeInfo"></page-table>
        <my-tree
                :treeData="treeInfo.data"
                :treeParamProps="treeInfo.paramsProps"
                :showCheckBox="treeInfo.showcheck"
                :menuList="treeInfo.menuList"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
        >
            <template v-slot="{ data, node }">
                {{ data.label }}--{{ node.isLeaf }}
            </template>
        </my-tree>
        <TreeSelect
                :treeValue="valueSelect"
                :treeData="treeInfo.data"
                :dataType="dataType"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
        >
        </TreeSelect>
    </div>
</template>

<script>
    import {reactive,getCurrentInstance,watch,ref,toRefs} from 'vue'
    import Dialog from "@/commons/components/dialog";
    import PageForm from "@/commons/components/form/form"
    import PageTable from "@/commons/components/table"
    import MyTree from "@/commons/components/tree/index";
    import TreeSelect from "@/commons/components/treeSelect/index";
    export default {
        name: "Home",
        components: {
            Dialog,
            PageForm,
            PageTable,
            MyTree,
            TreeSelect

        },
/*测试代码推送*/
        setup(props, context) {
             let get=getCurrentInstance().appContext.config.globalProperties.$get
            get('http://is.snssdk.com/api/news/feed/v51/').then(res=>{
                console.log(res)
            })
            const checkList = ref(['Option A'])
            let dialogInfo = reactive({visible: false, title: '测试'})
            let showDialogInfo = () => {
                dialogInfo.visible = !dialogInfo.visible
            }
            //创建规则
            //form表单组件
            let listTypeInfo=reactive({
                checkboxList:[{label:"测试",value:1}]
            })
            let formInfo =reactive({
                data:{
                    name:"121",
                    age:[],
                    dateapick:'',
                    inputnumer:0,
                    selectdata:''
                },
                ref:null,
                rules:{},
                formItem:[{label:"测试",value:'name',show:true,formType:"itemInput",required:true},
                     {label:"年龄",value:"age",show:true,formType: "itemCheckBox",required: true,list:"checkboxList"},
                    {label:"data选择",value:"dateapick",show:true,formType:"itemDateSelect",required:true,type:'date'},
                    {label:"数字选择",value:'inputnumer',show:true,formType:'itemInputNumber',required:true},
                    {label:"select选择",value:'selectdata',show:true,formType:'itemSelect',required:true,list:"checkboxList"}
                ]
            })
            formInfo.rules=getCurrentInstance().appContext.config.globalProperties.$initRules(formInfo.formItem)
            let handleEvent=(event,data)=>{
               switch (event) {
                   case 'changeCheck':
                       console.log(data,';sda')
                       break

               }

            }
            let handleClick=(event,data)=>{
                switch (event) {

                }
            }
            watch(()=>formInfo.ref,()=>{
                console.log(formInfo.ref,'cshi')
            })
            let  test=(data)=>{
                console.log(data)
            }
            //表格相关
            let tableInfo=reactive({
                data:[{test:"测试",name:'名称',age:123}],
                 height:12,
                fieldList:[{value:"测试",name:"test"},{value:"姓名",name:"name"},{value:"年龄",name:"age"}],
                handle:{
                    label:"操作",
                    show:true,
                    fixed:'right',
                    width:'100px',
                    btList:[{label:"添加",event:"add",icon:"el-icon-plus",type:"text"}]
                }
            })
            //树
            let treeInfo=reactive({
                    showcheck: true,
                    data: [
                        {
                            label: "一级 1",
                            id: 1,
                            children: [
                                {
                                    id: 4,
                                    label: "二级 1-1",
                                    children: [
                                        {
                                            id: 5,
                                            label: "三级 1-1-1",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            label: "一级 2",
                            children: [
                                {
                                    id: 6,
                                    label: "二级 2-1",
                                    children: [
                                        {
                                            id: 12,

                                            label: "三级 2-1-1",
                                        },
                                    ],
                                },
                                {
                                    id: 7,
                                    label: "二级 2-2",
                                    children: [
                                        {
                                            id: 13,
                                            label: "三级 2-2-1",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 3,
                            label: "一级 3",
                            children: [
                                {
                                    id: 8,
                                    label: "二级 3-1",
                                    children: [
                                        {
                                            label: "三级 3-1-1",
                                        },
                                    ],
                                },
                                {
                                    id: 9,
                                    label: "二级 3-2",
                                    children: [
                                        {
                                            id: 14,
                                            label: "三级 3-2-1",
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    paramsProps: {
                        label: "label",
                        children: "children",
                    },
                    menuList: [
                        {
                            label: "ceshi",
                            event: "refresh",
                            show: true,
                        },
                        { label: "测试", event: "delete", show: true },
                    ],
                })
            let treeSelectData=reactive({
                valueSelect: [1],
                dataType: 1,
            })


            return {
                ...toRefs(treeSelectData),
                dialogInfo,
                showDialogInfo,
                formInfo,
                listTypeInfo,
                handleEvent,
                handleClick,
                checkList,
                test,
                tableInfo,
                treeInfo
            }

        },
    };
</script>
