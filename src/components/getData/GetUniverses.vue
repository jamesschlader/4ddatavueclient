<template>
  <div>
    <h1>My Collections</h1>
    <div v-if="this.showNewUniverse" class="">
      <div>
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="description" placeholder="Description">
      </div>
      <button class="btn-small" v-on:click.prevent="saveNewUniverse">Save</button>
      <button class="btn-small cancel" v-on:click.prevent="cancelNewUniverse">Cancel</button>
    </div>
    <button class="btn-small" v-on:click.prevent="addUniverse" v-else><i class="fas fa-pencil-alt"></i> Add Collection
    </button>
    <div class="card-container">
      <div v-for="collection in this.getCollectionsForUser(this.getUser.username)">
        <UniverseTableCard v-bind:universe="collection" v-on:edit-universe="editUniverse"></UniverseTableCard>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UniverseTableCard from "@/components/display/UniverseTableCard";

export default {
  name: "GetUniverses",
  components: {UniverseTableCard},
  data() {
    return {
      showNewUniverse: false,
      name: "",
      description: ""
    };
  },
  methods: {
    ...mapActions(["fetchCollectionsForUser", "addCollection"]),
    editUniverse() {
      this.$router.push("/edituniverse");
    },
    addUniverse() {
      this.showNewUniverse = true;
    },
    async saveNewUniverse() {
      const collection = {
        name: this.name,
        description: this.description
      };
      await this.addCollection(collection);
      this.showNewUniverse = false;
    },
    cancelNewUniverse() {
      this.showNewUniverse = false;
    }
  },
  computed: {
    ...mapGetters(["getCollectionsForUser", "getUser"])
  },
  created() {
    this.fetchCollectionsForUser();
  },
  updated() {
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_baseStyle.scss";
@import "../../assets/css/_variables.scss";

.card-container {
  margin: 5px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  min-width: 20vw
}

.purple {
  background-color: $purple-font;
}

</style>