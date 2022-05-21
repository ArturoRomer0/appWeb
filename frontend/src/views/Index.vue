<template>
  <div>
    <SystemBar/>
    <AppBar />
      <router-view></router-view>
  </div>
</template>

<script>
import SystemBar from "@/components/layout/SystemBar";
import AppBar from "@/components/layout/AppBar";
export default {
  components: {
    SystemBar,
    AppBar,
  },
};
</script>

<style>
</style>