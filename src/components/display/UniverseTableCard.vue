<template>
  <div class="universe-card" v-on:click.prevent="editUniverse">
    <h3>{{universe.name}}</h3>
    <h5>{{universe.description}}</h5>
    <WorldTableCard v-for="world in universe.worlds" v-bind:world="world"/>
  </div>
</template>

<script>
    import WorldTableCard from "@/components/display/WorldTableCard";
    import {mapActions} from 'vuex';

    export default {
        name: "UniverseTableCard",
        props: ["universe"],
        components: {WorldTableCard},
        methods: {
            ...mapActions(["setSelectedCollection"]),
            editUniverse() {
                this.setSelectedCollection(this.universe);
                this.$emit('edit-universe');
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/css/_variables.scss";

  .universe-card {
    padding: 10px;
    border: 1px black solid;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      box-shadow: $purple-font 5px 5px;
    }
  }
</style>