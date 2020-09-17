import gql from "graphql-tag";
<template>
  <div>
    <h2>Step One: Name your data collection</h2>
    <form>
      <label for="collection-name">Collection Name:</label>
      <input type="text" id="collection-name" v-model="updateInfo.name">
      <label for="collection-description">Description:</label>
      <input type="text" id="collection-description" v-model="updateInfo.description">
    </form>
    <button v-on:click.prevent="advanceStep">Move on to build data sets</button>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "BuildDataCollection",
        methods: {
            async advanceStep() {
                console.log(`in BuildDataCollection, here's the new collection info: `, this.updateInfo);
                this.$emit('advance-step', this.updateInfo);
            }
        },
        data: function () {
            return {
                loading: false,
                updateInfo: {
                    name: "",
                    description: "",
                    nextStep: "nodes",
                    world: {
                        name: ""
                    }
                }
            };
        },
        computed: {
            ...mapGetters(["getSelectedCollection"])
        },
        created() {
            this.updateInfo.name = this.getSelectedCollection.name || "";
            this.updateInfo.description = this.getSelectedCollection.description || "";
        }
    };
</script>

