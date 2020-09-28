<template>
  <div>
    <h1>{{name}}</h1>
    <p>{{description}}</p>
    <div class="node-display-container">
      <NodeDisplay v-for="node in nodes" v-bind:node="node"></NodeDisplay>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import NodeDisplay from "@/components/display/NodeDisplay";

    export default {
        name: "WorldDisplay",
        components: {
            NodeDisplay
        },
        data() {
            return {
                name: "",
                description: "",
                nodes: []
            };
        },
        computed: {
            ...mapGetters(["getSelectedWorld"])
        },
        created() {
            this.name = this.getSelectedWorld.name || "";
            this.description = this.getSelectedWorld.description || "";
            this.nodes = this.getSelectedWorld.nodes || [];
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/css/_variables.scss";

  .node-display-container {
    display: flex;
    flex-direction: row;
  }

</style>