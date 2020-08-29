import launcher from "@/store/launcher";
import {addNewWorldToExistingUniverse, createUniverse} from "@/store/mutations/UniverseMutations";
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
        console.log(`here's the name of the collection to get from the service: ${name}`);
        console.log(`here's all the collections: `, state.collections);
        const foundCollection = state.collections ? state.collections.find(collection => collection.name === name) : [];
        console.log(`foundCollection = `, foundCollection);
        return foundCollection;
    },
    getCollectionsForUser: state => username => state.collections.filter(
        collection => collection.user.username === username),
    getCollectionById: state => id => state.collections.filter(collection => collection.universeId === id)[0],
};

const mutations = {
    setCollections: (state, collections) => state.collections = collections,
    addCollection: (state, collection) => {
        console.log(`dude, I better have some collections: `, state);
        console.log(`here's the collection to add: `, collection);
        state.collections = state.collections ? [...state.collections, collection] : [collection];
    },
    addWorldToCollection: (state, payload) => {
        const targetCollection = state.collections.find(collection => collection.name === payload.name);
        if (targetCollection) {
            targetCollection.worlds =
                targetCollection.worlds ? [...targetCollection.worlds, payload.world] : [payload.world];
        }
        console.log(`added world to collection: `, payload, state.collections);
    },
    fetchCollectionsForUser: (state, payload) => {
        console.log(`incoming payload is: `, payload);
        if (payload.data) {
            state.collections = payload.data.getUniversesForUser;
        }
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
            universeId: state.collections.find(collection => collection.name === collection.name).universeId,
            name: world.name,
            description: world.description,
            worldId: world.worldId
        };
        const response = await launcher(addNewWorldToExistingUniverse(dto), rootState.users.jwt);
        console.log(`after trying to add new world to collection, here's the response from the server: `, response);
        commit("addWorldToCollection", response.data.data.addWorldToUniverse);
    },
    fetchCollectionsForUser: async ({commit, rootState}) => {
        const user = rootState.users.user;
        const response = await launcher(getUniversesForUser(user.username), rootState.users.jwt);
        commit("fetchCollectionsForUser", response);
    }
};

export default {state, getters, mutations, actions};