import launcher from "@/store/launcher";
import {signupMutation} from "@/store/mutations/UserMutations";
import {loginQuery} from "@/store/queries/UserQueries";
import isJwtValid from "@/store/helpers/isJwtValid";

const state = {
    user: {},
    jwt: '',
    isAuthenticated: false
};

const getters = {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated
};

const mutations = {
    login: (state, token) => {
        const decoded = isJwtValid(token);
        if (decoded) {
            state.user = decoded.User;
            state.jwt = token;
            state.isAuthenticated = true;
        } else {
            state.user = {};
            state.jwt = "";
            state.isAuthenticated = false;
        }
    },
    logout: (state) => {
        state.user = {};
        state.jwt = "";
        state.isAuthenticated = false;
    }
};

const actions = {
    login: async ({dispatch, commit}, userData) => {
        const response = await launcher(loginQuery(userData));
        commit("login", response.data.data.login.jwt);
    },
    logout: async ({commit}) => commit("logout"),
    signUp: async ({dispatch, commit}, userData) => {
        const response = await launcher(signupMutation(userData));
        commit("login", response.data.data.signup);
    }
};

export default {state, getters, mutations, actions};