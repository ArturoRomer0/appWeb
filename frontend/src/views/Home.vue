<template>
  <div>
    <v-carousel
      dark
      progress
      height="auto"
      hide-delimiters
      progress-color="grey darken-3"
      :show-arrows="true"
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        eager
        :src="`${!showMenu ? item.image[0] : item.image[1]} `"
        :aspect-ratio="aspectRatio"
      >
        <v-sheet color="transparent px-4 shet" height="100%" tile>
          <v-row class="fill-height" align="end" justify="end">
            <v-btn text :to="item.url" plain>
              <span class="more">más información</span>
            </v-btn>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- <v-container> -->
      <SliderProducts :products="products.slice(0, 19)"></SliderProducts>

      <span
        class="d-flex justify-center text-center letters text-title-1 subtitle"
        >Categorias</span
      >
      <Flicking class="my-3" :options="{ moveType: 'freeScroll', bound: true }">
        <v-btn class="mr-5" color="darken-1">🎮 Juegos 🕹️</v-btn>
        <v-btn class="mr-5" color="darken-1">🦦 Jueguetes 🔫</v-btn>
        <v-btn class="mr-5" color="darken-1">🖱️ Accesorios ⌨️</v-btn>
        <v-btn class="mr-5" color="darken-1">💻 Computadoras 🖥️</v-btn>
      </Flicking>

      <SliderProducts :products="products.slice(20, 39)"></SliderProducts>

      <SliderProducts :products="products.slice(40, 59)"></SliderProducts>
      <span
        class="
          d-flex
          justify-center
          text-center
          letters
          text-title-1
          mb-4
          subtitle
        "
        >Estamos para ayudarte</span
      >
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card :elevation="hover ? 5 : 0" dark>
            <v-img
              src="https://wallpaperaccess.com/full/1282247.jpg"
              :aspect-ratio="aspectRatio"
              transition="fade-transition"
              gradient="to top right, rgba(81,91,212,.28) , rgba(129,52,175,.38), rgba(129,52,175,.38), rgba(221,42,123,.54),rgba(245,133,41,.70)"
            ></v-img>
            <div class="follow" color="secondary">
              Síguenos en nuestras redes sociales
              <div class="redes mt-5">
                <v-btn
                  icon
                  v-for="social in socialMedia"
                  :key="social.id"
                  class="mx-3"
                  :href="social.to"
                  target="_blank"
                >
                  <v-img max-width="30" :src="social.image"> </v-img>
                </v-btn>
              </div>
            </div>
          </v-card>
        </template>
      </v-hover>
      <SliderProducts :products="products.slice(60, 79)"></SliderProducts>
      <SliderProducts :products="products.slice(80, 99)"></SliderProducts>
    <!-- </v-container> -->
  </div>
</template>

<script>
const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
const opts = { format: "%s%v %c", code: "MEX", symbol: "$" };
const formatCurrency = require("format-currency");
var grouper = require("number-grouper");

import SliderProducts from "@/components/SliderProducts";
export default {
  components: {
    SliderProducts,
  },
  name: "Home",
  data: () => ({
    items: [
      {
        image: [
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Slider-6-Eris_Mobile_900x.png?v=1636670269",
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Eris-1920x584_1800x.png?v=1636670227",
        ],
        url: "https://www.omkara.com/",
      },
      {
        image: [
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/BANNER_MOBILE_MOUSE_720-x-1170_900x.png?v=1647288483",
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/BANNER_DESKTOP2_MOUSE_1920x584_e7a8fd45-c495-4df6-b57b-e051e7cfc5c2_1800x.png?v=1647288463",
        ],
        url: "https://www.tarvos.com/",
      },

      {
        image: [
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Slider-3-Omkara_900x.png?v=1636663944",
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Omkara-1920x584_1800x.png?v=1636063423",
        ],
        url: "https://www.omkara.com/",
      },
      {
        image: [
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Slider-7-Tarvos_900x.png?v=1637005487",
          "https://cdn.shopify.com/s/files/1/0478/3702/0322/files/Tarvos-1920x584_1800x.png?v=1637005429",
        ],
        url: "https://www.eris.com/",
      }
    ],
    socialMedia: [
      {
        to: "https://www.facebook.com",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      },
      {
        to: "https://www.youtube.com",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      },
      {
        to: "https://twitter.com",
        image:
          "https://upload.wikimedia.org/wikipedia/sco/9/9f/Twitter_bird_logo_2012.svg",
      },
      {
        to: "https://www.instagram.com",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg",
      },
    ],
    products: [],
    toggleMenu: false,
  }),
  created() {
    this.getProducts();
  },
  // VUE_APP_API_URL + product.images
  methods: {
    async getProducts() {
      const response = await this.axios.get("/api/products?limit=99");
      this.products = response.data.map((product) => {
        return {
          name: product.name,
          description: product.description,
          price: formatCurrency(product.salePrice, opts),
          images: product.images.map((image) => VUE_APP_API_URL + image),
          show: false,
          marca: product.marca,
          rating: {
            value: 4,
            count: grouper(151541),
          },
          id: product._id,
        };
      });
      console.log(this.products);
    },
  },
  computed: {
    aspectRatio() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "0.61";
        case "sm":
          return "1.5";
        case "md":
          return "2.3";
        case "lg":
          return "2.9";
        case "xl":
          return "3.2";
        default:
          return "1.5";
      }
    },
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp;
    },
  },
};
</script>

<style scoped>
.more {
  font-size: 12px;
  color: #00ff2c;
}
.follow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  z-index: 1;
}
.redes {
  display: flex;
  justify-content: center;
  align-items: center;
}
.subtitle {
  font-size: 1.4rem;
}
</style>

