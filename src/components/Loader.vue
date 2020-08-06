<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script>
    export default {
        name: "Loader"
    };
</script>

<style scoped lang="scss">
  @import "../assets/css/variables.scss";

  .loader {
    position: relative;
    margin: auto auto;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, .5);
  }

  .spinner {
    border: 16px solid $green-lime;
    border-top: 16px solid $purple-font;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>