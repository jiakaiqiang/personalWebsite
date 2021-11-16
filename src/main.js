import {createApp} from 'vue';
import App from "./App.vue";
const app=createApp(App)
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//校验规则添加到实例应用中
import rules from '@/commons/js/rules'
//添加请求
import {post,get} from "@/util/request.js"
app.config.globalProperties={
    $initRules:rules,
    $post:post,
    $get:get
}
app.use(store).use(router).use(ElementPlus).mount("#app");
