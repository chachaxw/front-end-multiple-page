import indexAuthor from 'components/index/index-autor.vue';

const vm = new Vue({
  el: '.outer',
  data: {
    h2: 'Front-end multiple page preject by <br> Gulp and Webpack',
  },
  // components: { indexAuthor },
  created() {
    console.log('Hello Chacha');
  },
});
