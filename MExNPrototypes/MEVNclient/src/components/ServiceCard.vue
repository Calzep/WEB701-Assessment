<template>
  <div class="service-card">
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <p>Cost: {{ service.tokenCost }} tokens</p>
    <button
      v-if="auth.user?.role === 'beneficiary'"
      @click="purchaseService"
    >
      Purchase
    </button>
  </div>
</template>

<script>
import auth from '../store/auth'

export default {
  props: ['service'],
  setup() {
    const authState = auth

    const purchaseService = async () => {
      try {
        const res = await fetch('http://localhost:7011/api/service-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            serviceId: this.service._id,
            userId: authState.user.id,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Purchase failed')
        alert('Service purchased successfully!')
      } catch (err) {
        alert(err.message)
      }
    }

    return { auth: authState, purchaseService }
  },
}
</script>
