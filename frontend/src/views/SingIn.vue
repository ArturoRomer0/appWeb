<template>
  <v-container>
    <v-row justify="center" class=" mt-sm-1">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="ma-0 pa-0">
        <v-card tile elevation="2">
          <v-row class="d-flex justify-center ma-0 pa-0">
            <v-col cols="3" sm="2" class="ma-0 pa-0 mt-4">
              <v-img
                src="https://i.pinimg.com/originals/98/d8/9a/98d89a233a2e1915d97df198e67fd38c.png"
                width="100%"
              ></v-img>
            </v-col>
          </v-row>
          <v-form @submit.prevent="login" v-model="valid">
            <h3 class="text-title-1 text-center letters pt-5">
              INICIO DE SESIÓN
            </h3>
            <v-divider class="mx-12 my-5"></v-divider>
            <v-card-text>
              <v-text-field
                v-model="credentials.email"
                label="Correo electrónico"
                type="email"
                outlined
                prepend-inner-icon="mdi-email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                v-model="credentials.password"
                label="Contraseña"
                type="password"
                outlined
                prepend-inner-icon="mdi-lock"
                :rules="rules.password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-center justify-md-space-around"
            >
              <!-- <v-btn plain class="text-caption">
                ¿Olvidaste tu contraseña?
              </v-btn> -->
              <v-btn
                color="primary"
                type="submit"
                :disabled="!valid"
                x-large
                class="text-capitalize white--text"
                elevation="0"
              >
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-form>
          <v-divider class="my-4"></v-divider>
          <v-card-text class="text-justify px-7">
            ¿No tienes una cuenta? Accede al seguimiento de tus pedidos, pago
            rápido, y mucho más
            <router-link to="/register">creando una cuenta</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar centered v-model="snackbar.show">
      {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar.show = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapState  } from "vuex";
export default {
  data: () => ({
    valid: false,
    credentials: {
      email: "",
      password: "",
    },
    snackbar: {
      text: "",
      show: false,
    },
    rules: {
      email: [
        (v) => !!v || "El correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
      ],
      password: [
        (v) => !!v || "La contraseña es requerida",
        (v) =>
          v.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
      ],
    },
  }),
  methods: {
    ...mapActions(["signin"]),
    async login() {
      if (this.valid === true) {
        const response = await this.signin(this.credentials);
        
        if (response !== true) {
          this.snackbar = {
            text: response.message,
            show: true,
          };
        }
        switch(this.role){
          case 'Admin':
            this.$router.push('/dashboard/products');
            break;
          case 'User':
            this.$router.push('/usuario');
            break;
          
        }

      }
    },
  },
  computed: {
    ...mapState(["role"]),
  },
 
};
</script>

<style scoped>
</style>