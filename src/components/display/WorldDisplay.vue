<template>
  <div>
    <WorldTableCard v-bind:world="this.getSelectedWorld"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import WorldTableCard from "@/components/display/WorldTableCard";

export default {
  name: "WorldDisplay",
  components: {
    WorldTableCard
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