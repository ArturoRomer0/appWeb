<template>
  <div>
    <!-- {{product}} -->
    <v-card>
      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <!-- <v-toolbar-title>Productos</v-toolbar-title> -->
            <!-- <v-spacer></v-spacer> -->
            <FormProduct></FormProduct>
            <v-btn class="ml-10 success" @click="getProducts">
              <v-icon size="18">fas fa-redo</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              prepend-icon="fas fa-search"
              label="Buscar Producto"
              single-line
              clear-icon="fas fa-times"
              hide-details
              loading
            ></v-text-field>

            <v-dialog v-model="dialogDelete" max-width="500px"> </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            size="18"
            color="green"
            class="mr-4"
            @click="editItem(item._id)"
          >
            fas fa-edit
          </v-icon>
          <v-icon size="18" color="error" @click="deleteItem(item._id)"
            >fas fa-trash</v-icon
          >
        </template>
        <!-- Agregar una columna -->
        <template v-slot:item.images="{ item }">
          <v-img width="45" :src="item.images"></v-img>
          <!-- {{ item.images }} -->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import FormProduct from "@/components/dashboard/FormProduct";
const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
const opts = { format: "%s%v %c", code: "MEX", symbol: "$" };
const formatCurrency = require("format-currency");
export default {
  name: "Products",
  components: {
    FormProduct,
  },
  data: () => ({
    search: "",

    dialogDelete: false,
    headers: [
      {
        text: "Nombre del producto",
        align: "start",
        value: "name",
        width: "300",
      },
      { text: "Catergoria", value: "category" },
      // { text: "Descrición", value: "description" },
      { text: "Precio de venta", value: "purchasePrice" },
      { text: "Precio de compra", value: "salePrice" },
      { text: "Stock", value: "stock" },
      { text: "Colores", value: "colors" },
      { text: "Marca", value: "marca" },
      // { text: "Estado", value: "status" },
      { text: "Materiales", value: "materials" },
      { text: "Dimenciones", value: "sizes" },
      { text: "Plataforma", value: "plataform" },
      { text: "Fecha de creación", value: "createdAt" },
      { text: "Accioens", value: "actions" },
      { text: "imagen", value: "images" },
    ],
    desserts: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  created() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      try {
        const response = await this.axios.get("/api/products?limit=1000");
        this.desserts = response.data.map((product) => {
          return {
            _id: product._id,
            category: product.category.name,
            description: product.description,
            name: product.name.slice(0, 73) + " ...",
            purchasePrice: formatCurrency(product.purchasePrice, opts),
            salePrice: formatCurrency(product.salePrice, opts),
            stock: product.stock,
            colors: product.colors.join(" - "),
            marca: product.marca,
            status: product.status,
            materials: product.materials.join(" - "),
            sizes:
              product.sizes.width +
              " x " +
              product.sizes.height +
              " x " +
              product.sizes.depth + " centimetros",
            plataform: product.plataform,
            createdAt: product.createdAt.split("T")[0],
            images: VUE_APP_API_URL + product.images[0],
          };

        });
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      console.log(item);
    },

    deleteItem(item) {
      // console.log(item);
      // this.dialogDelete = true;
      this.axios
        .delete("/api/products/" + item)
        .then((response) => {
          console.log(response);
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

