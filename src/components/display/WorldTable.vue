<template>
  <div class="worldTableContainer">
    <h3 class="cap">{{ world.name }}</h3>
    <p>{{ world.description }}</p>

    <div class="node-grid">
      <div
          class="node-row"
          v-for="row in rowDepth"
          v-bind:key="row.key">
        <div
            class="node-cell"
            v-for="column in columnLength"
            v-bind:key="column.key">
          <NodeDisplay
              v-bind:node="getNodeForCell(column.value, row.value)"
              v-bind:key="getNodeForCell(column.value, row.value).nodeSpaceId"/>
        </div>
        <button class="btn-tiny node-cell" v-on:click.prevent="addColumn"><i class="fas fa-plus"></i> Col
        </button>
      </div>
      <button class="btn-tiny node-cell add-row-button" v-on:click.prevent="addRow"><i class="fas fa-plus"></i>
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
  data() {
    return {
      willAddColumn: false,
      nodeToAddValue: {},
      newColumn: "",
      fieldsToEdit: []
    };
  },
  computed: {
    ...mapGetters(["getHeaderNodes", "getBodyNodes", "getSelectedWorld"]),
    columnLength: function () {
      const nodesToSort = [...this.world.nodes];
      const length = nodesToSort.sort((a, b) => this.sortDescending(a.XId, b.XId))[0].XId;
      const columns = [];
      for (let i = 0; i < length + 1; i++) {
        columns.push({key: i * Math.random(), value: i});
      }
      return columns;
    },
    rowDepth: function () {
      const nodesToSort = [...this.world.nodes];
      const length = nodesToSort.sort((a, b) => this.sortDescending(a.YId, b.YId))[0].YId;
      const rows = [];
      for (let i = 0; i < length + 1; i++) {
        rows.push({key: i * Math.random(), value: i});
      }
      return rows;
    }
  },
  methods: {
    ...mapActions(["fetchAllTheNodes", "addNodeToWorld", "addValueToNode", "deleteSomething", "addManyNodesToWorld"]),
    async addRow() {
      this.$emit("add-row");
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
  async created() {
  },
  async updated() {
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

  &:first-child {
    border-top: 1px solid black;
  }

  .node-cell {
    height: fit-content;
    min-width: 80px;
    margin: 0;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    button {
      width: auto
    }
  }
}
</style>