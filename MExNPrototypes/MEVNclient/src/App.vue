<template>
  <div id="app">
    <h1>Nelson Disaster Response Vue Prototype</h1>
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
/* global styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
