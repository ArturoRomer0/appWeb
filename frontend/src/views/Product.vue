<template>
  <div>
    <v-container>
      <!-- Buscaste {{ this.$route.params.id }} -->
      <v-row justify="center">
        <v-col cols="12" md="8" lg="5" class="">
          <v-card class="pa-0">
            <v-card-title class="d-flex justify-center">
              <v-img
                :src="product.images[position]"
                contain
                :aspect-ratio="aspectRatio"
                class="rounded"
              >
              </v-img>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              <v-img
                v-for="p in product.images"
                :key="p.id"
                :src="p"
                class="ma-6 rounded"
                @click="changeImage(p)"
                height="76"
                contain
                width="26"
              ></v-img>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-row class="letters">
            <v-col cols="12">
              <span class="letters">
                {{ product.name }}
              </span>
            </v-col>
            <v-col cols="12" >
              <div class="d-flex justify-start mb-1">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <span class="primary--text count">{{ grouper(4151551) }} </span
                >&nbsp; calificaciones
              </div>
              <v-divider class="mt-3"></v-divider>
            </v-col>
            <v-col cols="12">
              <span class="text-md-body-1">
                <strong>Precio:</strong> {{ formatCurrency(product.salePrice) }}
              </span>
            </v-col>
            <v-col cols="12">
              <!-- muestra lo colores -->
              <strong>Color:</strong>
              <v-chip
                light
                v-for="color in colores"
                :key="color.id"
                :color="color"
                class="ma-1"
              >
              </v-chip>
              <div class="leters">
                <strong>Marca:</strong> {{ product.marca }}
              </div>
            </v-col>
            <v-col>
              <strong>Descripción:</strong>
              <span class="text-md-body-1">
                {{ product.description }}
              </span>
            </v-col>
            <v-col cols="12">
              <strong>Plataforma:</strong>
              <span class="text-md-body-1">
                {{ product.plataform }}
              </span>
            </v-col>
            <v-col cols="12">
              <strong>Dimesiones (CM):</strong> <span class="text-md-body-1">{{ `largo: ${product.sizes.width} Alto: ${product.sizes.height} Ancho: ${product.sizes.depth} ` }}</span>
              <v-divider class="mt-3"></v-divider>
            </v-col>
            <!-- <v-col cols="12">

            </v-col> -->
            <v-col cols="12">
              <v-btn color="primary" class="mt-3" @click="addToCart(product)">
                Agregar al carrito
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{ product.name }} <br />
    {{ product.images }} <br />
    {{ product._id }} <br />
    {{ product.colors }} <br />
    {{ product.salePrice }} <br />
    {{ product.pucharsePrice }} <br />
    {{ product.description }} <br />
    {{ product.category }} <br />
    {{ product.sizes }} <br />
    {{ product.marca }} <br />
    {{ product.plataform }}<br />
    {{ product.materials }}<br /> -->

    <!-- <pre>
      {{ product }}
    </pre> -->
    <v-snackbar right top vertical v-model="snackbar.show">
      {{ snackbar.text }}
      <v-icon right> fas fa-cart-plus </v-icon>
      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar.show = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
var grouper = require("number-grouper");
const opts = { format: "%s%v %c", code: "MEX", symbol: "$" };
const formatCurrency = require("format-currency");

export default {
  data: () => ({
    product: {
      name: "",
      images: [],
      _id: "",
      colors: [],
      salePrice: "",
      pucharsePrice: "",
      description: "",
      category: "",
      sizes: [],
      marca: "",
      plataform: "",
      materials: [],
    },
    position: 0,
    colors: [
      {
        name: "Amarillo",
        color: "#FFC107",
      },
      {
        name: "Azul",
        color: "#2196F3",
      },
      {
        name: "Blanco",
        color: "#FFFFFF",
      },
      {
        name: "Gris",
        color: "#9E9E9E",
      },
      {
        name: "Morado",
        color: "#673AB7",
      },
      {
        name: "Naranja",
        color: "#FF9800",
      },
      {
        name: "Negro",
        color: "#000000",
      },
      {
        name: "Rojo",
        color: "#FF0000",
      },
      {
        name: "Verde",
        color: "#4CAF50",
      },
      {
        name: "Rosa",
        color: "#C25DFF",
      },
    ],
    snackbar: {
      show: false,
      text: "Producto agregado al carrito...",
    },
  }),
  created() {
    this.getProductsById();
  },
  methods: {
    async getProductsById() {
      const id = this.$route.params.id;
      const response = await this.axios.get("/api/products/" + id);
      if (response.data.status === true) {
        this.product = response.data;
        this.product.images = this.product.images.map(
          (image) => VUE_APP_API_URL + image
        );
        console.log(this.product);
      }
    },
    addToCart() {
      const prod = {
        _id: this.product._id,
        image: this.product.images[this.position],
        title: this.product.name,
        price: this.product.salePrice,
        cant: 1,
      };
      this.$store.dispatch("addShopCart", prod);
      this.snackbar.show = true;
    },

    changeImage(image) {
      this.product.images.forEach((p, i) => {
        if (p === image) {
          this.position = i;
        }
      });
    },
    formatCurrency(value) {
      return formatCurrency(value, opts);
    },
    grouper(value) {
      return grouper(value, opts);
    },
  },
  watch: {
    $route(to, from) {
      this.getProducts();
    },
  },
  computed: {
    aspectRatio() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "0.80";
        case "sm":
          return "1.5";
        case "md":
          return "2.3";
        case "lg":
          return "2.9";
        case "xl":
          return "1.2";
        default:
          return "1.3";
      }
    },
    colores() {
      let col = [];
      this.product.colors.forEach((color) => {
        this.colors.forEach((c) => {
          if (color === c.name) {
            col.push(c.color);
          }
        });
      });
      console.log(col);
      return col;
    },
  },
};
</script>

<style scoped>
.prev {
  cursor: pointer;
  border: #000000 solid 1.3px;
}
</style>

