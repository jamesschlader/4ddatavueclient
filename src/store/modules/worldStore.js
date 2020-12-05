import launcher from "@/store/launcher";
import {addNodeToWorld} from "@/store/mutations/worldMutations";
import {editWorld} from "@/store/mutations/UniverseMutations";

const state = {
    selectedWorld: {}
};

const getters = {
    getSelectedWorld: state => state.selectedWorld
};

const mutations = {
    setSelectedWorld: (state, world) => state.selectedWorld = world,
    editWorld: (state, payload) => {
        console.log(`got me an edited world: `, payload);
    },
    addNodeToWorld: (state, newWorld) => this.selectedWorld.nodes.push(newWorld)
};

const actions = {
    setSelectedWorld: ({commit}, world) => commit("setSelectedWorld", world),
    addNodeToWorld: async ({commit, rootState}, addNodeToWorldObject) => {
        console.log(`gonna add a node to worldId: ${addNodeToWorldObject.worldId}`, addNodeToWorldObject);
        const response = await launcher(addNodeToWorld(addNodeToWorldObject), rootState.users.jwt);
        console.log(`what did we get back from addNodeToWorld? `, response);
        commit("addNodeToWorld", response.data.data.addNodeToWorld);
    },
    editWorld: async ({commit, rootState}, world) => {
        const response = await launcher(editWorld(world), rootState.users.jwt);
        commit("editWorld", response);
    }
};

export default {state, getters, mutations, actions};