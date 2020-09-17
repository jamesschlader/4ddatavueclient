<template>
  <div class="card-display">
    <h5 class="clickable" v-on:click="editWorld(world)"><p>World: {{world.name}} - {{world.description}}</p>
    </h5>
    <table v-if="world.nodes && world.nodes.length > 0">
      <thead>
      <th v-for="(node, index) in world.nodes" v-bind:key="index">{{node.name}}</th>
      </thead>
      <tbody>
      <td v-for="(node, index) in world.nodes" v-bind:key="index">{{node.dataType}}: {{node.strategy}}
        {{node.dataSource && node.dataSource.length > 0 ? `-> watches: ${node.dataSource.map(source=>source.name)}`
        : ''}}
      </td>
      </tbody>
    </table>
    <table v-else>
      <caption class="clickable" v-on:dblclick="editWorld(world)">World: {{world.name}} - {{world.description}}
      </caption>
      <thead>
      <th>No Nodes</th>
      </thead>
    </table>
  </div>
</template>

<script>
    export default {
        name: "BuildDataDataSetTableCard",
        props: ["world"],
        methods: {
            editWorld(world) {
                this.$emit('edit-world', world);
            }
        },
        created() {
            console.log(`CREATED build data card, here's the incoming collection: `, this.world);
        },
        updated() {
            console.log(`UPDATED in the data card component, here's the incoming collection to display: `,
                this.world);
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/css/_variables.scss";
  table, th, td {
    padding: 5px;
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    min-width: 60px;
    width: 150px
  }

  .card-display {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px black solid;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      box-shadow: $purple-font 5px 5px;
    }
  }

  .clickable {
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

</style>