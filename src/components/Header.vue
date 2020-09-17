<template>
  <header id="nav">
    <router-link to="/">
      <img src="../assets/d_icon_3d.svg" alt="3_d" class="nav-image">
    </router-link>
    <div class="nav-center">
      <h1>4D Data Visualization</h1>
    </div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/collections">Collections</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li v-if="getUser.username">
        <router-link to="/profile">{{getUser.username}}</router-link>
      </li>
      <li v-else>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Header",
        computed: {
            ...mapGetters(["getUser"])
        }
    };
</script>

<style scoped lang="scss">
  @import "../assets/css/_variables.scss";

  #nav {
    text-align: left;
    background-color: $black-basic;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    color: $green-lime;

    a {
      font-weight: bold;
      color: $purple-font;
      text-decoration: none;

      &.router-link-exact-active {
        color: $green-lime;
      }
    }

    ul {
      text-decoration: none;
      margin: auto 40px;
    }

    li {
      display: inline-block;
      margin: 15px 30px;
    }

    .nav-image {
      height: auto;
      width: 100px;
      margin: 10px 35px 0
    }

    .nav-center {
      display: grid;
      place-items: center;
    }
  }
</style>