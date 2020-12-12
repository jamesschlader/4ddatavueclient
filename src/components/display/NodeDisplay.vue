<template>
  <div class="node-interface-container">
    <div class="value-display">
      <input
          type="text"
          v-model="node.value.stringValue"
          v-on:keyup.enter="startAddNewValueToNode"
          v-on:blur="addNewValueToNode(node)"
      />
      <p v-if="!this.showHistorySelect"><i class="fas fa-history" v-on:click.prevent="getHistory(node)"></i></p>
      <p v-else><i class="fas fa-times" v-on:click.prevent="closeHistory"></i></p>
      <p v-if="!this.showCalculator"><i class="fas fa-calculator" v-on:click.prevent="functionCreator(node)"></i></p>
      <p v-else><i class="fas fa-times" v-on:click.prevent="toggleFunctionCreator"></i></p>
      <div class="dropdown-content higher" v-if="this.showHistorySelect">
        <p v-for="value in getValues()">{{ value.stringValue }} at {{ prettyDate(value.createDate) }}</p>
      </div>
      <div class="dropdown-content" v-if="this.showCalculator">
        <CreateCalculator v-bind:node="node" v-on:add-value="addFunctionToNode"/>
      </div>
    </div>
  </div>

</template>

<script>
import EditTextField from "@/components/getData/EditTextField";
import CreateCalculator from "@/components/display/CreateCalculator";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "NodeDisplay",
  components: {EditTextField, CreateCalculator},
  props: ["node"],
  data() {
    return {
      XId: 0,
      YId: 0,
      nodeSpaceId: 0,
      strategy: "",
      power: 1,
      dataType: "",
      listeners: [],
      watchedSpaces: [],
      value: {stringValue: "", doubleValue: 0, createDate: "", nodeValueId: 0},
      values: [],
      editThis: "",
      multiple: 1,
      showHistorySelect: false,
      showCalculator: false,
      isActive: false
    };
  },
  computed: {
    ...mapGetters(["getValueHistoryLimit", "getValueHistoryByNode"])
  },
  methods: {
    ...mapActions(["addValueToNode", "getValueHistoryForNode"]),
    getValues() {
      return this.values.length > 0 ? this.values : [{stringValue: "Nothing to see here", createDate: Date.now()}];
    },
    prettyDate(dateString) {
      const date = new Date(dateString);
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    startAddNewValueToNode(event) {
      event.target.blur();
    },
    async addNewValueToNode(node) {
      const {stringValue, operator, power} = node.value;
      const nodeValueDTO = {
        nodeValueId: 0,
        nodeValueSpace: {nodeSpaceId: this.nodeSpaceId},
        value: stringValue,
        operator, power,
        nodeValuesSpacesToReduce: []
      };
      await this.addValueToNode(nodeValueDTO);
    },
    async addFunctionToNode(nodeValueDTO) {
      await this.addValueToNode(nodeValueDTO);
      this.toggleFunctionCreator();
    },
    async getHistory(node) {
      this.showCalculator = false;
      const getValuesDTO = {
        nodeId: node.nodeSpaceId,
        limit: this.getValueHistoryLimit * this.multiple
      };
      await this.getValueHistoryForNode(getValuesDTO);
      this.showHistory();
    },
    showHistory() {
      this.values = this.getValueHistoryByNode(this.node.nodeSpaceId);
      this.multiple = this.multiple++;
      this.showHistorySelect = true;
    },
    functionCreator(node) {
      this.toggleFunctionCreator();
    },
    closeHistory() {
      this.showHistorySelect = false;
    },
    toggleFunctionCreator() {
      this.closeHistory();
      this.showCalculator = !this.showCalculator;
    }
  },
  created() {
    for (const property in this.node) {
      if (this.node.hasOwnProperty(property)) {
        this[property] = this.node[property];
      }
    }
  },
  updated() {
    for (const property in this.node) {
      if (this.node.hasOwnProperty(property)) {
        this[property] = this.node[property];
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";

.value-display {
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 20vw;

  &:hover {
    cursor: pointer;
  }

  input, select {
    &:hover {
      cursor: pointer;
    }
  }

  select {
    width: 177px;

    option {
      width: 100%;
    }
  }

  p {
    width: 24px;
    margin: 0 4px;
    padding: 2px;

    &:hover {
      color: white;
      background-color: $purple-font;
    }
  }
}

.node-interface-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

  .dropdown-content {
    box-sizing: border-box;
    width: 177px;
    position: absolute;
    background-color: #fff;
    padding: 3px;
    border: 1px solid $purple-font;
    z-index: 10;

    p {
      width: 90%;
      font-size: .75rem;
    }

    &.higher {
      z-index: 11;
    }
  }
}

</style>