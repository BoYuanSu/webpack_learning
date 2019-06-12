import Vue from 'vue';
import App from './App.vue';

// 不需要編譯器
new Vue({
  render(h) {
    return h(App);
  }
}).$mount('#app');
