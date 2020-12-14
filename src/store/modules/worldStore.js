import launcher from "@/store/launcher";
import {getAllNodesByWorldId, getValueHistoryForNode, getWorldById} from "@/store/queries/WorldQueries";
import {addManyNodesToWorld, addNodeToWorld, addValueToNode} from "@/store/mutations/worldMutations";
import {editWorld} from "@/store/mutations/UniverseMutations";

const state = {
    selectedWorld: {},
    VALUE_HISTORY_LIMIT: 25
};

const getters = {
    getSelectedWorld: state => state.selectedWorld,
    getHeaderNodes: state => {
        return state.selectedWorld.nodes.filter(node => node.YId === 0).sort((a, b) => a.XId - b.XId);
    },
    getBodyNodes: state => state.selectedWorld.nodes.filter(node => node.YId > 0).sort((a, b) => a.YId - b.YId),
    getValueHistoryLimit: state => state.VALUE_HISTORY_LIMIT,
    getValueHistoryByNode: state => nodeId => state.selectedWorld.nodes.find(node => node.nodeSpaceId === nodeId).values
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
    addValueToNode: (state, value) => {
        state.selectedWorld.nodes.find(
            node => node.nodeSpaceId === value.nodeValueSpace.nodeSpaceId).value = value;
    },
    getValueHistoryForNode: (state, updateValuesObj) => state.selectedWorld.nodes.find(
        node => node.nodeSpaceId === updateValuesObj.nodeSpaceId).values =
        updateValuesObj.values,
    worldById: (state, worldById) => state.selectedWorld = worldById

};

const actions = {
    setSelectedWorld: ({commit}, world) => commit("setSelectedWorld", world),
    addNodeToWorld: async ({commit, rootState}, addNodeToWorldObject) => {
        const response = await launcher(addNodeToWorld(addNodeToWorldObject), rootState.users.jwt);
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
    addValueToNode: async ({commit, dispatch, rootState}, nodeValueDTO) => {
        const response = await launcher(addValueToNode(nodeValueDTO), rootState.users.jwt);
        dispatch("fetchAllTheNodes");

    },
    getValueHistoryForNode: async ({commit, rootState}, getValuesDTO) => {
        const response = await launcher(getValueHistoryForNode(getValuesDTO), rootState.users.jwt);
        const updateValuesObj = {
            nodeSpaceId: getValuesDTO.nodeId,
            values: response.data.data.getValueHistoryForNode
        };
        commit("getValueHistoryForNode", updateValuesObj);
    },
    setWorldAfterDelete: ({commit}, world) => commit("setSelectedWorld", world),
    worldById: async ({commit, rootState}, worldId) => {
        const response = await launcher(getWorldById(worldId), rootState.users.jwt);
        console.log(`getting our world back from the db: `, response);
        commit("worldById", response.data.data.worldById);
    }
};

export default {state, getters, mutations, actions};