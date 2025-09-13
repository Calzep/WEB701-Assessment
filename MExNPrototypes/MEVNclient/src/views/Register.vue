<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <label>First Name</label>
      <input type="text" v-model="firstName" required />
      <br /><br />
      <label>Last Name</label>
      <input type="text" v-model="lastName" required />
      <br /><br />
      <label>Email</label>
      <input type="email" v-model="email" required />
      <br /><br />
      <label>Password</label>
      <input type="password" v-model="password" required />
      <br /><br />
      <label>Role</label>
      <select v-model="role">
        <option value="beneficiary">Beneficiary</option>
        <option value="member">Member</option>
      </select>
      <br /><br />
      <button type="submit" :disabled="loading">Register</button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'beneficiary',
      error: null,
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.error = null
      this.loading = true
      try {
        const res = await fetch('http://localhost:7011/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            userType: this.role,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Registration failed')
        this.router.push('/login')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
