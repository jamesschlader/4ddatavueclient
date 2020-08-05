<template>
  <div>
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
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BuildDataSet from "@/components/buildData/BuildDataSet";
    import BuildDataCollection from "@/components/buildData/BuildDataCollection";
    import BuildDataDataSetTableCard from "@/components/buildData/BuildDataDataSetTableCard";

    export default {
        name: "BuildApplication",
        components: {BuildDataDataSetTableCard, BuildDataCollection, BuildDataSet},
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
  @import "../assets/css/_variables.scss";

  @mixin hover-effect {
    cursor: pointer;
    color: $green-lime;
    border: 1px solid $purple-font;
    background-color: $purple-font;
    box-shadow: $green-dark 5px 5px;
  }

  @mixin basic-facts {
    padding: .5rem;
    margin: 5px;
    height: 1rem;
    width: 150px;
    font-family: inherit;
  }

  .container {
    display: grid;
    place-items: center;

    td, th {
      vertical-align: top;
    }

    select {
      @include basic-facts;
      min-height: 2rem;
      height: 2.5rem;

      &[multiple] {
        height: 4rem
      }
    }

    .fourdd-title {
      width: 100%;
      margin: 0 0 20px;

      input {
        width: 80%
      }
    }

    .btn-large {
      height: 3rem;
      width: 100%;
      background-color: $green-lime;

      &:hover {
        @include hover-effect;
        color: $green-lime
      }
    }

    .btn-small {
      width: 150px;
      height: auto;
    }

    .drive-left {
      margin: 2rem;
      justify-self: left;
    }

    .show-columns {
      display: flex;
      flex-direction: column;
    }
  }

  .secondary-color {
    color: $purple-font
  }

  input {
    @include basic-facts
  }

  button {
    @include basic-facts;
    font-size: 1rem;
    height: auto;
    width: auto;

    &:hover {
      @include hover-effect;
      color: $green-lime
    }
  }

  .deleter {
    width: 50px;
    height: 1rem;
    padding: 1.25rem;

    &:hover {
      color: $purple-font;
      cursor: pointer
    }
  }

  .nodes-card {
    display: flex;
    flex-direction: column;
    height: auto;
    min-width: 300px;
    width: auto;
    margin: 5px auto;
    border: 1px solid $purple-font;
    border-radius: 5px;

    h3 {
      border-bottom: 1px solid $purple-font;
    }

    ul {
      list-style-type: none
    }
  }

  .nodes-card-display {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>