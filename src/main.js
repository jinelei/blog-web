import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import iView from 'iview'
import iEditor from 'iview-editor'

import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(iEditor)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
