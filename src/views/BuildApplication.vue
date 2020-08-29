<template>
  <div id="build-application">
    <h1>Build Application</h1>
    <UserExistingCollections v-bind:user="getUser"/>
    <BuildDataCollection
        v-show="this.step === 'collection'"
        v-on:advance-step="onAddCollection"
    ></BuildDataCollection>
    <div>
      <BuildDataDataSetTableCard v-show="this.showTables" v-bind:collection="this.collection"/>
      <BuildDataSet
          v-show="this.step === 'nodes' && !this.loading"
          v-on:advance-step="onAddDataSet"
          v-bind:collection="this.collection"
          v-bind:fields="this.collection.worlds || []"
      ></BuildDataSet>
    </div>
    <Loader v-show="this.loading"/>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BuildDataSet from "@/components/buildData/BuildDataSet";
    import BuildDataCollection from "@/components/buildData/BuildDataCollection";
    import BuildDataDataSetTableCard from "@/components/buildData/BuildDataDataSetTableCard";
    import Loader from "@/components/Loader";
    import UserExistingCollections from "@/components/buildData/UserExistingCollections";

    export default {
        name: "BuildApplication",
        components: {BuildDataDataSetTableCard, BuildDataCollection, BuildDataSet, Loader, UserExistingCollections},
        data: function () {
            return {
                showTables: false,
                loading: false,
                step: "collection",
                collection: {
                    universeId: 0,
                    name: "",
                    description: "",
                    user: {username: ""},
                    worlds: [
                        {
                            name: "",
                            description: "",
                            nodes: [
                                {
                                    name: "",
                                    xId: 0,
                                    yId: 0,
                                    description: "",
                                    strategy: "",
                                    power: 0,
                                    dataType: "",
                                    dataSources: [{name: ""}]
                                }]
                        }
                    ]
                }
            };
        },
        methods: {
            ...mapActions(["addCollection", "addNewWorldToExistingCollection"]),
            async onAddCollection(updateInfo) {
                this.loading = !this.loading;
                await this.addCollection(updateInfo);
                this.collection = this.getCollectionByName(updateInfo.name);
                this.loading = !this.loading;
                this.step = updateInfo.nextStep;
            },
            async onAddDataSet(updateInfo) {
                const isExistingWorld = this.collection.worlds &&
                    this.collection.worlds.map(world => world.name).includes(updateInfo.world.name);
                console.log(`does a world exist with this name already? ${isExistingWorld}`);
                if (!isExistingWorld) {
                    this.loading = !this.loading;
                    await this.addNewWorldToExistingCollection(updateInfo);
                    this.loading = !this.loading;
                }
                this.step = updateInfo.nextStep;
            }
        },
        computed: {
            ...mapGetters(["getCollectionByName", "getUser"])
        },
        updated() {
            this.showTables = !!this.getCollectionByName(this.collection.name).worlds;
        }
    };
</script>

<style lang="scss">
  @import "../assets/css/baseStyle";
</style>