<template>
  <div class="card-display">
    <h4>Name: {{name || 'No name'}}</h4>
    <p>Description: {{description}}</p>
    <p>xId: {{xId}}</p>
    <p>yId: {{yId}}</p>
    <p>Strategy: {{strategy}}</p>
    <p>Power: {{power}}</p>
    <p>DataType: {{dataType}}</p>
    <p>Listeners size: {{listeners.length}}</p>
    <p>Watched Spaces size: {{watchedSpaces.length}}</p>
  </div>
</template>

<script>
    export default {
        name: "NodeDisplay",
        props: ["node"],
        data() {
            return {
                name: "",
                description: "",
                xId: 0,
                yId: 0,
                nodeSpaceId: 0,
                strategy: "",
                power: 1,
                dataType: "",
                listeners: [],
                watchedSpaces: []
            };
        },
        created() {
            for (const property in this.node) {
                if (this.node.hasOwnProperty(property)) {
                    this[property] = this.node[property];
                }
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/css/_variables.scss";

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
</style>