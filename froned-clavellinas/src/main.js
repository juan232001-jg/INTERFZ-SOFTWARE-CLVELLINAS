import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://software-clavellinas.herokuapp.com/clavellinas/'

new Vue({
    router,
    store,
    vuetify,
    Swal,
    render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
    if (!store.state.token && to.path != "/login") {
        next("/login")
    } else {
        next();
    }
})