<template>
  <div class="card-display">
    <p>{{ this.node.name }}</p>
    <h4 class="card-display-item">Name: {{name || 'No name'}} <span>
      <EditTextField v-if="editThis === 'name'" v-bind:field="this.name" v-bind:fieldName="'name'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('name')" v-else></i>
    </span></h4>
    <p class="card-display-item">Description: {{description}}<span>
      <EditTextField v-if="editThis === 'description'" v-bind:field="this.description" v-bind:fieldName="'description'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('description')" v-else></i>
    </span></p>
    <p class="card-display-item">xId: {{XId}}<span>
      <EditTextField v-if="editThis === 'XId'" v-bind:field="this.XId" v-bind:fieldName="'XId'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('XId')" v-else></i>
    </span></p>
    <p class="card-display-item">yId: {{YId}}<span>
      <EditTextField v-if="editThis === 'YId'" v-bind:field="this.YId" v-bind:fieldName="'YId'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('YId')" v-else></i>
    </span></p>
    <p class="card-display-item">Strategy: {{strategy}}<span>
      <EditTextField v-if="editThis === 'strategy'" v-bind:field="this.strategy" v-bind:fieldName="'strategy'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('strategy')" v-else></i>
    </span></p>
    <p class="card-display-item">Power: {{power}}<span>
      <EditTextField v-if="editThis === 'power'" v-bind:field="this.power" v-bind:fieldName="'power'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('power')" v-else></i>
    </span></p>
    <p class="card-display-item">DataType: {{dataType}}<span>
      <EditTextField v-if="editThis === 'dataType'" v-bind:field="this.dataType" v-bind:fieldName="'dataType'"
                     v-on:save-field="editField"/>
      <i class="fas fa-pencil-alt" v-on:click.prevent="editField('dataType')" v-else></i>
    </span></p>
    <p class="card-display-item">Listeners size: {{listeners.length}}</p>
    <p class="card-display-item">Watched Spaces size: {{watchedSpaces.length}}</p>
  </div>
</template>

<script>
import EditTextField from "@/components/getData/EditTextField";

export default {
  name: "NodeDisplay",
  components: {EditTextField},
  props: ["node"],
  data() {
    return {
      name: "",
      description: "",
      XId: 0,
      YId: 0,
      nodeSpaceId: 0,
                strategy: "",
                power: 1,
                dataType: "",
                listeners: [],
                watchedSpaces: [],
                editThis: ""
            };
        },
        methods: {
            editField(fieldName, editedField = "") {
                this.editThis = fieldName;
                if (editedField) {
                    this.editThis = null;
                  this[fieldName] = editedField;
                }
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
    padding: 10px;
    border: 1px black solid;
    border-radius: 10px;
    max-width: 20vw;
    margin: 5px;

    &:hover {
      cursor: pointer;
      box-shadow: $purple-font 5px 5px;
    }
  }

  .card-display-item {
    display: flex;
    justify-content: space-between;
    margin: 2px
  }
</style>