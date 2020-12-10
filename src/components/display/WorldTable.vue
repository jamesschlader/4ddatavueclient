<template>
  <div class="worldTableContainer">
    <h3 class="cap">{{ world.name }}</h3>
    <p>{{ world.description }}</p>

    <div class="node-grid">
      <div class="node-row" v-for="row in rowDepth">
        <div class="node-cell" v-for="column in columnLength">
          <NodeDisplay v-bind:node="getNodeForCell(column - 1, row - 1)"/>
        </div>
        <button class="btn-small cancel node-cell"><i class="fas fa-plus"></i> Column</button>
      </div>
      <button class="btn-small cancel node-cell add-row-button" v-on:click.prevent="addRow"><i class="fas fa-plus"></i>
        Row
      </button>
    </div>

    <div class="delete-box" v-if="isDelete">
      <p>Do you really want to delete the <span>{{ this.deleteType }}</span> at <span>Row: {{ this.deleteItem.YId }}, Column: {{
          this.deleteItem.XId
        }}?</span>
      </p>
      <button class="btn-small" v-on:click.prevent="actualDelete">Yep</button>
      <button class="btn-small cancel" v-on:click.prevent="handleDeleteDiv">Cancel</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import EditTextField from "@/components/getData/EditTextField";
import NodeDisplay from "@/components/display/NodeDisplay";

export default {
  name: "WorldTable",
  props: ["world"],
  components: {EditTextField, NodeDisplay},
  computed: {
    ...mapGetters(["getHeaderNodes", "getBodyNodes", "getSelectedWorld"])
  },
  methods: {
    ...mapActions(["fetchAllTheNodes", "addNodeToWorld", "addValueToNode", "deleteSomething", "addManyNodesToWorld"]),
    async addRow() {
      console.log(`gonna add a row...`);
      // add a new node for each column
      const nodes = [];
      const lastX = this.bodyRows.sort((a, b) => this.sortDescending(a.YId, b.YId))[0];
      this.headerNodes.forEach((node, index) => {
        const nodeValueSpaceDTO = {
          nodeSpaceId: 0,
          xId: node.XId,
          yId: lastX + 1,
          worldId: this.world.worldId
        };
        nodes.push(nodeValueSpaceDTO);
      });
      await this.addManyNodesToWorld(nodes);
    },
    addColumn() {
      console.log(`gonna add a new column...`);
      this.willAddColumn = !this.willAddColumn;
    },
    async saveNewColumn() {
      console.log(`gonna make a new node with string value = ${this.newColumn}`);
      const nodeValueSpaceDTO = {
        nodeSpaceId: 0,
        xId: this.headerNodes.sort((a, b) => this.sortDescending(a.XId, b.XId))[0].XId + 1,
        yId: 0,
        worldId: this.world.worldId
      };
      await this.addNodeToWorld(nodeValueSpaceDTO);
      const newestNode = this.getSelectedWorld.nodes.sort((a, b) => this.sortDescending(a.XId, b.XId))[0];
      console.log(`gonna add value ${this.newColumn} to node: `, newestNode);
      const nodeValueDTO = {
        nodeValueId: 0,
        nodeValueSpace: newestNode,
        value: this.newColumn,
        power: 0,
        operator: "text"
      };
      await this.addValueToNode(nodeValueDTO);
      this.processRows();
      this.willAddColumn = !this.willAddColumn;
    },
    processRows() {
      this.headerNodes = [...this.getHeaderNodes];
      const sortedRows = this.getBodyNodes.map(node => node.YId).sort((a, b) => this.sortAscending(a, b));
      const ceiling = sortedRows[sortedRows.length - 1].YId;
      for (let i = 0; i < ceiling; i++) {
        this.bodyRows.set(i, this.getBodyNodes.filter(node => node.YId === i));
      }
    },
    sortDescending(a, b) {
      return b - a;
    },
    sortAscending(a, b) {
      return a - b;
    },
    openEditor(node) {
      this.fieldsToEdit.push(node);
    },
    closeEditor(target) {
      this.fieldsToEdit = this.fieldsToEdit.filter(node => node.nodeSpaceId !== target.nodeSpaceId);
    },
    showMyEditor(myId) {
      return this.fieldsToEdit.filter(node => node.nodeSpaceId === myId).length > 0;
    },
    deleteNode(node) {
      console.log(`here's the node to delete: `, node);
      this.exposeDelete(node);
      this.closeEditor(node);
    },
    handleDeleteDiv(typeOfDelete, itemToDelete) {
      this.deleteType = typeOfDelete || "";
      this.deleteItem = itemToDelete || {};
      this.isDelete = !this.isDelete;
    },
    async actualDelete() {
      this.deleteItem.worldId = this.world.worldId;
      console.log(`what is my deleteItem: `, this.deleteItem);
      const deleteObj = {
        type: this.deleteType,
        item: this.deleteItem
      };
      await this.deleteSomething(deleteObj);
      this.handleDeleteDiv();
    },
    exposeDelete(node) {
      this.handleDeleteDiv("node", node);
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
      headerNodes: [],
      bodyRows: new Map(),
      willAddColumn: false,
      nodeToAddValue: {},
      newColumn: "",
      fieldsToEdit: [],
      isDelete: false,
      columnLength: this.world.nodes.map(node => node.XId).sort((a, b) => this.sortDescending(a, b))[0] + 1,
      rowDepth: this.world.nodes.map(node => node.YId).sort((a, b) => this.sortDescending(a, b))[0] + 1
    };
  },
  async created() {
    await this.fetchAllTheNodes();
    this.processRows();
  },
  updated() {
    this.headerNodes = this.getHeaderNodes;
    this.bodyRows = this.getBodyNodes;
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

.delete-box {
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