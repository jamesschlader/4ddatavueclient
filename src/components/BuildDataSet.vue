<template>
  <div>
    <button v-on:click.prevent="goBack">Back to previous step</button>
    <h1>Collection: <span class="secondary-color">{{this.collection.collectionName}}</span></h1>
    <h2>Build data set</h2>
    <div class="container">
      <form>
        <table>
          <caption class="fourdd-title">
            <label for="appName">Title:</label>
            <input type="text" id="appName" v-model="tableTitle">
          </caption>
          <tr v-for="(row, index) in rows" v-bind:key="index">
            <div class="cluster">
              <div>
                <td>
                  <label for="name">Field: </label>
                  <input v-model="row.name" type="text" id="name" value="name">
                </td>

                <td>
                  <label for="description">Description:</label>
                  <input v-model="row.description" type="text" id="description">
                </td>

                <td>
                  <label for="data-type">Type:</label>
                  <select v-model="row.dataType" name="dataType" id="data-type">
                    <option value="string">Text</option>
                    <option value="number">Number</option>
                  </select>
                </td>
              </div>

              <div v-show="row.dataType === 'number'">
                <td>
                  <label for="strategy-selector">Strategy:</label>
                  <select v-model="row.strategy" name="strategy" id="strategy-selector">
                    <option disabled value="">Please select one</option>
                    <option value="input" selected>Input</option>
                    <option value="sum">Sum</option>
                    <option value="avg">Average</option>
                    <option value="max">Minimum</option>
                    <option value="min">Maximum</option>
                    <option value="product">Product</option>
                  </select>
                </td>

                <td v-show="row.strategy !== 'input'">
                  <label for="data-source">Based on:</label>
                  <select v-model="row.dataSource" name="dataSource" id="data-source" multiple>
                    <option disabled value="">Select data sources</option>
                    <option v-for="(item, index) in numberFields(rows)" v-bind:value="item"
                            v-bind:key="index">{{item.name}}
                    </option>
                  </select>
                </td>

                <td v-show="row.dataSource === 'product'">
                  <label for="power">Power:</label>
                  <input type="number" id="power" name="power" min="1" value="1">

                </td>
              </div>
            </div>

            <td v-show="row.name"><i class="fas fa-trash deleter" v-on:click="deleteRow(index)"></i></td>
          </tr>
          <button class="btn-small" v-on:click.prevent="addDataField">Add a field</button>
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
        name: "BuildDataSet",
        props: ["collection"],
        data: function () {
            return {
                rows: [
                    {title: "", name: "", description: "", dataType: "", dataSource: [], strategy: "input"}
                ],
                tableTitle: "",
                updateInfo: {
                    collectionName: "",
                    nextStep: "collection",
                    dataSet: []
                }
            };
        },
        computed: {},
        methods: {
            submitDataTable() {
                this.rows.forEach(row => row.title = this.tableTitle);
                const updateObject = {
                    collectionName: this.collection.collectionName,
                    nextStep: "dataset",
                    dataSet: {
                        title: this.tableTitle,
                        fields: this.rows.filter(set => set.name)
                    }
                };
                this.$emit('advance-step', updateObject);
            },
            addDataField() {
                console.log(`here's the current rows: `, this.rows);
                this.rows =
                    [...this.rows, {name: "", dataType: "", description: "", dataSource: [], strategy: "input"}];
            },
            numberFields(rows) {
                return this.rows.filter(row => row.dataType === "number");
            },
            goBack() {
                this.updateInfo.collectionName = this.collection.collectionName;
                this.$emit('advance-step', this.updateInfo);
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

</style>