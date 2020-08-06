<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">
        <img src="./assets/d_icon_3d.svg" alt="3_d" class="nav-image">
      </router-link>
      <div class="nav-center">
        <h1>4D Data Visualization</h1>
      </div>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>

    </header>
    <main id="main">
      <aside id="sidebar">
        <SideBar/>
      </aside>
      <div id="router-view">
        <router-view/>
      </div>
    </main>
    <footer id="footer">
      footer
    </footer>
  </div>
</template>

<script>
    import SideBar from "@/components/SideBar";

    export default {
        components: {SideBar}
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

  #main {
    display: grid;
    grid-template-columns: minmax(150px, 15%) 1fr;
  }

  #sidebar {
    background-color: $grey-light;
  }

  #footer {
    background-color: $grey-dark;
    padding: 2rem;
    text-align: left;
    color: $green-lime;
  }

</style>
