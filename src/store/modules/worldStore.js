import launcher from "@/store/launcher";
import {getAllNodesByWorldId} from "@/store/queries/WorldQueries";
import {addManyNodesToWorld, addNodeToWorld, addValueToNode} from "@/store/mutations/worldMutations";
import {editWorld} from "@/store/mutations/UniverseMutations";

const state = {
    selectedWorld: {},
};

const getters = {
    getSelectedWorld: state => state.selectedWorld,
    getHeaderNodes: state => {
        return state.selectedWorld.nodes.filter(node => node.YId === 0).sort((a, b) => a.XId - b.XId);
    },
    getBodyNodes: state => state.selectedWorld.nodes.filter(node => node.YId > 0).sort((a, b) => a.XId - b.XId)
};

const mutations = {
    setSelectedWorld: (state, world) => {
        state.selectedWorld = world;
    },
    editWorld: (state, payload) => {
        console.log(`got me an edited world: `, payload);
    },
    addNodeToWorld: (state, newWorld) => state.selectedWorld.nodes.push(newWorld),
    updateNodes: (state, nodes) => state.selectedWorld.nodes = nodes,
    addValueToNode: (state, value) => state.selectedWorld.nodes.find(
        node => node.nodeSpaceId === value.nodeValueSpace.nodeSpaceId).value = value
};

const actions = {
    setSelectedWorld: ({commit}, world) => commit("setSelectedWorld", world),
    addNodeToWorld: async ({commit, rootState}, addNodeToWorldObject) => {
        console.log(`gonna add a node to worldId: ${addNodeToWorldObject.worldId}`, addNodeToWorldObject);
        const response = await launcher(addNodeToWorld(addNodeToWorldObject), rootState.users.jwt);
        console.log(`what did we get back from addNodeToWorld? `, response);
        commit("setSelectedWorld", response.data.data.addNodeToWorld);
    },
    addManyNodesToWorld: async ({commit, rootState}, nodes) => {
        const response = await launcher(addManyNodesToWorld(nodes), rootState.users.jwt);
        commit("setSelectedWorld", response.data.data.addManyNodesToWorld);
    },
    editWorld: async ({commit, rootState}, world) => {
        const response = await launcher(editWorld(world), rootState.users.jwt);
        commit("editWorld", response);
    },
    fetchAllTheNodes: async ({commit, rootState}) => {
        const response = await launcher(getAllNodesByWorldId(rootState.world.selectedWorld.worldId),
            rootState.users.jwt);
        commit("updateNodes", response.data.data.getAllNodesByWorldId);
    },
    addValueToNode: async ({commit, rootState}, nodeValueDTO) => {
        const response = await launcher(addValueToNode(nodeValueDTO), rootState.users.jwt);
        commit("addValueToNode", response.data.data.addValueToNode);
    },
    setWorldAfterDelete: ({commit}, world) => commit("setSelectedWorld", world)
};

export default {state, getters, mutations, actions};