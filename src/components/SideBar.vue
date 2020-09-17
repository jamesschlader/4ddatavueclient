<template>
  <div>
    <h1>Collections</h1>
    <div>
      <router-link to="/getuseruniverses" class="link-text"><h4 class="clickable">My collections</h4></router-link>
      <router-link to="/buildanapp" class="link-text"><h4 class="clickable">Build a collection</h4></router-link>
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