<template>
  <div>
    <h1>Applications</h1>
    <div>
      <router-link to="/about" class="link-text"><h4 class="clickable">Build an application</h4></router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SideBar"
    };
</script>

<style lang="scss" scoped>
  @import "../assets/css/_variables.scss";

  .link-text {
    text-decoration: none;
  }

  .clickable:hover {
    cursor: pointer;
    color: $purple-font;
  }
</style>