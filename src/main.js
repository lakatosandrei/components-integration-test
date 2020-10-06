import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { applyPolyfills, defineCustomElements } from '@pie-api/pie-api-components/dist/loader';
import router from './router'


Vue.config.productionTip = false;

Vue.config.ignoredElements = [/pie-\w*/];


applyPolyfills().then(() => {
  defineCustomElements(window);
});


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
