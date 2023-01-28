import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'tunafin',
      products: [],
      tempProduct: {},
      isWaitResponse: true
    }
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message)
          this.redirectToSigninPage();
        });
    },
    getData() {
      this.isWaitResponse = true;
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
        .finally(() => {
          this.isWaitResponse = false;
        });
    },
    selectProduct(product) {
      this.tempProduct = product;
    },
    logout() {
      const url = `${this.apiUrl}/logout`;
      axios.post(url)
        .then((res) => {
        })
        .catch((err) => {
          alert(err.data.message);
        })
        .finally(() => {
          this.redirectToSigninPage();
        })
    },
    redirectToSigninPage() {
      document.cookie = `token=0;expires=0; path=/`;
      window.location = 'signin.html';
    }
  },
  mounted() {
    // 取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  }
}).mount('#app');
