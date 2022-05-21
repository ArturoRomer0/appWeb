<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Agregar Producto
        </v-btn>
      </template>
      <v-card>
        <v-form
          v-model="valid"
          enctype="multipart/form-data"
          @submit.prevent="getProduct"
        >
          <v-card-title class="mb-4">
            <span class="text-h5">Agregar Producto</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="categorys"
                  outlined
                  label="Seleccione una categoria"
                  v-model="product.category"
                  :rules="rules.categorys"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  clearable
                  outlined
                  label="Nombre del producto"
                  v-model="product.name"
                  autocomplete
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  clearable
                  label="Marca del producto"
                  v-model="product.marca"
                  :rules="rules.marca"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Productos en existencia"
                  append-icon="fas fa-cubes"
                  v-model="product.stock"
                  :rules="rules.productExist"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Color del producto"
                  clearable
                  multiple
                  outlined

                  :items="colors"
                  v-model="product.colors"
                  :rules="rules.colors"
                  
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Precio de venta"
                  append-icon="fas fa-dollar-sign"
                  v-model="product.purchasePrice"
                  :rules="rules.price"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Precio de compra"
                  append-icon="fas fa-dollar-sign"
                  v-model="product.salePrice"
                  :rules="rules.price"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Descripcion del producto"
                  clearable
                  outlined
                  rows="3"
                  v-model="product.description"
                  :rules="rules.description"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Materiales del producto"
                  clearable
                  multiple
                  outlined
                  :items="materials"
                  v-model="product.materials"
                  :rules="rules.materials"
                ></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Ancho del productos"
                  v-model="product.sizes.width"
                  :rules="rules.size"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Largo del productos"
                  v-model="product.sizes.height"
                  :rules="rules.size"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  type="number"
                  clearable
                  outlined
                  label="Porfundidad del productos"
                  v-model="product.sizes.depth"
                  :rules="rules.size"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="plataforms"
                  outlined
                  label="Elegir plataforma"
                  v-model="product.plataform"
                  :rules="rules.plataform"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  counter
                  show-size
                  truncate-length="9"
                  prepend-icon=""
                  prepend-inner-icon="far fa-images"
                  label="Imagenes del producto"
                  outlined
                  multiple
                  accept="image/*"
                  v-model="product.images"
                  @change="Preview_image"
                ></v-file-input>
              </v-col>
              <v-col
                cols="3"
                v-for="(image, index) in url.length"
                :key="image.id"
                class="ma-0 pa-1 d-flex"
              >
                <v-img
                  class="align-center"
                  width="100%"
                  height="100px"
                  contain
                  :src="url[index]"
                />
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="product.status"
                  inset
                  :label="`Producto ${product.status ? 'Activo' : 'Inactivo'}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text type="submit"> Guardar </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- <v-snackbar v-model="snackbar.status" right>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
  </div>
</template>

<script>
export default {
  methods: {
    async getProduct() {
      let formData = new FormData();

      this.product.images.forEach((image) => {
        formData.append("images[]", image);
      });
      this.product.colors.forEach((image) => {
        formData.append("colors[]", image);
      });
      this.product.materials.forEach((image) => {
        formData.append("materials[]", image);
      });
      formData.append("category", this.product.category);
      formData.append("name", this.product.name);
      formData.append("description", this.product.description);
      formData.append("marca", this.product.marca);
      formData.append("purchasePrice", this.product.purchasePrice);
      formData.append("salePrice", this.product.salePrice);
      formData.append("stock", this.product.stock);
      formData.append("status", this.product.status);
      formData.append("sizes[width]", this.product.sizes.width);
      formData.append("sizes[height]", this.product.sizes.height);
      formData.append("sizes[depth]", this.product.sizes.depth);
      formData.append("plataform", this.product.plataform);

      formData.forEach(function (value, key) {
        console.log(key, value);
      });

      if (this.valid) {
        this.axios
          .post("/api/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.dialog = false;
            console.log(response);
            // this.snackbar.status = true;
          })
          .catch((error) => {
            console.log(error);
          });
        this.dialog = false;
      } else {
        console.log("no paso");
      }
    },
    Preview_image(e) {
      const count = this.product.images.length;
      if (count > 0) {
        this.url = URL.createObjectURL(this.product.images[0]);
        this.url = this.product.images.map((image) => {
          return URL.createObjectURL(image);
        });
      }
    },
    async getCategorys() {
      try {
        const response = await this.axios.get("/api/category");
        this.categorys = response.data.map((category) => {
          return category.name;
        });
        console.log(this.categorys);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data: () => ({
    url: [],
    // snackbar: {
    //   status: true,
    //   text: "Producto guardado correctamente",
    // },
    rules: {
      name: [
        (v) => !!v || "El nombre del producto es requerido",
        (v) =>
          (v && v.length <= 150) ||
          "El nombre del producto debe tener menos de 150 caracteres",
      ],
      description: [
        (v) => !!v || "La descripcion del producto es requerida",
        (v) =>
          (v && v.length <= 255) ||
          "La descripcion del producto debe tener menos de 255 caracteres",
      ],
      price: [
        (v) => !!v || "El precio de compra es requerido",
        (v) => (v && v > 0) || "El precio de compra debe ser mayor a 0",
      ],
      stock: [
        (v) => !!v || "El stock del producto es requerido",
        (v) =>
          (v && v.length <= 10) ||
          "El stock del producto debe tener menos de 10 caracteres",
      ],
      categorys: [(v) => !!v || "La categoria del producto es requerida"],
      marca: [
        (v) => !!v || "La marca del producto es requerida",
        (v) =>
          (v && v.length <= 50) ||
          "La marca del producto debe tener menos de 50 caracteres",
      ],
      productExist: [
        (v) => !!v || "El producto existe es requerido",
        (v) =>
          (v && v > 0) || "El producto existe debe tenr un valor mayor a 0",
      ],
      colors: [(v) => !!v.length > 0 || "El color del producto es requerido"],
      materials: [
        (v) => !!v.length > 0 || "El material del producto es requerido",
      ],
      size: [
        (v) => !!v || "El tamaño del producto es requerido",
        (v) => (v && v > 0) || "El tamaño del producto debe ser mayor a 0",
      ],
      plataforms: [(v) => !!v || "La plataforma del producto es requerida"],
      // images: [(v) => !!v.length > 0 || "La imagen del producto es requerida"],
    },
    valid: false,
    dialog: false,
    // files: [],
    colors: [
      "Rojo",
      "Azul",
      "Verde",
      "Amarillo",
      "Naranja",
      "Morado",
      "Rosa",
      "Gris",
      "Negro",
      "Blanco",
    ].sort(),
    materials: ["Plastico", "Vidrio", "Metal", "Alumnio"],
    plataforms: ["PlayStation", "Xbox", "Nintendo", "Pc"],
    categorys: null,
    status: true,
    valid: false,
    product: {
      category: "",
      name: "",
      description: "",
      marca: "",
      purchasePrice: null,
      salePrice: null,
      colors: [],
      stock: null,
      materials: [],
      status: true,
      sizes: {
        width: null,
        height: null,
        depth: null,
      },
      plataform: "",
      images: [],
    },
  }),
  created() {
    this.getCategorys();
  },
};
</script>
