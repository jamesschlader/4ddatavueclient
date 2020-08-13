<template>
  <div id="build-application">
    <h1>Build Application</h1>
    <BuildDataCollection
        v-show="this.step === 'collection'"
        v-on:advance-step="onAdvanceStep"
    ></BuildDataCollection>
    <div>
      <BuildDataDataSetTableCard v-show="this.showTables" v-bind:collection="this.collection"/>
      <BuildDataSet
          v-show="this.step === 'nodes' && !this.loading"
          v-on:advance-step="onAdvanceStep"
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

    export default {
        name: "BuildApplication",
        components: {BuildDataDataSetTableCard, BuildDataCollection, BuildDataSet, Loader},
        data: function () {
            return {
                showTables: false,
                loading: false,
                step: "collection",
                collection: {
                    name: "",
                    description: "",
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
            ...mapActions(["addWorldToCollection"]),
            async onAdvanceStep(step) {
                this.collection = this.getCollectionByName(step.name);
                if (step.world && step.world.name !== "" &&
                    !this.collection.worlds.map(world => world.name).includes(step.world.name)) {
                    this.loading = !this.loading;
                    await this.addWorldToCollection(step);
                    this.loading = !this.loading;
                }
                this.step = step.nextStep;
            }
        },
        computed: {
            ...mapGetters(["getCollectionByName"])
        },
        created() {
            this.showTables = this.getCollectionByName(this.collection.name).worlds && true;
        }
    };
</script>

<style lang="scss">
@import "../assets/css/baseStyle";
</style>