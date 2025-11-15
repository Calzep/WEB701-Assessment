<template>
  <div class="services-container">
    <h2>Services</h2>

    <p v-if="services.length === 0">There are no services available at this time.</p>

    <div v-for="service in services" :key="service._id" class="service-card">
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
      <p>Cost: {{ service.tokenCost }} tokens</p>
      <button
        v-if="auth.user?.role === 'beneficiary'"
        @click="purchaseService(service._id)"
      >
        Purchase Service
      </button>
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
.service-card {
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
