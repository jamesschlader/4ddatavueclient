<template>
  <div>
    <h2>Step One: Name your data collection</h2>
    <form action="" v-on:submit.prevent="saveCollectionName">
      <label for="collection-name">Collection Name:</label>
      <input type="text" id="collection-name" v-model="updateInfo.collectionName">
    </form>
    <button v-on:click.prevent="advanceStep">Move on to build data sets</button>
  </div>
</template>

<script>
    export default {
        name: "BuildDataCollection",
        methods: {
            advanceStep: function () {
                this.$emit('advance-step', this.updateInfo);
            }
        },
        data: function () {
            return {
                updateInfo: {
                    collectionName: "",
                    nextStep: "dataset",
                    dataSet: []
                }
            };
        }
    };
</script>

