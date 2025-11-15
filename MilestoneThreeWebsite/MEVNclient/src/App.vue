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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

body {
  padding: 0;
  margin: 0;
}

.top-row {
  padding-left: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 20px;
  background-color: #dadadaff;
}

.highlight-button {
  padding: 10px 20px;
  border: none;
  background: hsl(0, 100%, 38%);
  border: 1px solid #00000000;
  color: #fff;
  cursor: pointer;
}

.highlight-button:hover {
  background: hsl(0, 0%, 100%);
  border: 1px solid #000;
  color: #000;
}


.default-button {
  padding: 10px 20px;
  border: 1px solid #000;
  background: hsl(0, 0%, 93%);
  color: #000;
  cursor: pointer;
}

.default-button:hover {
  background: hsl(0, 100%, 38%);
  border: 1px solid #fff;
  color: #fff;
}
</style>
