<template>
    <div class="form-textarea">
        <el-input v-bind="$attrs" type='textarea' v-model="textValue"></el-input>
    </div>
</template>

<script>
    import {ref, watch} from 'vue'

    export default {
        name: 'itemtextarea',
        props: {
            value: {
                type: String,
                default: ""
            }
        },

        setup(props, context) {
            let textValue = ref(props.value)
            let none = () => {
                return false
            }
            watch(textValue, (val) => {
                context.emit('update:value', val)
            })
            return {
                none,
                textValue

            }
        }
    }
</script>
<style lang='scss'>
    .form-textarea {
        width: 130px;
    }

    .el-form > .el-input, .el-input--small {
        width: 130px;
    }
</style>
