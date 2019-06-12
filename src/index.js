console.log('Hello Vue');

import Vue from 'vue';

new Vue({
  el: '#app1',
  data: {
    message: 'Vue!'
  }
});

// 需要編譯器
new Vue({
  el: '#app2',
  data: { hi: 'app2' },
  template: '<div>{{ hi }}</div>'
});

// 不需要編譯器
new Vue({
  //   el: '#app3',
  render(h) {
    return h('div', 'this.hi');
  }
}).$mount('#app3');
