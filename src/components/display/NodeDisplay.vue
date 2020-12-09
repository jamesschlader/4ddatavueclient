<template>
  <div class="card-display">
    <input
        type="text"
        v-model="node.value.stringValue"
        v-on:keyup.enter="addNewValueToNode(node)"
        v-on:blur="addNewValueToNode(node)"
    />
  </div>
</template>

<script>
import EditTextField from "@/components/getData/EditTextField";
import {mapActions} from 'vuex';

export default {
  name: "NodeDisplay",
  components: {EditTextField},
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
      editThis: ""
    };
  },
  methods: {
    ...mapActions(["addValueToNode"]),
    editField(fieldName, editedField = "") {
      this.editThis = fieldName;
      if (editedField) {
        this.editThis = null;
        this[fieldName] = editedField;
      }
    },
    async addNewValueToNode(node) {
      console.log(`did we get the node in? `, node);
      console.log(`WTF? ${this.value ? this.value.stringValue : "ain't got not value"}`);
      const {stringValue, operator, power} = node.value;
      const nodeValueDTO = {
        nodeValueId: 0,
        nodeValueSpace: {nodeSpaceId: this.nodeSpaceId},
        value: stringValue,
        operator, power,
        nodeValuesSpacesToReduce: []
      };
      await this.addValueToNode(nodeValueDTO);
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

.card-display {
  display: flex;
  flex-direction: column;
  max-width: 20vw;

  &:hover {
    cursor: pointer;
    box-shadow: $purple-font 5px 5px;
  }

  input {
    &:hover {
      cursor: pointer;
    }
  }
}

.card-display-item {
  display: flex;
  justify-content: space-between;
  margin: 2px
}
</style>