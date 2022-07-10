import { createApp } from "vue";
import ElementPlus from "element-plus";
import { createRouter, createWebHistory } from "vue-router";
import "element-plus/dist/index.css";
import App from "./App.vue";
import axios from "axios";
import config from "./config";
import zhCn from "element-plus/es/locale/lang/zh-cn";

axios.defaults.baseURL = config.apiBase;

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data && response.data?.code !== 0) {
        return Promise.reject(response.data?.msg ?? "请求出错");
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.msg) {
      return Promise.reject(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);

const routes = [
  { path: "/simulator", component: import("./views/simulator/index.vue") },
  { path: "/", component: import("./views/real/index.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);

app.mount("#app");
