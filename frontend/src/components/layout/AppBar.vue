<template>
  <div>
    <!-- <v-app-bar
      max-height="65"
      class="app-bar-gradient hidden-xs-and-down"
      dark
      flat
    >
      <v-row align="center" justify="center">
        <v-col>
          <v-app-bar-title>
            <router-link class="letters white--text text-decoration-none" to="/"
              >StoreGames</router-link
            >
          </v-app-bar-title>
        </v-col>

        <v-col class="d-flex justify-center" v-if="showMenu">
          <v-btn color="white" text plain dark to="/">
            <span class="text-capitalize letters text-title"> Home </span>
          </v-btn>
          <v-menu
            :close-on-content-click="false"
            min-width="100vw"
            :open-on-hover="true"
            offset-y
            z-index="1000"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" plain text v-bind="attrs" v-on="on">
                <span class="text-capitalize letters text-title">
                  Products
                </span>
                <v-icon
                  small
                  :class="`${
                    attrs['aria-expanded'] == 'false' ? 'mb-auto' : 'mt-auto'
                  } ml-1`"
                >
                  {{
                    attrs["aria-expanded"] == "false"
                      ? "fas fa-sort-down"
                      : "fas fa-sort-up"
                  }}
                </v-icon>
              </v-btn>
            </template>
            <v-card
              height="383"
              tile
              color="#000F1E"
              dark
              class="opacity menu-text"
            >
            </v-card>
          </v-menu>

          <v-btn color="white" text plain dark to="/about">
            <span class="text-capitalize letters text-title"> About </span>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-menu
            :close-on-content-click="false"
            offset-y
            transition="scale-transition"
            origin="top right"
            min-width="100vw"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" icon v-bind="attrs" v-on="on">
                <v-icon>fas fa-search</v-icon>
              </v-btn>
            </template>

            <v-card
              height="233"
              dark
              tile
              class="
                opacity
                menu-search
                text-center text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4
              "
            >
              <v-row>
                <v-col class="mt-5">
                  <span class="letters">¿Qué estás buscando?</span>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="5">
                  <v-text-field
                    color="cyan darken"
                    class="letters"
                    placeholder="Empieza a escribir..."
                    loading
                    prepend-icon="fas fa-search"
                    autofocus
                    v-model="search"
                    @keyup.enter="toSearch"
                  ></v-text-field>
                  <v-btn @click="toSearch" color="secondary">
                    <span class="letters">Buscar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>

          <v-menu
            :close-on-content-click="false"
            transition="scale-transition"
            origin="top right"
            ref="cart"
            min-width="23.5vw"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-1" color="white" icon v-bind="attrs" v-on="on">
                <v-icon>fa fa-cart-plus</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-app-bar
                elevate-on-scroll
                scroll-target="#scrolling-techniques-7"
                class="text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h5"
              >
                <span class="letters primary--text">Carrito de compra</span>

                <v-spacer></v-spacer>

                <v-btn icon large color="red" @click="$refs.cart.save()">
                  <v-icon large>fas fa-times</v-icon>
                </v-btn>
              </v-app-bar>
              <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto"
                max-height="74vh"
              >
                <v-container>
                  <v-card
                    v-for="x in 5"
                    :key="x"
                    class="mx-auto"
                    max-width="344"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="text-overline mb-4">OVERLINE</div>
                        <v-list-item-title class="text-h5 mb-1">
                          Headline 5
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Greyhound divisely hello coldly
                          fonwderfully</v-list-item-subtitle
                        >
                      </v-list-item-content>

                      <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                      ></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn outlined rounded text> Button </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-container>
              </v-sheet>
              <v-card class="mx-1 mt-4 text-uppercase letters">
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title
                    class="text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h5"
                  >
                    <div class="letters">subtotal</div>
                  </v-list-item-title>
                  <v-divider></v-divider>
                  <span>$0</span>
                </v-list-item>
                <v-btn block color="primary"> Pagar Ahora </v-btn>
              </v-card>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
 -->
    <v-app-bar tile height="80" dark class="app-bar-gradient" app>
      <v-row justify="center" align="center" class="pa-0 mx-2">
        <v-col v-if="!showMenu" class="pa-0">
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon small class="text-white">fas fa-bars</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <router-link
            to="/"
            :class="`subtitle  letters lightgreen--text   ${
              !showMenu ? 'text-center' : ''
            }`"
          >
            StoreGames
          </router-link>
        </v-col>
        <v-col class="pa-0 d-flex justify-center" v-if="showMenu">
          <v-btn
            color="white"
            text
            plain
            dark
            to="/"
            class="text-capitalize letters subtitle"
          >
            Inicio
          </v-btn>
          <v-menu
            :close-on-content-click="false"
            min-width="100vw"
            :open-on-hover="true"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" plain text v-bind="attrs" v-on="on">
                <span class="text-capitalize letters subtitle">
                  Productos
                </span>
                <v-icon
                  small
                  :class="`${
                    attrs['aria-expanded'] == 'false' ? 'mb-auto' : 'mt-2'
                  } ml-1`"
                >
                  {{
                    attrs["aria-expanded"] == "false"
                      ? "fas fa-sort-down"
                      : "fas fa-sort-up"
                  }}
                </v-icon>
              </v-btn>
            </template>
            <v-card
              height="383"
              tile
              color="#000F1E"
              dark
              class="opacity menu-text mt-5"
            >
            </v-card>
          </v-menu>
          <v-btn color="white" text plain dark to="/about">
            <span class="text-capitalize letters subtitle">Acerca</span>
          </v-btn>
        </v-col>
        <v-col class="pa-0 d-flex justify-end">
          <v-menu
            ref="search"
            :close-on-content-click="false"
            min-width="100vw"
            offset-y
            v-if="showMenu"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" plain icon v-bind="attrs" v-on="on">
                <v-icon small> fas fa-search </v-icon>
              </v-btn>
            </template>
            <v-card
              height="233"
              tile
              dark
              class="opacity menu-text mt-7 text-center"
            >
              <v-row>
                <v-col class="mt-5">
                  <span class="letters text-title">¿Qué estás buscando?</span>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10" md="5">
                  <v-text-field
                    color="cyan darken"
                    class="letters"
                    placeholder="Empieza a escribir..."
                    loading
                    prepend-icon="fas fa-search"
                    autofocus
                    v-model="search"
                    @keyup.enter="toSearch"
                  ></v-text-field>
                  <v-btn @click="toSearch" color="secondary letters">
                    Buscar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
          <v-btn icon @click.stop="drawerCart = !drawerCart">
            <v-badge avatar color="" inline>
              <template v-slot:badge>
                <v-avatar>
                  {{ cart.length }}
                </v-avatar>
              </template>
              <v-icon small right> fas fa-shopping-cart </v-icon>
            </v-badge>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      color="app-bar-gradient"
      width="550"
      right
      app
      temporary
      v-model="drawerCart"
      touchless
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="d-flex justify-center align-center">
            <span class="subtitle letters white--text">Carrito de compras</span>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="drawerCart = !drawerCart">
              <v-icon color="white" small> fas fa-times </v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-divider class="mx-3 my-1"></v-divider>
        <v-row
          v-show="cart.length < 1"
          justify="center"
          align="end"
          class="mt-2"
          style="height: 50vh"
        >
          <v-col cols="12" class="d-flex justify-center">
            <v-icon size="5rem" class="car"> fas fa-cart-arrow-down </v-icon>
          </v-col>
          <v-col cols="12 letters subtitle text-center car"
            >Tu carrito está vacío
            <div class="mt-4 car">Explora nuestros productos</div>
          </v-col>
        </v-row>

        <v-list-item
          two-line
          dark
          v-for="product in cart"
          :key="product.id"
          class="my-2"
        >
          <v-list-item-avatar size="80" rounded>
            <v-img contain :src="product.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="product.title"></v-list-item-title>
            <v-list-item-subtitle
              v-text="format(product.price)"
              class="mt-2"
            ></v-list-item-subtitle>

            <v-list-item-action-text class="mt-2">
              <v-btn
                min-width="8"
                class="mx-1"
                outlined
                color="green"
                @click="$store.dispatch('lessShopCart', product._id)"
              >
                <v-icon color="" small> fas fa-minus </v-icon>
              </v-btn>
              <v-btn min-width="8" text plain class="white" color="black">
                {{ product.cant }}
              </v-btn>
              <v-btn
                min-width="8"
                class="mx-1"
                outlined
                color="green"
                @click="$store.dispatch('moreShopCart', product._id)"
              >
                <v-icon color="" small> fas fa-plus </v-icon>
              </v-btn>
            </v-list-item-action-text>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="$store.dispatch('deleteShopCart', product._id)">
              <v-icon color="error"> fas fa-trash </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pb-10" v-if="cart.length > 0">
          <v-divider></v-divider>

          <v-row class="mt-1">
            <v-col cols="12" class="d-flex justify-center">
              <span class="subtitle letters white--text text-success"
                >Subtotal</span
              >
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <span class="subtitle letters white--text">{{ subtotal }}</span>
            </v-col>
          </v-row>
          <div class="pt-2 pb-5 d-flex justify-center">
            <v-btn width="80%" @click="download" outlined color="green">
              Iniciar Compra
            </v-btn>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer
      color="app-bar-gradient"
      width="550"
      app
      temporary
      touchless
      v-model="drawer"
      v-if="!showMenu"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-title class="d-flex justify-center align-center">
            <span class="subtitle letters car">Bienvenido a StoreGames</span>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon color="white" small> fas fa-times </v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-divider class="my-1"></v-divider>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-btn @click="addOneProduct" > agrgar </v-btn> -->

    <!-- <v-snackbar right top vertical v-model="snackbar.show">
      {{ snackbar.text }}
      <v-icon right>
        fas fa-cart-plus
      </v-icon>
        <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar.show = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar> -->
  </div>
</template>
<script>
const opts = { format: "%s%v %c", code: "MEX", symbol: "$" };
const formatCurrency = require("format-currency");
import { jsPDF } from "jspdf";
export default {
  name: "AppBar",
  data: () => ({
    search: "",
    toggleMenu: false,
    drawerCart: false,
    drawer: false,
    // snackbar: {
    //   show: false,
    //   text: "Producto agregado al carrito...",
    // },
  }),
  methods: {
    toSearch() {
      if (this.search.length > 0) {
        const path = `/search/${this.search}`;
        if (this.$route.path !== path) this.$router.push(path);
        this.$refs.search.save();
        this.search = "";
      }
    },

    download() {
      const headers = this.createHeaders(["title", "price", "cant"]);
      var doc = new jsPDF("landscape");
      const data = this.cart.map((product) => {
        return {
          title: product.title,
          price: product.price.toString(),
          cant: product.cant.toString(),
        };
      });
      doc.table(40, 45, data, headers, {
        autoSize: true,
        headerBackgroundColor: "#99FFCC",
        headerTextColor: "FF66B2",
      });

      doc.text("StoreGames", 40, 40);
      let heighTable = (data.length + 2) * 21 + 50;
      const date = new Date();
      const nateNow =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      doc.text(`Fecha: ${nateNow}`, 470, 40);
      doc.text("Usuario: " + "Jose Arturo", 40, heighTable);
      doc.text("FORMA DE PAGO", 40, heighTable + 25);
      doc.text("__________________________", 40, heighTable + 28);
      doc.text("__________________________", 40, heighTable + 8);
      doc.text("Numero de referencia: " + "10203949282", 40, heighTable + 45);
      doc.text("Banco: " + "Sxntander ", 40, heighTable + 60);
      doc.text("Total a pagar: " + this.subtotal, 40, heighTable + 75);
      doc.save("cart.pdf");
    },
    createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 65,
          align: "center",
          padding: 0,
        });
      }
      return result;
    },
    // addOneProduct() {
    //   const prod = {
    //     _id: 1,
    //     image:
    //       "https://api-storegames.herokuapp.com/images/products/4c014845-a07f-4796-8192-159960622a03.webp",
    //     title: "Adaptador de Cable OTG Micro USB 2.0",
    //     price: 18.25,
    //     cant: 1,
    //   };
    //   this.$store.dispatch("addShopCart", prod);
    //   this.snackbar.show = true;
    // },
    format(value) {
      return formatCurrency(value, opts);
    },
  },

  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp;
    },
    cart() {
      return this.$store.state.shopCart;
    },
    subtotal() {
      let sub = this.$store.state.subTotal;
      return formatCurrency(sub, opts);
    },
  },
};
</script>

<style scoped>
.app-bar-gradient {
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, #1a1a1a 12.64%, #4f4f4f 173.99%);
}
.text-title {
  font-size: 1.4rem;
}
.opacity {
  opacity: 0.95;
}
.subtitle {
  font-size: 1.2em;
}
/* .v-navigation-drawer__content::-webkit-scrollbar {
  width: 8px;
  background: #353535;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background-color: rgba(133, 133, 133, 0.7);
  border-radius: 10px;
} */
.lightgreen--text {
  color: #00ff00;
  text-decoration: none;
}
.car {
  color: #767676;
}
</style>