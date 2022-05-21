<template>
  <v-app>
    <v-main>
      <XyzTransition
        appear
        xyz="fade in-left-100% out-right-100%"
        mode="out-in"
      >
        <router-view />
      </XyzTransition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

*::-webkit-scrollbar {
  width: 8px;
  background: #121212;
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(105, 105, 105, 0.7);
  border-radius: 10px;
}

.letters {
  font-family: "Audiowide";
}

</style>