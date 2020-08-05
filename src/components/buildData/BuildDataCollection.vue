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
    import {mapActions} from "vuex";

    export default {
        name: "BuildDataCollection",
        methods: {
            ...mapActions(["addCollection"]),
            async advanceStep() {
                const {name, description} = this.updateInfo;
                const newCollection = {
                    name, description, worlds: []
                };
                this.loading = !this.loading;
                await this.addCollection(newCollection);
                this.loading = !this.loading;
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
        }
    };
</script>

