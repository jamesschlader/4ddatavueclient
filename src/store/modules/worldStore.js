const state = {
    selectedWorld: {}
};

const getters = {
    getSelectedWorld: state => state.selectedWorld
};

const mutations = {
    setSelectedWorld: (state, world) => state.selectedWorld = world
};

const actions = {
    setSelectedWorld: ({commit}, world) => commit("setSelectedWorld", world)
};

export default {state, getters, mutations, actions};