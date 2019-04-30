
<template>
  <div class="dialog-container">
    <div class="dialog">
      <form class="dialog-form" @submit.prevent="handleSubmit">
        <v-layout>
          <v-flex>
        <label class="username-label" for="username">Name</label>
        <input id="username" class="username-input" autofocus type="text" name="userId" :value="username" @input="handleInput"/>
      </v-flex>
        </v-layout>

          <v-layout>
              <v-flex>
        <label class="email" for="email"> Email </label>
        <input class="email" type="email" name="email" :value="email"/>
  </v-flex>
        </v-layout>

         <v-layout>
              <v-flex>
        <label class="contact" for="contact"> Cell </label>
        <input class="cell" type="contact" name="contact" :value="contact"/>
         </v-flex>
        </v-layout>
        <button type="submit" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    username: String,
  },

  data () {
    return {
      email: "",
      contact: ""
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-username', this.username);
    },
    handleInput(event) {
      const { name, value } = event.target;
      this.$emit('update-input', name, value);
    }
  }
}
</script>