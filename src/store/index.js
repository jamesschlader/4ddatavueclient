import Vue from 'vue';
import Vuex from 'vuex';
import collections from "./modules/collectionStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        collections
    }
});
