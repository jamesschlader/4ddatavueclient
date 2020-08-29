<template>
  <div>
    <button v-on:click.prevent="goBack">Back to previous step</button>
    <h1>Collection: <span class="secondary-color">{{this.collection.name}}</span></h1>
    <h2>Build data set</h2>
    <div class="container">
      <form>
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
                    <option value="string">Text</option>
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
                  <select v-model="node.dataSource" name="dataSource" id="data-source" multiple>
                    <option disabled value="">Select data sources</option>
                    <option v-for="(item, index) in numberFields(fields)" v-bind:value="item"
                            v-bind:key="index">{{item.name}}
                    </option>
                  </select>
                </td>

                <td v-show="node.dataSource === 'product'">
                  <label for="power">Power:</label>
                  <input type="number" id="power" name="power" min="1" value="1">

                </td>
              </div>
            </div>

            <td v-show="node.name"><i class="fas fa-trash deleter" v-on:click="deleteRow(index)"></i></td>
          </tr>
          <button class="btn-small top-margin" v-on:click.prevent="addDataField">Add a field</button>
        </table>
        <div class="drive-left">
          <button v-on:click.prevent="submitDataTable" class="btn-large">Create Data Set</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Buildnodes",
        props: ["collection", "fields"],
        data: function () {
            return {
                world: {
                    name: "",
                    description: "",
                    nodes: [{name: "", description: "", dataType: "", dataSource: [], strategy: "input"}]
                }
            };
        },
        methods: {
            submitDataTable() {
                const updateObject = {
                    name: this.collection.name,
                    universeId: this.collection.universeId,
                    nextStep: "nodes",
                    world: {...this.world}
                };
                this.world.name = "";
                this.world.description = "";
                this.world.nodes = [{name: "", description: "", dataType: "", dataSource: [], strategy: "input"}];
                this.$emit('advance-step', updateObject);
            },
            addDataField() {
                this.world.nodes =
                    [...this.world.nodes, {name: "", dataType: "", description: "", dataSource: [], strategy: "input"}];
            },
            numberFields(prop) {
                console.log(`in numberField, here's the prop passed in: `, prop);
                const theseRows = this.world.nodes.filter(row => row.dataType === "number");
                const otherRows = prop.length > 0 ? prop.map(item => item.nodes).filter(node => node.length > 0).
                    flatMap(data => data.filter(field => field.dataType === "number")) : [];
                return [...theseRows, ...otherRows];
            },
            goBack() {
                const updateObject = {
                    nextStep: "collection",
                    name: this.collection.name,
                    world: {
                        name: this.collection.worlds[0].name
                    }
                };
                this.$emit('advance-step', updateObject);
            },
            deleteRow(rowToRemove) {
                this.rows = this.rows.filter((row, index) => index !== rowToRemove);
                if (this.rows.length < 1) {
                    this.rows = [
                        {name: "", description: "", dataType: "", dataSource: [], strategy: "input"}
                    ];
                }
            }
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
</style>