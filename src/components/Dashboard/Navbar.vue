<template>
<nav>
  <v-toolbar app flat>
  <v-toolbar-side-icon class="grey--text" v-on:click="sidebar = !sidebar">
  </v-toolbar-side-icon>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
        <v-toolbar-title class="text-uppercase grey--text">
        <router-link to="/" tag="span" style="cursor: pointer">           
      <span class="font-weight-light">Ayo</span>
      <span>Chat</span>
        </router-link>
      </v-toolbar-title>
        <v-spacer></v-spacer>
 
      <v-toolbar-items class="hidden-xs-only">
        <!-- <v-list>
          <v-list-tile  class="grey--text"
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile> 
        </v-list> -->

    <v-btn flat class="white" router to="/">Home
        <v-icon left>home</v-icon>
    </v-btn>
      <v-btn v-if="isAuthenticated" flat @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
            Sign Out
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>

     
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile>
          <v-list-action>
            <v-icon class="white --text">dashboard
        
        <v-list-tile-action>
          <v-icon></v-icon>
            </v-list-tile-action>
              <v-list-tile-content></v-list-tile-content>
            </v-list-tile> 
        
         
      </v-list>
    </v-navigation-drawer>

    
    <v-content>
      <router-view></router-view>
    </v-content>
</nav>

</template>

<script>
export default {
    name: "Navbar",

 data () {
      return {
        sidebar: true,
        links: [
          {icon: 'dashboard', text: "Dashboard", route: '/home'},
          {icon: 'chat', text: "Chat", route: '/chat'},
          {icon: 'person', text: "Team", route: '/team'},

        ]
      }
    },
    methods: {
      userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  },
    computed: {
      appTitle () {
        return this.$store.state.appTitle
      },
        // returns authenticated state
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },

    menuItems () {
      if (this.isAuthenticated) {
        return [
          {title: 'Home', path: '/home', icon: 'home'}
        ]
      }
      else {
        return [
          {title: 'Sign Up', path: '/signup', icon: 'face'},
          {title: 'Sign In', path: '/signin', icon: 'lock_open'},
         
        ]
      }
    }
    }
}
</script>

<style>

</style>
