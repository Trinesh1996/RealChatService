import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase'


firebase.initializeApp({
  apiKey: 'AIzaSyA8Ic3-g_N6Z0VFuIOWLUHSanTHrc_mxv0',
  authDomain: 'nam5 (us-central)',  
  databaseURL: 'https://newagent-8d201.firebaseio.com',
  projectId: 'newagent-8d201'
})

Vue.config.productionTip = false


const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
