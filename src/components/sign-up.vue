<template>
      <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
       <form v-on:submit.prevent="userSignUp">
          <v-layout column>
               <v-flex>
              <v-text-field
                name="username"
                label="username"
                id="username"
                type="name"
                v-model="username"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                type="name"
                v-model="name"             
                required></v-text-field>
            </v-flex>
          </v-layout>
            <v-layout column>
            <v-flex>
              <v-text-field
                name="surname"
                label="Surname"
                id="surname"
                type="surname"
                v-model="surname"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
                ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              
              <v-btn color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
              
            </v-flex>
          </v-layout>

          <v-flex>
            <v-alert type="error" dismissible v-model="alert">
            {{ error }}
        </v-alert>
        </v-flex>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
    name: "SignUp",
    data () {
        return {          
            email: '',
            password: '',
            passwordConfirm: '',
            alert: false,
           
        }
    },

    methods: {
        userSignUp () {
            if (this.comparePasswords !== true) {
                return
            }
            this.$store.dispatch('userSignUp', { email: this.email, password: this.password })
        },
        },

    computed: {
        comparePasswords () {
            if (this.password === this.passwordConfirm) {
                return true
            }
            else {
                return 'Passwords don\'t match'
            }
        },
        error () {
            return this.$store.state.error
        },
        loading () {
            return this.$store.state.loading
         },

         ...mapFields(['name', 'surname'])
    },
    
    watch: {
        error (value) {
            if (value) {
                this.alert = true
            }
        },
        alert (value) {
            if (!value) {
            this.$store.commit('setError', null)
            }
        }
    }
}
</script>

<style>

</style>
