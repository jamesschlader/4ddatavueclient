<template>
  <div id="collection-container">
    <aside id="sidebar">
      <SideBar></SideBar>
    </aside>
    <div id="collection-router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import SideBar from "@/components/SideBar.vue";

    export default {
        name: "Collections",
        components: {SideBar},
        created() {
            this.$router.push("/getuseruniverses");
        }
    };
</script>

<style scoped lang="scss">
  @import "../assets/css/_variables.scss";

  #collection-container {
    display: grid;
    grid-template-columns: minmax(150px, 15%) 1fr;
    min-height: 100vh
  }

  #sidebar {
    background-color: $grey-light;
  }
</style>