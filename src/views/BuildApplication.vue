<template>
  <div>
    <h1>Build Application</h1>
    <BuildDataCollection
        v-show="this.step === 'collection'"
        v-on:advance-step="onAdvanceStep"
        v-on:save-collection-name="saveCollectionName"
    ></BuildDataCollection>
    <div>
      <div v-show="collection.dataSets.length > 0" class="dataset-card-display">
        <div v-for="set in collection.dataSets" v-show="set.title" class="dataset-card">
          <h3>{{set.title}}</h3>
          <ul v-for="data in set.fields">
            <li>{{data.name}}</li>
          </ul>
        </div>
      </div>
      <BuildDataSet
          v-show="this.step === 'dataset'"
          v-on:advance-step="onAdvanceStep"
          v-bind:collection="this.collection"
      ></BuildDataSet>
    </div>
  </div>
</template>

<script>
    import BuildDataSet from "@/components/BuildDataSet";
    import BuildDataCollection from "@/components/BuildDataCollection";

    export default {
        name: "BuildApplication",
        components: {BuildDataCollection, BuildDataSet},
        data: function () {
            return {
                step: "collection",
                collection: {
                    collectionName: "",
                    dataSets: []
                }
            };
        },
        methods: {
            onAdvanceStep(step) {
                console.log(`incoming dataset to save: `, step.dataSet);
                this.collection.collectionName = step.collectionName;
                console.log(`gonna try to print out current collection.dataSets...`);
                this.collection.dataSets.fields &&
                this.collection.dataSets.fields.forEach(set => console.log(set.name));
                console.log(`adding the incoming dataset to collection.dataSets...`);
                this.collection.dataSets = [...this.collection.dataSets, step.dataSet];
                this.step = step.nextStep;
                this.collection.collectionName = step.collectionName;
                this.collection.dataSets.fields &&
                this.collection.dataSets.fields.forEach(set => console.log(set.name));
                console.log(`the current collectionName is: ${this.collection.collectionName}`, this.collection);
            },
            saveCollectionName(name) {
                this.collection.collectionName = name;
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
    width: 150px;
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