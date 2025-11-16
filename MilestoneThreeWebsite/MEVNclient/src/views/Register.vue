<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <label>First Name</label>
        <input type="text" v-model="firstName" required />
      </div>
      <div class="form-row">
        <label>Last Name</label>
        <input type="text" v-model="lastName" required />
      </div>
      <div class="form-row">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-row">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-row">
        <label>Role</label>
        <select v-model="role">
          <option value="beneficiary">Beneficiary</option>
          <option value="member">Member</option>
        </select>
      </div>
      <br />
      <button class="default-button" type="submit" :disabled="loading">Register</button>
    </form>

    <FeedbackMessage :message="feedbackMessage" :type="feedbackType" />
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import FeedbackMessage from '../components/FeedbackMessage.vue';

export default {
  components : { FeedbackMessage },

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
      feedbackMessage: null,
      feedbackType: 'error',
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.feedbackMessage = "Creating your account..."
      this.feedbackType = "loading"
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

        
        this.feedbackMessage = "Account Created!"
        this.feedbackType = "success"
        
        setTimeout(() => {
          this.router.push('/login')
        }, 1000)

      } catch (err) {
        console.error(err)
        this.feedbackMessage = "Failed to create account"
        this.feedbackType = "error"
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
  .register-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
  }

  .register-container form {
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
