<template>
  <div class="services-header">
    <h2>Our Services</h2>

  </div>
  <div class="services-container">
    <p v-if="services.length === 0">There are no services available at this time.</p>

    <div v-for="service in services" :key="service._id" class="service-card">
      <div class="image-placeholder">

      </div>
      <div class="service-card-body">
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
      </div>
      <div class="service-card-actions">
        <div class="type">
          <p>{{service.type}}</p>
          <img class="type-icon" v-if="service.type=='Food'" src="../assets/food.svg"/>
          <img class="type-icon" v-if="service.type=='Shelter'" src="../assets/shelter.svg"/>
        </div>
        <div class="purchase">
          <p>Available for {{ service.tokenCost }} tokens</p>
          <button
            class="highlight-button"
            v-if="auth.isBeneficiary()"
            @click="purchaseService(service._id)"
          >
            Purchase Service
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import auth from '../store/auth'

export default {
  setup() {
    return { auth }
  },
  data() {
    return {
      services: [],
    }
  },
  mounted() {
    this.fetchServices()
  },
  methods: {
    async fetchServices() {
      try {
        const res = await fetch('http://localhost:7011/api/services')
        const data = await res.json()
        this.services = data
      } catch (err) {
        console.error(err)
      }
    },
    async purchaseService(serviceId) {
      if (!auth.user) return alert('You must be logged in to purchase a service')
      try {
        const res = await fetch('http://localhost:7011/api/service-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ serviceId, userId: auth.user.id }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Purchase failed')
        alert('Service purchased successfully')
      } catch (err) {
        alert(err.message)
      }
    },
  },
}
</script>

<style>
.services-container {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  padding: 20px;
}

.service-card {
  display: flex;
  flex-flow: row nowrap;
  border: 1px solid #000;
  height: 200px;
  gap: 10px;
  background-color: #fff;
}

.image-placeholder {
  width: 190px;
  height: 196;
  border: 2px solid #3b3b3b;
  background-image: url("../assets/placeholder.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50px;
}

.service-card-body {
  flex: 1;
}

.service-card-actions {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: space-between;
  width: 200px;
  height: 200px;
}

.type {
  display: flex;
  flex-flow: row nowrap;
}

.type-icon {
  width: 35px;
  height: 35px;
  padding: 5px 10px;
}

.purchase {
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
}



</style>
