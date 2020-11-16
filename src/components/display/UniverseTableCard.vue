<template>
  <div class="universe-card">
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
    <WorldTableCard v-for="world in universe.worlds" v-bind:world="world" v-on:edit-world="editWorld"/>
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
      fieldToEdit: ""
    };
  },
  methods: {
    ...mapActions(["setSelectedCollection", "setSelectedWorld", "editUniverse"]),
    editWorld(world) {
      this.setSelectedWorld(world);
      this.$router.push("/editworld");
    },
    editField(field) {
      this.fieldToEdit = field;
      console.log(`gonna edit the universe ${field}`);
    },
    async saveField(fieldName, editedField) {
      console.log(`gonna save the field: ${fieldName} to ${editedField}`);
      const universeDTO = {
        universeId: this.universe.universeId,
        name: fieldName === "name" ? editedField : this.universe.name,
        description: fieldName === "description" ? editedField : this.universe.description
      };
      await this.editUniverse(universeDTO);
      this.fieldToEdit = "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";

.universe-card {
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
  max-width: 25%;
}

.clickable {
  &:hover {
    cursor: pointer;
  }
}

.field-pair {
  display: flex;
  align-content: flex-start;
  align-items: center;
  justify-content: space-between;
}
</style>