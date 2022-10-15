import Vue from "vue";
import app from "./app.vue";
import "./registerServiceWorker";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/plugins/toastification";
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    router,
    render: (h) => h(app),
}).$mount("#app");
