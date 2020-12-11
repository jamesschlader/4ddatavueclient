<template>
  <div class="worldTableContainer">
    <h3 class="cap">{{ world.name }}</h3>
    <p>{{ world.description }}</p>

    <div class="node-grid">
      <div class="node-row" v-for="row in rowDepth">
        <div class="node-cell" v-for="column in columnLength">
          <NodeDisplay v-bind:node="getNodeForCell(column - 1, row - 1)"/>
        </div>
        <button class="btn-small cancel node-cell" v-on:click.prevent="addColumn"><i class="fas fa-plus"></i> Column
        </button>
      </div>
      <button class="btn-small cancel node-cell add-row-button" v-on:click.prevent="addRow"><i class="fas fa-plus"></i>
        Row
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import NodeDisplay from "@/components/display/NodeDisplay";

export default {
  name: "WorldTable",
  props: ["world"],
  components: {NodeDisplay},
  computed: {
    ...mapGetters(["getHeaderNodes", "getBodyNodes", "getSelectedWorld"])
  },
  methods: {
    ...mapActions(["fetchAllTheNodes", "addNodeToWorld", "addValueToNode", "deleteSomething", "addManyNodesToWorld"]),
    async addRow() {
      console.log(`gonna add a row...`);
      // add a new node for each column
    },
    async addColumn() {
      console.log(`gonna add a column...`);
    },
    sortDescending(a, b) {
      return b - a;
    },
    sortAscending(a, b) {
      return a - b;
    },
    getNodeForCell(x, y) {
      const target = this.world.nodes.filter(node => (node.XId === x && node.YId === y));
      const blankNode = {
        XId: 0,
        YId: 0,
        nodeSpaceId: 0,
        strategy: "",
        power: 1,
        dataType: "",
        listeners: [],
        watchedSpaces: [],
        value: {stringValue: "", doubleValue: 0, createDate: "", nodeValueId: 0}
      };
      if (target.length > 0 && target[0].value === null) {
        target.value = {stringValue: "", doubleValue: 0, createDate: "", nodeValueId: 0};
      }
      return target.length > 0 ? target[0] : blankNode;
    }
  },
  data() {
    return {
      willAddColumn: false,
      nodeToAddValue: {},
      newColumn: "",
      fieldsToEdit: [],
      columnLength: this.world.nodes.map(node => node.XId).sort((a, b) => this.sortDescending(a, b))[0] + 1,
      rowDepth: this.world.nodes.map(node => node.YId).sort((a, b) => this.sortDescending(a, b))[0] + 1
    };
  },
  async created() {
    await this.fetchAllTheNodes();
  },
  updated() {

  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";
@import "../../assets/css/_baseStyle.scss";

table, th, td, tr {
  margin: 5px;
  border: 1px black solid;
  min-width: 60px;
  border-collapse: collapse;

  span {
    height: 100%
  }
}

input {
  font-size: 1rem;
}

.cap {
  &:hover {

  }
}

.worldTableContainer {
  position: relative;
}

.clickable {
  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
}

.modal-box {
  position: absolute;
  border-radius: 10px;
  color: white;
  top: 5%;
  left: 5%;
  width: 90vw;
  height: 50vh;
  background-color: rgba(64, 64, 64, .9);
}

.node-grid {
  display: flex;
  flex-direction: column;
  align-items: center;

  .add-row-button {
    align-self: flex-start;
  }
}

.node-row {
  display: flex;
  flex-direction: row;
}

.node-cell {
  height: fit-content;
  min-width: 80px;
  margin: 0;
  padding: 5px;
  border: 1px solid black;
}

</style>