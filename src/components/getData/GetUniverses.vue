<template>
  <div>
    <h1>Gonna get some universes...</h1>
    <div>
      <ul>
        <li v-for="collection in this.getCollections">
          <BuildDataDataSetTableCard v-bind:collection="collection"></BuildDataDataSetTableCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import BuildDataDataSetTableCard from "@/components/buildData/BuildDataDataSetTableCard";

    export default {
        name: "GetUniverses",
        components: {BuildDataDataSetTableCard},
        methods: {
            ...mapActions(["setCollections"])
        },
        computed: {
            ...mapGetters(["getCollections"])
        },
        created() {
            this.setCollections();
            console.log(`inside get universes CREATED, here's the collections to get: `, this.getCollections);
        },
        updated() {
            console.log(`inside get universes UPDATED, here's the collections to get: `, this.getCollections);
        },
        data() {
            return {};
        }
    };
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
  }
</style>