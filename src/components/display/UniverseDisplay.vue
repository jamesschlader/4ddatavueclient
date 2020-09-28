<template>
  <div class="universe-display-container">
    <h1>{{name}}</h1>
    <p>{{description}}</p>
    <WorldTableCard v-for="world in worlds" v-bind:world="world" v-on:edit-world="editWorld"></WorldTableCard>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import WorldTableCard from "@/components/display/WorldTableCard";

    export default {
        name: "UniverseDisplay",
        components: {WorldTableCard},
        data() {
            return {
                name: "",
                description: "",
                worlds: []
            };
        },
        computed: {
            ...mapGetters(["getSelectedCollection"])
        },
        methods: {
            ...mapActions(["setSelectedWorld"]),
            editWorld(world) {
                this.setSelectedWorld(world);
                this.$router.push("/editworld");
            }
        },
        created() {
            this.name = this.getSelectedCollection.name || "";
            this.description = this.getSelectedCollection.description || "";
            this.worlds = this.getSelectedCollection.worlds || [];
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/css/_variables.scss";

  .universe-display-container {
    margin: 2rem;
  }

</style>