<template>
  <div>
    <h3>Existing Collections for {{user.username}}</h3>
    <div v-for="collection in getCollectionsForUser(user.username)">
      <p>Name: {{collection.name}}</p>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "UserExistingCollections",
        props: ["user"],
        data() {
            return {
                collections: {}
            };
        },
        methods: {
            ...mapActions(["setCollections"])
        },
        computed: {
            ...mapGetters(["getCollectionsForUser"])
        },
        created() {
            this.setCollections();
            console.log(`CREATED in user existing collections, here's the user's collections: `,
                this.getCollectionsForUser(this.user.username));
        },
        updated() {
            console.log(`UPDATED in user existing collections, here's the user's collections: `,
                this.getCollectionsForUser(this.user.username));
        }
    };
</script>

<style scoped>

</style>