<template>
  <div>
    <h1>Build Application</h1>
    <BuildDataCollection
        v-show="this.step === 'collection'"
        v-on:advance-step="onAdvanceStep"
        v-on:save-collection-name="saveCollectionName"
    ></BuildDataCollection>
    <div>
      <BuildDataDataSetTableCard v-show="collection.dataSets.length > 0" v-bind:collection="this.collection"/>
      <BuildDataSet
          v-show="this.step === 'dataset'"
          v-on:advance-step="onAdvanceStep"
          v-on:update-collection="updateCollection"
          v-bind:collection="this.collection"
          v-bind:fields="this.collection.dataSets"
      ></BuildDataSet>
    </div>
  </div>
</template>

<script>
    import BuildDataSet from "@/components/buildData/BuildDataSet";
    import BuildDataCollection from "@/components/buildData/BuildDataCollection";
    import BuildDataDataSetTableCard from "@/components/buildData/BuildDataDataSetTableCard";

    export default {
        name: "BuildApplication",
        components: {BuildDataDataSetTableCard, BuildDataCollection, BuildDataSet},
        data: function () {
            return {
                step: "collection",
                collection: {
                    collectionName: "",
                    dataSets: [{fields: []}]
                }
            };
        },
        methods: {
            onAdvanceStep(step) {
                this.collection.collectionName = step.collectionName;
                if (!this.collection.dataSets.map(set => set.title).includes(step.dataSet.title)) {
                    this.collection.dataSets = [...this.collection.dataSets, step.dataSet];
                }
                this.step = step.nextStep;
                this.collection.collectionName = step.collectionName;
                this.collection.dataSets.forEach(set => console.log(`new data sets array: `, set));
            },
            saveCollectionName(name) {
                this.collection.collectionName = name;
            },
            updateCollection(data) {
                console.log(`data to update: `, data);
                this.collection.dataSets.forEach(set => console.log(`new data sets array: `, set));
            }
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
        width: 90%
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

  .dataset-card {
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

  .dataset-card-display {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>