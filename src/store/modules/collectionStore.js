import launcher from "@/store/launcher";
import {addNewWorldToExistingUniverse, createUniverse, editWorld} from "@/store/mutations/UniverseMutations";
import {getUniversesForUser, universes} from "@/store/queries/UniverseQueries";

const state = {
    collections: [{
        universeId: 0, name: "", description: "", worlds: [
            {
                worldId: 0, name: "", description: "", nodes: [{
                    xId: 0, yId: 0, name: "", description: "", strategy: "", dataType: "", power: 1, watchedSpaces: [{name: ""}]
                }]
            }], user: {username: ""}
    }],
    selectedCollection: {},
    ids: [1]
};

const getters = {
    getCollectionByName: state => name => {
        const foundCollection = state.collections ? state.collections.filter(collection => collection.name === name) :
            [];
        return foundCollection;
    },
    getCollectionsForUser: state => username => state.collections.filter(
        collection => collection.user.username === username),
    getSelectedCollection: state => state.selectedCollection
};

const mutations = {
    setCollections: (state, collections) => state.collections = collections,
    addCollection: (state, collection) => {
        state.collections = state.collections ? [...state.collections, collection] : [collection];
    },
    addWorldToCollection: (state, payload) => {
        console.log(`what's the payload?`, payload);
        const targetCollection = state.collections.find(collection => collection.name === payload.name);
        console.log(`here's the collection to update with the payload; `, targetCollection);
        if (targetCollection) {
            targetCollection.worlds =
                targetCollection.worlds ? [...targetCollection.worlds, payload.world] : [payload.world];
        }
        console.log(`Did the targetCollection save to teh state? `, state.collections);
    },
    fetchCollectionsForUser: (state, payload) => {
        if (payload.data) {
            console.log(`payload.data: `, payload.data);
            state.collections = payload.data.data.getUniversesForUser;
        }
    },
    editWorld: (state, payload) => {
        console.log(`got me an edited world: `, payload);
    },
    setSelectedCollection: (state, collection) => state.selectedCollection = collection
};

const actions = {
    setCollections: async ({commit, rootState}) => {
        const response = await launcher(universes, rootState.users.jwt);
        console.log(`returning from the server with collections: `, response.data.data.universes);
        commit("setCollections", response.data.data.universes);
    },
    addCollection: async ({commit, rootState}, collection) => {
        const {name, description} = collection;
        const {user} = rootState.users;
        const requestObject = {
            name, description, user,
            username: user.username
        };
        const response = await launcher(createUniverse(requestObject), rootState.users.jwt);
        commit("addCollection", response.data.data.createUniverse);
    },
    addNewWorldToExistingCollection: async ({commit, rootState}, collection) => {
        const {world} = collection;
        const dto = {
            universeId: collection.universeId,
            name: world.name,
            description: world.description,
            worldId: world.worldId,
            nodes: world.nodes
        };
        console.log(`do I have everything I need? `, dto);
        const response = await launcher(addNewWorldToExistingUniverse(dto), rootState.users.jwt);
        console.log(`after trying to add new world to collection, here's the response from the server: `, response);
        if (response.data.data) {
            commit("addWorldToCollection", response.data.data.addWorldToUniverse);
        } else {
            this.fetchCollectionsForUser();
        }
    },
    fetchCollectionsForUser: async ({commit, rootState}) => {
        const user = rootState.users.user;
        const response = await launcher(getUniversesForUser(user.username), rootState.users.jwt);
        commit("fetchCollectionsForUser", response);
    },
    editWorld: async ({commit, rootState}, world) => {
        const response = await launcher(editWorld(world), rootState.users.jwt);
        commit("editWorld", response);
    },
    setSelectedCollection: ({commit}, collection) => {
        commit("setSelectedCollection", collection);
    }
};

export default {state, getters, mutations, actions};