<template>
  <div>
    <div v-show="!loggingIn">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="username" name="username" id="username"
                 :class="{ 'is-invalid': submitted && !username }"/>
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" v-model="password" name="password"
                 :class="{ 'is-invalid': submitted && !password }"/>
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <div class="form-group">
          <button class="btn-small" :disabled="loggingIn">Login</button>
          <router-link to="/register" class="btn btn-link">Register</router-link>
        </div>
      </form>
    </div>
    <Loader v-if="loggingIn"></Loader>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import Loader from "@/components/Loader";

    export default {
        name: "Login",
        components: {Loader},
        data() {
            return {
                username: '',
                password: '',
                submitted: false,
                loggingIn: false
            };
        },
        computed: {
            ...mapState(["isAuthenticated"])
        },
        created() {
            // reset login status
            this.logout();
        },
        methods: {
            ...mapActions(["login", "logout"]),
            async handleSubmit(e) {
                this.submitted = true;
                const {username, password} = this;
                if (username && password) {
                    this.loggingIn = !this.loggingIn;
                    await this.login({username, password});
                    this.loggingIn = !this.loggingIn;
                    await this.$router.push("/buildanapp");
                }
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "../assets/css/baseStyle";
</style>