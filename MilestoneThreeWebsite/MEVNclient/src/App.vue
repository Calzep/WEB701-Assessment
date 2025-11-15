<template>
  <div id="app">
    <div class="top-row">
      <img src="./assets/NDR_logo.png"  />
      <h1>Nelson Disaster Response</h1>
    </div>
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
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.top-row {
  padding-left: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 20px;
  background-color: #dadadaff;
}
</style>
