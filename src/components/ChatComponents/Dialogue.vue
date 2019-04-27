<template>
  <div class="dialog-container">
    <div class="dialog">
      <form class="dialog-form" @submit.prevent="handleSubmit">
        <label class="username-label" for="username">
          What is your name?
        </label>
        <input
          id="username"
          class="username-input"
          autofocus
          type="text"
          name="userId"
          :value="username"
          @input="handleInput"
          />
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
