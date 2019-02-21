<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        Nuxt Auth
      </h1>
      <h2 class="subtitle">
        My sick Nuxt.js project
      </h2>
      <div class="links">
        <!-- <nuxt-link to="/signin">Sign in</nuxt-link> -->
        <a-button v-if="!authenticated" plain block size="large" @click="submitSignin()">Sign In</a-button>
        <a-button v-if="authenticated" plain block size="large" href="/dashboard">Dashboard</a-button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'check-auth',
  components: {
    Logo
  },
  computed: {
    authenticated() {
      return this.$store.getters['auth/getStatus']
    },
  },
  methods: {
    submitSignin() {
      this.$store.dispatch('auth/showAuth')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
