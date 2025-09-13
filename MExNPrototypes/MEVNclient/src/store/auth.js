import { reactive } from 'vue'
import { jwtDecode } from 'jwt-decode'

const tokenKey = 'token'

const auth = reactive({
  user: null,
  token: null,

  loadUser() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(tokenKey)
      if (token) {
        this.token = token
        this.user = jwtDecode(token)
      }
    }
  },

  login(token) {
    localStorage.setItem(tokenKey, token)
    this.token = token
    this.user = jwtDecode(token)
  },

  logout() {
    localStorage.removeItem(tokenKey)
    this.token = null
    this.user = null
  },

  isLoggedIn() {
    return !!this.user
  },

  isBeneficiary() {
    return this.user?.role === 'beneficiary'
  },

  isMember() {
    return this.user?.role === 'member'
  },
})

// Load user on init
auth.loadUser()

export default auth
