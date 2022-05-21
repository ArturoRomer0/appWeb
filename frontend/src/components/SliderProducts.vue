<template>
  <Flicking :options="{ moveType: 'freeScroll', bound: true }">
    <div v-for="product in products" :key="product.id" class="">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            max-width="245"
            min-width="100"
            class="mr-10 my-10"
            :elevation="hover ? 5 : 1"
          >
            <v-img
              :src="product.images[0]"
              class="white"
              height="246"
              contain
            ></v-img>
            <v-card-subtitle class="pt-0 mt-3 pb-0 subtitle">
              <span class="title" @click="toProduct(product.id)">
                {{ product.name.substring(0, 33) }}
                {{ product.name.length > 33 ? "..." : "" }}
              </span>
              <div class="marca mb-2">
                {{ product.marca }}
              </div>
            </v-card-subtitle>
            <!-- <v-divider></v-divider> -->
            <v-card-subtitle>
              <div class="d-flex justify-start mb-1">
                <v-rating
                  :value="product.rating.value"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <span class="primary--text count">{{
                  product.rating.count
                }}</span>
              </div>
              <div class="d-flex justify-center">
                <span class="text-md-body-1"> {{ product.price }}</span>
              </div>
            </v-card-subtitle>
          </v-card>
        </template>
      </v-hover>
    </div>
  </Flicking>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toProduct(id) {
      this.$router.push({
        name: "Product",
        params: { id: id },
      });
      console.log(id);
    },
    dbclick(e) {
      console.log("dblclick",e);
    },
  },

};
</script>


<style scoped>
.text-card {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  font-family: "Roboto", sans-serif;
}

.rating {
  font-size: 11px;
}
.marca {
  font-size: 11px;
}

.count {
  font-size: 0.75rem;
}
.title:hover {
  cursor: pointer;
  color: #00ff2c;
}
.subtitle {
  font-size: 0.75rem;
  height: 68px;
}
</style>
