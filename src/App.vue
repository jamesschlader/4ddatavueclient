<template>
  <div id="app">
    <Header/>
    <main id="main">
      <div id="router-view">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        components: {Header}
    };

</script>

<style lang="scss">
  @import "./assets/css/_variables.scss";

  #router-view {
    position: relative;
  }

  #app {
    font-family: 'Titillium Web', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: large;
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr;
    text-align: center;
    color: $green-dark;
  }

</style>
