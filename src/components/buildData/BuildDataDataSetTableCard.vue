<template>
  <div class="nodes-card-display">The worlds should display here...
    <div v-for="world in collection.worlds" v-show="world.name" class="nodes-card">
      <table>
        <caption>World: {{world.name}} Owner: {{collection.user.username}}</caption>
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "BuildDataDataSetTableCard",
        props: ["collection"],
        created() {
            console.log(`CREATED build data card, here's the incoming collection: `, this.collection);
        },
        updated() {
            console.log(`UPDATED in the data card component, here's the incoming collection to display: `,
                this.collection);
        }
    };
</script>

<style scoped lang="scss">
  table, th, td {
    padding: 5px;
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    min-width: 60px;
    width: 150px
  }

</style>