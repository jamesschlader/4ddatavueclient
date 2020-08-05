<template>
  <div>
    <h1>Gonna get some universes...</h1>
    <div>
      <ul>
        <li v-for="collection in getCollections">
          <p>{{collection.name}}</p>
          <p>{{collection.description}}</p>
          <div v-for="world in collection.worlds">
            <p>{{world.name}} - {{world.description}}</p>
            <div v-for="node in world.nodes">
              <p>{{node.XId}}, {{node.YId}} with strategy {{node.strategy}}</p>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "GetUniverses",
        methods: {
            ...mapActions(["setCollections"])
        },
        computed: {
            ...mapGetters(["getCollections"])
        },
        created() {
            this.setCollections();
        },
        data() {
            return {};
        }
    };
</script>

<style scoped>

</style>