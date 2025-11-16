<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <label>Email</label>
        <input type="email" v-model="email" required /> 
      </div>
      <div class="form-row">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button class="default-button" type="submit" :disabled="loading">Login</button>
    </form>

    <FeedbackMessage :message="feedbackMessage" :type="feedbackType" />

    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import auth from '../store/auth'
import FeedbackMessage from '../components/FeedbackMessage.vue';
import { useRouter } from 'vue-router'

export default {
  components : { FeedbackMessage },

  setup() {
    const router = useRouter()
    return { auth, router }
  },
  data() {
    return {
      email: '',
      password: '',
      feedbackMessage: null,
      feedbackType: 'error',
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      this.feedbackType = "loading"
      this.feedbackMessage = "Logging in..."
      try {
        const res = await fetch('http://localhost:7011/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Login failed')

        this.feedbackType = "success"
        this.feedbackMessage = "Login successful!"

        setTimeout(() => {
          auth.login(data.token)
          this.router.push('/')
        }, 1000)

      } catch (err) {
        this.feedbackType = "error"
        this.feedbackMessage = err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
  }

  .login-container form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
  }

  .form-row {
    display: flex;
    flex-flow: column nowrap;
    width: 300px;
  }
</style>
