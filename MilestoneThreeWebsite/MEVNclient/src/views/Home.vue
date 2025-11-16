<template>
  <div class=banner>
    <div class="call-to-action">
      <p>Become a Beneficiary</p>
      <router-link to="/register"><button class="highlight-button">Register Now</button></router-link>
    </div>
  </div>
  <p class="NDR-blurb">Welcome to the Nelson Disaster Response website.  
Nelson Disaster Response offers shelter and food to people displaced by natural disasters in the Nelson region.
Register now to become a beneficiary of NDR and access our emergency food supplies and shelter during disaster periods
  </p>
  <div class="quick-links">
    <router-link to="/services"><button class="highlight-button">See our Services</button></router-link>
    <router-link><button class="highlight-button">Contact Us</button></router-link>
  </div>
</template>

<script>
</script>

<style scoped>
  .banner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 400px;
    padding-left: 40px;

    background-image: url("../assets/Nelson_New_Zealand.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.8)
  }

  .call-to-action {
    position: relative;
    font-size: 30px;
    font-family: sans-serif;
    color: #ffffff;
    width: 300px;
    height: 150px;
    background-color: #00000088;
    padding: 20px;
  }

  .call-to-action button {
  margin-top: 12px;
  font-weight: bold;
  font-size: 18px;
}

.NDR-blurb {
  text-align: justify;
  padding: 20px 50px;
  margin-bottom: 200px;
}

.quick-links {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 50px;
  background-color: #2b2b2b;
  padding: 100px 0;
}

.quick-links button {
  font-size: 18px;
  width: 300px;
  height: 50px;
}

</style>