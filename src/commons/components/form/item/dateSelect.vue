<template>
    <div class='form-date'>
        <el-date-picker v-model="dateValue" type="date" @change="handleEvent">
        </el-date-picker>
    </div>

</template>

<script>
    import {watch, ref} from 'vue'

    export default {
        name: "itemDateSelect",
        props: {
            value: {
                type: [String, Date, Array],
                default: "",
            },
        },
        setup(props, context) {
            let dateValue = ref(props.value)
            watch(dateValue, (val) => {
                console.log(val)
                context.emit('update:value', val)
            })
            let handleEvent = (data) => {
                context.emit('handleEvent', 'changeDate', data)
            }
            return {
                dateValue,
                handleEvent
            }
        },
    };
</script>

<style lang='scss'>
    .form-date {
        width: 130px;
    }
</style>
