import launcher from "@/store/launcher";
import {signupMutation} from "@/store/mutations/UserMutations";
import {loginQuery} from "@/store/queries/UserQueries";
import isJwtValid from "@/store/helpers/isJwtValid";

const state = {
    user: {},
    jwt: localStorage.getItem('jwt') || '',
    isAuthenticated: false
};

const getters = {
    getUser: state => state.user
};

const mutations = {
    login: (state, token) => {
        const decoded = isJwtValid(token);
        console.log(`we have a decoded jwt: `, decoded);
        if (decoded) {
            localStorage.setItem("jwt", token);
            state.user = decoded.User;
            state.jwt = token;
            state.isAuthenticated = true;
        }
    },
    logout: (state) => {
        state.user = {};
        state.jwt = "";
        state.isAuthenticated = false;
        localStorage.removeItem("jwt");
    }
};

const actions = {
    login: async ({dispatch, commit}, userData) => {
        const response = await launcher(loginQuery(userData));
        commit("login", response.data.data.login.jwt);
    },
    logout: async ({commit}) => {

    },
    signUp: async ({dispatch, commit}, userData) => {
        const response = await launcher(signupMutation(userData));
        commit("login", response.data.data.signup);
    }
};

export default {state, getters, mutations, actions};