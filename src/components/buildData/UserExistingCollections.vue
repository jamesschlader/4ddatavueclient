<template>
  <div>
    <h3>Existing Collections for {{user.username}}</h3>
    <div class="collection-container" v-if="this.getCollectionsForUser(user.username).length > 0">
      <div v-for="collection in this.getCollectionsForUser(user.username)"
           class="collection-card"
           v-on:click="editCollection(collection)"
      >
        <h4>{{collection.name}}</h4>
        <p>{{collection.description}}</p>
      </div>
    </div>
    <div class="collection-container" v-else>
      <h4>No collections to display</h4>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "UserExistingCollections",
        props: ["user"],
        data() {
            return {};
        },
        methods: {
            ...mapActions(["fetchCollectionsForUser"]),
            editCollection(collection) {
                this.$emit('advance-step', collection);
            }
        },
        computed: {
            ...mapGetters(["getCollectionsForUser"])
        },
        created() {
            this.fetchCollectionsForUser();
        }
    };
</script>

<style scoped lang="scss">
  .collection-container {
    display: flex;
    justify-content: center;
  }

  .collection-target {
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }

  .collection-card {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    border: solid black 1px;
    width: 25%;
    margin: 10px;

    &:hover {
      box-shadow: #911d89 5px 5px;
      cursor: pointer;
    }

  }
</style>