<template>
  <div class="card-display">
    <div class="">
      <i class="fas fa-trash push-right" v-on:click.prevent="exposeDelete"></i>
    </div>
    <h4 class="clickable" v-on:click="editWorld(world)">{{ world.name }}</h4>
    <p class="clickable" v-on:click="editWorld(world)">{{ world.description }}</p>
  </div>
</template>

<script>
import NodeDisplay from "@/components/display/NodeDisplay";
import {mapActions} from 'vuex';

export default {
  name: "BuildDataDataSetTableCard",
  props: ["world"],
  components: {NodeDisplay},
  data() {
    return {
      editingNode: false,
      nodeToEdit: {}
    };
  },
  methods: {
    ...mapActions(["addNodeToWorld"]),
    editWorld(world) {
      this.$emit('edit-world', world);
    },
    editNode(node) {
      console.log(`Gonna edit node: ${node.name}`, this.world);
      this.nodeToEdit = node;
      console.log(`just before exposing the display node, here's this.nodeToEdit: `, this.nodeToEdit);
      this.editingNode = !this.editingNode;
    },
    addHeading() {
      console.log(`Gonna add a heading...`);
      console.log(`the world: `, this.world);
      const node = {
        nodeSpaceId: 0,
        worldId: this.world.worldId,
        xId: Math.max(...this.world.nodes.map(node => node.XId)) + 1,
        yId: 0
      };
      this.addNodeToWorld(node);
    },
    addNode() {
      console.log(`Gonna add a node...`);
    },
    exposeDelete() {
      this.$emit("expose-delete", this.world);
    }
  },
  computed: {
    headingNodes: function () {
      return this.world.nodes.filter(node => node.YId === 0);
    },
    bodyNodes: function () {
      return this.world.nodes.filter(node => node.YId !== 0);
    }
  },
  created() {
  },
  updated() {
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/_variables.scss";

.card-display {
  display: flex;
  flex-direction: column;
  padding: .3rem;
  border: 1px black solid;
  border-radius: 10px;
  margin: .5rem;

  * {
    padding: 5px
  }

  &:hover {
    box-shadow: $purple-font 5px 5px;
  }
}

table, th, td, tr {
  margin: 3px;
  border: 1px solid black;
  border-collapse: separate;
}

.clickable {

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
}

.add-heading {
  width: 100px;
  border: none;
}

.push-right {
  float: right;

  &:hover {
    cursor: pointer;
  }
}

</style>