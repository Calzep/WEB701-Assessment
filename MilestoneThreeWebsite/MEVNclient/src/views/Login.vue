<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <label>Email</label>
      <input type="email" v-model="email" required />
      <br /><br />
      <label>Password</label>
      <input type="password" v-model="password" required />
      <br /><br />
      <button type="submit" :disabled="loading">Login</button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import auth from '../store/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    return { auth, router }
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.error = null
      this.loading = true
      try {
        const res = await fetch('http://localhost:7011/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Login failed')
        auth.login(data.token)
        this.router.push('/')
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
