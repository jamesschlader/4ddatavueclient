import launcher from "@/store/launcher";
import {createUniverse} from "@/store/mutations/UniverseMutations";
import {universes} from "@/store/queries/UniverseQueries";

const state = {
    collections: [{
        universeId: 0, name: "", description: "", worlds: [
            {
                worldId: 0, name: "", description: "", nodes: [{
                    xId: 0, yId: 0, name: "", description: "", strategy: "", power: 1, dataSources: [{name: ""}]
                }]
            }]
    }],
    ids: [1]
};

const getters = {
    getCollections: state => state.collections,
    getCollectionByName: state => name => state.collections.filter(collection => collection.name === name)[0],
    getCollectionById: state => id => state.collections.filter(collection => collection.universeId === id)[0],
};

const mutations = {
    setCollections: (state, collections) => state.collections = collections,
    addCollection: (state, collection) => state.collections.push(collection),
    addWorldToCollection: (state, payload) => {
        const targetCollection = state.collections.find(collection => collection.name === payload.name);
        targetCollection.worlds.push(payload.world);
    }
};

const actions = {
    setCollections: async ({commit}) => {
        const response = await launcher(universes);
        commit("setCollections", response.data.data.universes);
    },
    addCollection: async ({commit}, collection) => {
        const response = await launcher(createUniverse(collection));
        commit("addCollection", response.data.data.createUniverse);
    },
    addWorldToCollection: ({commit}, collection) => commit("addWorldToCollection", collection)
};

export default {state, getters, mutations, actions};