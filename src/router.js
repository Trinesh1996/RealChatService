import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'






const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'sign-in' },
  { path: '/signup', component: 'sign-up' },
  { path: '/home', component: 'Dashboard/Home', meta: {requiresAuth: true} },
  { path: '*', component: 'notFound' },
  {path: '/customer', component: 'ChatComponents/customer'},
  {path: '/support', component: 'ChatComponents/support'}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})


// Protect the route
// localhost:8080/home will be redirected to signin if user hasn't yet logged in.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  }
  else {
    next ()
  }
}) 

export default router
