import launcher from "@/store/launcher";
import {addNewWorldToExistingUniverse, createUniverse, editWorld} from "@/store/mutations/UniverseMutations";
import {getUniversesForUser, universes} from "@/store/queries/UniverseQueries";

const state = {
    collections: [{
        universeId: 0, name: "", description: "", worlds: [
            {
                worldId: 0, name: "", description: "", nodes: [{
                    xId: 0, yId: 0, name: "", description: "", strategy: "", power: 1, dataSources: [{name: ""}]
                }]
            }], user: {username: ""}
    }],
    ids: [1]
};

const getters = {
    getCollections: state => state.collections,
    getCollectionByName: state => name => {
        const foundCollection = state.collections ? state.collections.filter(collection => collection.name === name) :
            [];
        return foundCollection;
    },
    getCollectionsForUser: state => username => state.collections.filter(
        collection => collection.user.username === username),
    getCollectionById: state => id => state.collections.filter(collection => collection.universeId === id)[0],
};

const mutations = {
    setCollections: (state, collections) => state.collections = collections,
    addCollection: (state, collection) => {
        state.collections = state.collections ? [...state.collections, collection] : [collection];
    },
    addWorldToCollection: (state, payload) => {
        console.log(`what's the payload?`, payload);
        const targetCollection = state.collections.find(collection => collection.name === payload.name);
        if (targetCollection) {
            targetCollection.worlds =
                targetCollection.worlds ? [...targetCollection.worlds, payload.world] : [payload.world];
        }
    },
    fetchCollectionsForUser: (state, payload) => {
        if (payload.data) {
            console.log(`payload.data: `, payload.data);
            state.collections = payload.data.data.getUniversesForUser;
        }
    },
    editWorld: (state, payload) => {
        console.log(`got me an edited world: `, payload);
    }
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
        const user = rootState.users.user;
        const response = await launcher(editWorld(world), user.jwt);
        commit("editWorld", response);
    }
};

export default {state, getters, mutations, actions};