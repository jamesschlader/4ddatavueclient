<template>
  <div class="calculator-container">
    <ul class="functions">
      <li v-on:click="selectMe" v-bind:class="{selected: functionSelection === 'Sum'}">Sum</li>
      <li v-on:click="selectMe" v-bind:class="{selected: functionSelection === 'Average'}">Average</li>
      <li v-on:click="selectMe" v-bind:class="{selected: functionSelection === 'Product'}">Product</li>
      <li v-on:click="selectMe" v-bind:class="{selected: functionSelection === 'Max'}">Max</li>
      <li v-on:click="selectMe" v-bind:class="{selected: functionSelection === 'Min'}">Min</li>
    </ul>
    <p>Function: {{ this.functionSelection }}</p>
    <select class="node-select" v-model="selected" multiple>
      <option
          v-for="node in this.getBodyNodes"
          v-bind:value="node.nodeSpaceId"
          v-bind:key="node.nodeSpaceId">row: {{ node.YId + 1 }}, column: {{ node.XId + 1 }}
      </option>
    </select>
    <p>Selected Nodes: {{ selectedNames }}</p>
    <button class="btn-small" v-on:click.prevent="addFunction"
            v-show="this.selected.length > 1 && this.functionSelection !== ''">Do it
    </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "CreateCalculator",
  props: ["node"],
  data() {
    return {
      functionSelection: "",
      selected: []
    };
  },
  computed: {
    ...mapGetters(["getBodyNodes"]),
    selectedNames() {
      return this.selected.map(node => `row: ${node.YId + 1}, column: ${node.XId + 1}`);
    }
  },
  methods: {
    selectMe(event) {
      this.functionSelection = event.target.innerText;
    },
    addFunction() {
      //emit add function to NodeDisplay
      console.log(`what's the node we're adding the function to?`, this.node);
      const nodeValueDTO = {
        nodeValueId: 0,
        nodeValueSpace: this.node,
        value: "",
        operator: this.functionSelection.toLowerCase(),
        power: "",
        nodeValuesSpacesToReduce: this.selected
      };
      this.$emit("add-value", nodeValueDTO);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";
@import "../../assets/css/_baseStyle.scss";

@mixin selected {
  font-size: larger;
  color: $purple-font
}

.calculator-container {
  font-size: .75rem;
  width: 177px;
  box-sizing: border-box;
}

.functions {
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  list-style: none;

  li {
    margin: 0 2px;

    &:hover {
      @include selected
    }
  }
}

.node-select {
  padding: 0 2px;
}

.selected {
  @include selected
}


</style>