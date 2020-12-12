<template>
  <div>
    <WorldTable v-bind:world="this.getSelectedWorld" v-on:add-row="addRow"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import WorldTable from "@/components/display/WorldTable";

export default {
  name: "WorldDisplay",
  components: {
    WorldTable
  },
  data() {
    return {
      worldId: 0,
      name: "",
      description: "",
      nodes: []
    };
  },
  computed: {
    ...mapGetters(["getSelectedWorld"])
  },
  methods: {
    ...mapActions(["addManyNodesToWorld"]),
    async addRow() {
      const lastRow = this.nodes.sort((a, b) => this.sortDescending(a.YId, b.YId))[0].YId;
      const nodeSpaceDTOs = this.nodes.filter(node => node.YId === 0).map((node, index) => {
        return {
          nodeSpaceId: 0,
          xId: index,
          yId: lastRow + 1,
          worldId: this.worldId
        };
      });
      await this.addManyNodesToWorld(nodeSpaceDTOs);
    },
    sortDescending(a, b) {
      return b - a;
    },
  },
  created() {
    this.worldId = this.getSelectedWorld.worldId || 0;
    this.name = this.getSelectedWorld.name || "";
    this.description = this.getSelectedWorld.description || "";
    this.nodes = this.getSelectedWorld.nodes || [];
  },
  updated() {
    this.worldId = this.getSelectedWorld.worldId || 0;
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