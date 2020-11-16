<template>
  <div>
    <h1>My Collections</h1>
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
  methods: {
    ...mapActions(["fetchCollectionsForUser"]),
    editUniverse() {
      this.$router.push("/edituniverse");
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
  .card-container {
    margin: 10px;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    min-width: 20vw
  }

</style>