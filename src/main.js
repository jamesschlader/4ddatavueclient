import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApollo from "vue-apollo";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_SERVER_URL
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
});


new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
