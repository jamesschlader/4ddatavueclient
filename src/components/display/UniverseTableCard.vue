<template>
  <div class="universe-card">
    <div class="trash-can">
      <i class="fas fa-trash push-right" v-on:click.prevent="handleDeleteDiv('universe', universe)"></i>
    </div>
    <div class="field-pair">
      <h3>{{ universe.name }} </h3>
      <EditTextField
          v-if="fieldToEdit === 'name'"
          v-on:save-field="saveField"
          v-bind:field="universe.name"
          v-bind:field-name="'name'"
      />
      <i class="fas fa-pencil-alt clickable" v-on:click.prevent="editField('name')" v-else></i>
    </div>
    <div class="field-pair">
      <h5>{{ universe.description }}</h5>
      <EditTextField
          v-if="fieldToEdit === 'description'"
          v-on:save-field="saveField"
          v-bind:field="universe.description"
          v-bind:field-name="'description'"
      />
      <i class="fas fa-pencil-alt clickable" v-on:click.prevent="editField('description')" v-else></i>
    </div>

    <div v-if="this.showNewWorld">
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" v-model="worldName" placeholder="Name">
        <label for="description">Description</label>
        <input id="description" type="text" v-model="worldDescription" placeholder="Description">
        <label for="columns"># of Columns</label>
        <input id="columns" type="number" v-model="numberOfColumns" placeholder="Number of Columns" min="1">
        <label for="rows"># of Rows</label>
        <input id="rows" type="number" v-model="numberOfRows" placeholder="Number of Rows" min="1">
      </div>
      <button class="btn-small" v-on:click.prevent="saveNewWorld"><i class="fas fa-pencil-alt"></i>Add World</button>
      <button class="btn-small cancel" v-on:click.prevent="cancelNewWorld">Cancel</button>
    </div>
    <div v-else>
      <button class="btn-small" v-on:click.prevent="addWorld"><i class="fas fa-pencil-alt"></i>Add World</button>
    </div>
    <div class="world-container">
      <WorldTableCard v-for="world in universe.worlds" v-bind:world="world" v-bind:key="world.worldId"
                      v-on:edit-world="editWorld"
                      v-on:expose-delete="exposeDelete"/>
    </div>

    <div class="delete-box" v-if="isDelete">
      <p>Do you really want to delete the <span>{{ this.deleteType }}</span> <span>{{ this.deleteItem.name }}?</span>
      </p>
      <button class="btn-small" v-on:click.prevent="actualDelete">Yep</button>
      <button class="btn-small cancel" v-on:click.prevent="handleDeleteDiv">Cancel</button>
    </div>
  </div>
</template>

<script>
import WorldTableCard from "@/components/display/WorldTableCard";
import EditTextField from "@/components/getData/EditTextField";
import {mapActions} from 'vuex';

export default {
  name: "UniverseTableCard",
  props: ["universe"],
  components: {WorldTableCard, EditTextField},
  data() {
    return {
      fieldToEdit: "",
      worldName: "",
      worldDescription: "",
      showNewWorld: false,
      isDelete: false,
      deleteType: "",
      deleteItem: {},
      numberOfColumns: 1,
      numberOfRows: 1
    };
  },
  methods: {
    ...mapActions(["setSelectedCollection", "setSelectedWorld", "editUniverse", "createWorld", "deleteSomething",
      "createWorldWithNodes"]),
    editWorld(world) {
      this.setSelectedWorld(world);
      this.$router.push("/editworld");
    },
    addWorld() {
      this.showNewWorld = true;
    },
    cancelNewWorld() {
      this.showNewWorld = false;
    },
    async saveNewWorld() {
      const world = {
        name: this.worldName,
        description: this.worldDescription,
        universeId: this.universe.universeId
      };
      const nodes = [];
      for (let i = 0; i < this.numberOfColumns; i++) {
        for (let j = 0; j < this.numberOfRows; j++) {
          const newNode = {
            nodeSpaceId: 0,
            xId: i,
            yId: j
          };
          nodes.push(newNode);
        }
      }
      world.newNodes = nodes;
      await this.createWorld(world);
      this.showNewWorld = false;
    },
    editField(field) {
      this.fieldToEdit = field;
    },
    async saveField(fieldName, editedField) {
      const universeDTO = {
        universeId: this.universe.universeId,
        name: fieldName === "name" ? editedField : this.universe.name,
        description: fieldName === "description" ? editedField : this.universe.description
      };
      await this.editUniverse(universeDTO);
      this.fieldToEdit = "";
    },
    handleDeleteDiv(typeOfDelete, itemToDelete) {
      this.deleteType = typeOfDelete || "";
      this.deleteItem = itemToDelete || {};
      this.isDelete = !this.isDelete;
    },
    async actualDelete() {
      const deleteObj = {
        type: this.deleteType,
        item: this.deleteItem
      };
      await this.deleteSomething(deleteObj);
      this.handleDeleteDiv();
    },
    exposeDelete(world) {
      this.handleDeleteDiv("world", world);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";
@import "../../assets/css/_baseStyle.scss";

.universe-card {
  border: 1px black solid;
  border-radius: 10px;
  position: relative;
}

.clickable {
  &:hover {
    cursor: pointer;
  }
}

.field-pair {
  margin: 2px;
  display: flex;
  align-content: flex-start;
  align-items: center;
  justify-content: space-between;

  h1, h2, h3, h4, h5 {
    margin: 2px
  }

}

.trash-can {
  display: grid;
}

.world-container {
  display: flex;
  flex-direction: row;
}

.push-right {
  justify-self: right;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
}

.delete-box {
  position: absolute;
  border-radius: 10px;
  color: white;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 50%;
  background-color: rgba(64, 64, 64, .9);
}

</style>