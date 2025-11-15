import { createRouter, createWebHistory } from 'vue-router'
import auth from '../store/auth'

// Pages
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Services from '../views/Services.vue'
import Account from '../views/Account.vue'
import ServicePurchase from '../views/ServicePurchase.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/services', name: 'Services', component: Services },
  { path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true } },
  { path: '/service-purchase', name: 'ServicePurchase', component: ServicePurchase, meta: { requiresAuth: true, memberOnly: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Requires login
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return next('/login')
  }

  // Only members can access
  if (to.meta.memberOnly && !auth.isMember()) {
    alert('Access denied: Members only')
    return next('/')
  }

  next()
})

export default router
