<template>
  <div class="universe-card">
    <h3>{{universe.name}}</h3>
    <h5>{{universe.description}}</h5>
    <WorldTableCard v-for="world in universe.worlds" v-bind:world="world"/>
  </div>
</template>

<script>
    import WorldTableCard from "@/components/display/WorldTableCard";

    export default {
        name: "UniverseTableCard",
        props: ["universe"],
        components: {WorldTableCard}
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