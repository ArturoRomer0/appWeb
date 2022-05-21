<template>
  <v-system-bar
    color="#1A1A1A"
    height="35"
    v-show="showMenu"
    app
  >
    <v-spacer></v-spacer>
    <v-divider dark inset vertical></v-divider>
    <v-btn
      color="white"
      class="text-capitalize letters"
      to="/sing-in"
      plain
    >
      <v-icon small color="white" >fas fa-user</v-icon>
      Iniciar sesión / Registrar
    </v-btn>
    <v-divider dark vertical></v-divider>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-3" v-on:click="darkMode" icon v-bind="attrs" v-on="on">
          <v-icon small  color="white">
            {{ Mode == "false" ? "fas fa-moon" : "fas fa-sun" }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ Mode == "false" ? "Dark Mode" : "Light Mode" }}</span>
    </v-tooltip>
  </v-system-bar>
</template>

<script>
export default {
  name: "SystemBar",
  data: () => ({
    Mode: null,
    toggleMenu: false,
  }),
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      this.Mode = localStorage.getItem("dark_theme");
      // console.log(this.Mode);
    },
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    this.Mode = theme;
    // console.log(this.Mode);

    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ){
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
    else {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp;
    },
  },
};
</script>

<style scope>
.subtitle {
  font-size: 1.2em;
}
</style>