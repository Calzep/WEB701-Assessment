<template>
  <nav class="nav">
    <div class="left-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/services">Services</router-link>

      <router-link v-if="auth.isLoggedIn()" to="/account">Account</router-link>
      <router-link v-if="auth.isMember()" to="/member-console">Member Portal</router-link>
    </div>
    <div class="right-nav">
      <button class="default-button" v-if="auth.isLoggedIn()" @click="logout">Logout</button>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </div>
    
  </nav>
</template>

<script>
import auth from '../store/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const logout = () => {
      auth.logout()
      router.push('/login')
    }
    return { auth, logout }
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px;
  background-color: #ffffffff;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}

.left-nav,
.right-nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 15px;
}

.right-nav {
  margin-left: auto;
}
</style>
