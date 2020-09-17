<template>
  <div class="home">
    <Main/>
  </div>
</template>

<script>
    // @ is an alias to /src
    import Main from '@/views/Main.vue';

    export default {
        name: 'Home',
        components: {
            Main
        }
    };
</script>

<style>
  img {
    height: 300px;
    width: auto
  }
</style>
