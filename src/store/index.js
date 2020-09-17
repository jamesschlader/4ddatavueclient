import Vue from 'vue';
import Vuex from 'vuex';
import collections from "./modules/collectionStore";
import users from "./modules/userStore";
import world from "./modules/worldStore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        collections, users, world
    }
});
