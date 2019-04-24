import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'sign-in' },
  { path: '/signup', component: 'sign-up' },
  { path: '/home', component: 'Home', meta: {requiresAuth: true} }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.macthed.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/signIn')
  }
  else {
    next ()
  }
}) 

export default Router