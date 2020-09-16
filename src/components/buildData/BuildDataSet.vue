<template>
  <div>
    <button v-on:click.prevent="goBack">Back to previous step</button>
    <div class="title-container">
      <h1>Collection: <span class="secondary-color">{{this.collection.name}}</span></h1>
      <button v-show="this.fields.length > 0" class="button-get-data">Make some data</button>
    </div>
    <h2>Build data set</h2>
    <div class="container">
      <WorldTableCard v-for="world in this.collection.worlds" v-bind:world="world" v-on:edit-world="editWorld"/>
      <form class="top-margin">
        <table>
          <caption>
            <div class="fourdd-title">
              <label for="world-name">Title:</label>
              <input type="text" id="world-name" v-model="world.name">
            </div>
            <div class="fourdd-title">
              <label for="world-description">Description:</label>
              <input type="text" id="world-description" v-model="world.description">
            </div>
          </caption>
          <tr v-for="(node, index) in world.nodes" v-bind:key="index">
            <div class="cluster">
              <div>
                <td>
                  <label for="name">Field: </label>
                  <input v-model="node.name" type="text" id="name" value="name">
                </td>

                <td>
                  <label for="description">Description:</label>
                  <input v-model="node.description" type="text" id="description">
                </td>

                <td>
                  <label for="data-type">Type:</label>
                  <select v-model="node.dataType" name="dataType" id="data-type">
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </td>
              </div>

              <div v-show="node.dataType === 'number'">
                <td>
                  <label for="strategy-selector">Strategy:</label>
                  <select v-model="node.strategy" name="strategy" id="strategy-selector">
                    <option disabled value="">Please select one</option>
                    <option value="input" selected>Input</option>
                    <option value="sum">Sum</option>
                    <option value="avg">Average</option>
                    <option value="max">Minimum</option>
                    <option value="min">Maximum</option>
                    <option value="product">Product</option>
                  </select>
                </td>

                <td v-show="node.strategy !== 'input'">
                  <label for="data-source">Based on:</label>
                  <select v-model="node.watchedSpaces" name="dataType" id="data-source" multiple>
                    <option disabled value="">Select data sources</option>
                    <option v-for="(item, index) in numberFields(fields)" v-bind:value="item"
                            v-bind:key="index">{{item.name}}
                    </option>
                  </select>
                </td>

                <td v-show="node.dataSource === 'product'">
                  <label for="power">Power:</label>
                  <input type="number" id="power" name="power" min="0" value="1">

                </td>
              </div>
            </div>

            <td v-show="node.name"><i class="fas fa-trash deleter" v-on:click="deleteRow(index)"></i></td>
          </tr>
          <button class="btn-small top-margin" v-on:click.prevent="addDataField">Add a field</button>
        </table>
        <div class="drive-left">
          <button v-on:click.prevent="submitDataTable" class="btn-large">{{this.message}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import WorldTableCard from "@/components/display/WorldTableCard";

    export default {
        name: "Buildnodes",
        components: {WorldTableCard},
        props: ["collection", "fields", "message"],
        data: function () {
            return {
                world: {
                    worldId: 0,
                    name: "",
                    description: "",
                    nodes: [{name: "", description: "", xId: 0, yId: 0, dataType: "", watchedSpaces: [], power: 1, strategy: "input"}]
                }
            };
        },
        methods: {
            submitDataTable() {
                console.log(`do we have a name for our node?`, this.world.nodes[0].name);
                if (this.world.nodes[0].name) {
                    this.world.nodes = this.world.nodes.map((node, index) => {
                        const {name, description, power, strategy, dataType, watchedSpaces} = node;
                        console.log(`watchedSpaces before save: `, watchedSpaces);
                        console.log(`dataType before save: ${dataType}`);
                        return {
                            name, description, power,
                            worldId: this.world.worldId,
                            nodeSpaceId: -1,
                            xId: index + 1,
                            yId: 1,
                            strategy,
                            dataType,
                            watchedSpaces
                        };
                    });
                } else {
                    console.log(`gonna change the nodes to blank`);
                    this.world.nodes = [];
                    console.log(`did I change the nodes to blank? `, this.world.nodes);
                }
                const updateObject = {
                    name: this.collection.name,
                    universeId: this.collection.universeId,
                    nextStep: "nodes",
                    world: {...this.world}
                };
                console.log(`here's the updateObject going up:`, updateObject);
                this.$emit('advance-step', updateObject);
                this.world.worldId = 0;
                this.world.name = "";
                this.world.description = "";
                this.world.nodes = [{name: "", description: "", dataType: "", watchedSpaces: [], strategy: "input"}];
            },
            addDataField() {
                this.world.nodes =
                    [...this.world.nodes,
                        {name: "", dataType: "", description: "", watchedSpaces: [], strategy: "input"}];
            },
            numberFields(prop) {
                const theseRows = this.world.nodes && this.world.nodes.filter(row => row.dataType === "number");
                const otherRows = prop.length > 0 ? prop.map(item => item.nodes).filter(node => node.length > 0).
                    flatMap(data => data.filter(field => field.dataType === "number")) : [];
                return [...theseRows, ...otherRows];
            },
            goBack() {
                const updateObject = {
                    nextStep: "start",
                };
                this.$emit('go-back', updateObject);
            },
            deleteRow(rowToRemove) {
                this.rows = this.rows.filter((row, index) => index !== rowToRemove);
                if (this.rows.length < 1) {
                    this.rows = [
                        {name: "", description: "", dataType: "", dataSource: [], strategy: "input"}
                    ];
                }
            },
            editWorld(world) {
                this.world = world;
                console.log(`just updated the world to edit an existing one. Here's the state: `, this.world);
            }
        },
        created() {
            console.log(`just created BuildDataSet, here's the collection: `, this.collection);
        },
        updated() {
            console.log(`updated BuildDataSet, here's the collection prop: `, this.collection);
        }
    };
</script>

<style scoped lang="scss">
  .cluster {
    padding: 1rem;
    border: 1px solid black;
  }

  .top-margin {
    margin-top: 20px;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .button-get-data {
    padding: 0 10px;
  }
</style>