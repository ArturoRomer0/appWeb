<template>
  <div>
    <v-toolbar
      dark
      prominent
      extended
    >
      <v-btn icon class="ml-4 mt-4">
        <v-icon > fas fa-bars </v-icon>
      </v-btn>

      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="signOut">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    signOut(){
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
};
</script>

<style>
</style>