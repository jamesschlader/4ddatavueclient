<template>
  <div class="dataset-card-display">
    <div v-for="set in collection.dataSets" v-show="set.title" class="dataset-card">
      <table>
        <caption>{{set.title}}</caption>
        <thead>
        <th v-for="(field, index) in set.fields" v-bind:key="index">{{field.name}}</th>
        </thead>
        <tbody>
        <td v-for="(field, index) in set.fields" v-bind:key="index">{{field.dataType}}: {{field.strategy}}
          {{field.dataSource && field.dataSource.length > 0 ? `-> watches: ${field.dataSource.map(source=>source.name)}`
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
        props: ["collection"]
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