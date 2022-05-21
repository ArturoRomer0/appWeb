<template>
  <div>
    <h1>search</h1>
    Buscaste {{ this.$route.params.search }}

    <v-container fluid>
      <SliderProducts :products="products.slice(0, 6)"></SliderProducts>
      <SliderProducts :products="products.slice(6, 12)"></SliderProducts>
      <SliderProducts :products="products.slice(12, 18)"></SliderProducts>
      <SliderProducts :products="products.slice(18, 24)"></SliderProducts>
      <SliderProducts :products="products.slice(24, 30)"></SliderProducts>
      <SliderProducts :products="products.slice(30, 36)"></SliderProducts>
      <SliderProducts :products="products.slice(36, 42)"></SliderProducts>
      <SliderProducts :products="products.slice(42, 48)"></SliderProducts>
      <SliderProducts :products="products.slice(48, 54)"></SliderProducts>
      <SliderProducts :products="products.slice(54, 60)"></SliderProducts>
      <SliderProducts :products="products.slice(60, 66)"></SliderProducts>
      <SliderProducts :products="products.slice(66, 72)"></SliderProducts>
      <SliderProducts :products="products.slice(72, 78)"></SliderProducts>
      <SliderProducts :products="products.slice(78, 84)"></SliderProducts>
      <SliderProducts :products="products.slice(84, 90)"></SliderProducts>
      <SliderProducts :products="products.slice(90, 96)"></SliderProducts>

      

      
    </v-container>
  </div>
</template>

<script>
import SliderProducts from "@/components/SliderProducts";
const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
const opts = { format: "%s%v %c", code: "MEX", symbol: "$" };
var grouper = require("number-grouper");
const formatCurrency = require("format-currency");

export default {
  components: {
    SliderProducts,
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const search = this.$route.params.search;
      const response = await this.axios.get("/api/products/name/" + search);
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
  data: () => ({
    products: [],
  }),

  watch: {
    $route(to, from) {
        this.getProducts();
    },
  },
};
</script>

<style>
</style>