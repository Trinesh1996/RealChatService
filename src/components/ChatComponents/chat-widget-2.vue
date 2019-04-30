<template>
<div class="widget">
    <v-container class="my-5">
        <v-card class="pa-3">
            <h2>Got Questions? Chat with us</h2>
        
            <v-layout row>
                <v-flex>
                    <v-card-title primary-title>

                         <img class="profile" src="../../../public/img/profile/trinesh.jpg" aspect-ratio="2.75"><img>

                        <h3 class="caption-grey--text">customer support</h3>

                    </v-card-title>    
                </v-flex>
             
                <v-flex>
                    <v-btn flat icon color="blue lighten-2">
                        <v-icon>thumb_up</v-icon>
                    </v-btn>
                </v-flex>
                
                <v-flex>
                    <v-btn flat icon color="red lighten-2">
                    <v-icon>thumb_down</v-icon>
                    </v-btn>
                </v-flex>
            <v-btn flat icon color="black">
                    <v-icon>clear</v-icon>
                    </v-btn>
                <v-flex>

                </v-flex>
            </v-layout>

            <v-layout>
               <section class="chat-body">
                    <div v-for="message in messages" :key="message.id">
                        <span :class="[ message.senderId === currentUser.id ? 'user' :
                        'support']" class="message">{{ message.text }}</span>
                    </div>
                </section>
            </v-layout>

          
                <form @submit.prevent="handleSubmit" class="message-form">
                      <v-layout>
                    <v-flex>
                        <input
                            class="message-input"
                            autofocus
                            name="newMessage"
                            placeholder="Send Message"
                            :value="newMessage"
                            @input="handleInput"/>
                    </v-flex>
                    <v-flex>

                
                        <v-card-actions>
                            <v-btn flat small>Send</v-btn>
                        </v-card-actions>
                    </v-flex>
                    </v-layout>
                </form>
         
        </v-card>
    </v-container>
</div>
    
</template>

<script>
export default {
    name: "ChatWidget",
    props: {
        newMessage: String,
        messages: Array,
        currentUser: {
            type: Object,
            required: true,
            default: null,
        },
  },
  methods: {
    handleInput(event) {
      const { name, value } = event.target;
      this.$emit('update-input', name, value);
    },
    handleSubmit() {
      this.$emit('send-message');
    }
  }
}
</script>

<style scoped>

.widget {
    width: 45%;
    height: 100%;
}

.profile {
    width: 7%;
    border-radius: 50%;
    margin-right: 1.5em;
}

</style>
