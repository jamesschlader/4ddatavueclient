<template>
  <div id="build-application">
    <h1>Build Application</h1>
    <UserExistingCollections v-bind:user="getUser" v-bind:collections="this.getCollectionsForUser(this.getUser)"
                             v-on:advance-step="editCollection"/>
    <button v-on:click.prevent="exposeAddCollection" v-show="this.step === 'start'" class="top-margin">Add a
      collection
    </button>
    <BuildDataCollection
        v-show="this.step === 'collection'"
        v-on:advance-step="onAddCollection"
    ></BuildDataCollection>
    <BuildDataSet
        v-show="this.step === 'nodes' && !this.loading"
        v-on:advance-step="onAddDataSet"
        v-on:go-back="goBack"
        v-bind:collection="this.collection"
        v-bind:fields="this.collection.worlds || []"
        v-bind:message="this.saveMessage"
    ></BuildDataSet>
    <Loader v-show="this.loading"/>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BuildDataSet from "@/components/buildData/BuildDataSet";
    import BuildDataCollection from "@/components/buildData/BuildDataCollection";
    import Loader from "@/components/Loader";
    import UserExistingCollections from "@/components/buildData/UserExistingCollections";

    export default {
        name: "BuildApplication",
        components: {BuildDataCollection, BuildDataSet, Loader, UserExistingCollections},
        data: function () {
            return {
                showTables: false,
                loading: false,
                step: "start",
                saveMessage: "",
                collections: [],
                collection: {
                    universeId: 0,
                    name: "",
                    description: "",
                    user: {username: ""},
                    worlds: [
                        {
                            name: "",
                            worldId: 0,
                            description: "",
                            nodes: [
                                {
                                    name: "",
                                    xId: 0,
                                    yId: 0,
                                    description: "",
                                    strategy: "",
                                    power: 1,
                                    dataType: "",
                                    watchedSpaces: [{name: ""}]
                                }]
                        }
                    ]
                }
            };
        },
        methods: {
            ...mapActions(["addCollection", "addNewWorldToExistingCollection", "editWorld", "fetchCollectionsForUser"]),
            async onAddCollection(updateInfo) {
                this.loading = !this.loading;
                await this.addCollection(updateInfo);
                this.collection = this.getCollectionByName(updateInfo.name)[0];
                console.log(`did I set the new collection to be the active collection? `, this.collection);
                this.saveMessage = "Create new data set";
                this.step = updateInfo.nextStep;
                this.loading = !this.loading;
            },
            async onAddDataSet(updateInfo) {
                console.log(`here's the whole collection in the component state: `, this.collection);
                console.log(`here's the user's collection from the store: `,
                    this.getCollectionsForUser(this.getUser.username));
                console.log(`the worlds for the current collection: `, this.collection.worlds);
                const worldIdsList = this.collection.worlds.map(world => world.worldId);
                console.log(`here's the worldIdsList:`, worldIdsList);
                console.log(`here's what we're searching for: ${updateInfo.world.worldId}`);
                const isExistingWorld = worldIdsList.includes(parseInt(updateInfo.world.worldId));
                console.log(`does a world exist with this name already? ${isExistingWorld}`);
                if (isExistingWorld) {
                    const {universeId} = updateInfo;
                    const {worldId, name, description, nodes} = updateInfo.world;
                    const worldUpdate = {
                        worldId, name, description, nodes, universeId
                    };
                    this.loading = !this.loading;
                    await this.editWorld(worldUpdate);
                    this.loading = !this.loading;
                } else {
                    console.log(`gonna try to add a new world to the collection: `, updateInfo);
                    this.loading = !this.loading;
                    await this.addNewWorldToExistingCollection(updateInfo);
                    this.loading = !this.loading;
                }
                this.step = updateInfo.nextStep;
            },
            editCollection(collection) {
                this.collection = collection;
                console.log(`gonna edit collection: `, this.collection);
                this.step = "nodes";
                this.saveMessage = "Save Collection";
            },
            goBack(updateObject) {
                this.step = updateObject.nextStep;
            },
            exposeAddCollection() {
                this.step = "collection";
            }
        },
        computed: {
            ...mapGetters(["getCollectionByName", "getUser", "getCollectionsForUser"])
        },
        updated() {
            this.showTables = !!this.getCollectionByName(this.collection.name).worlds;
            this.collections = this.getCollectionsForUser(this.getUser.username);
            console.log(`UPDATING collection in BuildApplication: `, this.collections);
        }
    };
</script>

<style lang="scss">
  @import "../assets/css/baseStyle";

  .top-margin {
    margin-top: 10px;
  }
</style>