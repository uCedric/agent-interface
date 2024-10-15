<template>
  <div class="chatbot-wrapper">
    <div id="top-bar">
      <router-link id="top-bar-item" to="/home">
        <img src="../../images/hades-icon48.png">
        <div id="title">Hades</div>
      </router-link>
    </div>

    <div class="chat-area">
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="messages" ref="messages">
        <div v-for="(message, index) in chatMessages" :key="index" :class="['message', message.from]">
          <div v-if="message.from === 'bot'" class="bot-message">
            <div v-html="message.text"></div>
          </div>
          
          <div v-if="message.from === 'user'" >{{ message.text }}</div>
        </div>
      </div>

      <div class="input-area">
        <input v-model="content" @keyup.enter="sendMessage" placeholder="Type here..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup(){
    const mapCredential = inject("mapCredential");
    const { state } = mapCredential;

    return {
      api: state.serviceApi,
      token: state.Authorization
    }
  },
  data() {
    return {
      token: '',
      chatMessages: [],
      content: '',
      error: 'if you want to access this feature, contact cedric(cedricliu1011@gmail.com)'
    };
  },
  methods: {
    sendMessage() {
      if (this.content.trim() === '') return;

      this.chatMessages.push({
        text: this.content,
        from: 'user'
      });

      fetch(this.api+'/prompts/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify({ content: this.content })
        })
        .then(async response => {
            this.content = '';
            const reader = response.body.getReader();
            let index = (this.chatMessages.length === 0 ) ? 0 : this.chatMessages.length;

            while(true){
                let finished = false;
                await reader.read().then(({ value, done }) => {
                  if(done)finished = true;

                  const decoder = new TextDecoder('utf-8');
                  const text = decoder.decode(value);

                  if(text.length != 0)
                    this.chatMessages[index] = {text: (this.chatMessages[index] === undefined) ? (text + "<br>") : (this.chatMessages[index].text) + text + "<br>", from: 'bot'};
                  
                  this.$nextTick(() => {
                    const messageContainer = this.$refs.messages;
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                  });
                });

                if (finished) break;
            }
        })
        .catch(error => {
            this.error = error.message;
        });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.chatbot-wrapper {
  background-color: #34495e;
  padding-top: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  max-width: 400px;
  text-align: center;
}

.chatbot-wrapper #top-bar #top-bar-item{
  width: 50%;
  display: flex;              
  align-items: center;       
  gap: 10px;
  text-decoration: none;
  margin-left: 10px;
}

.chatbot-wrapper #top-bar img {
  border-radius: 10px;
}

.chatbot-wrapper #top-bar #title {
  font-size: 45px;
  font-family: 'title-font';
  color: #ffffff;
}

.chat-area {
  margin-top: 10px;
  height: 90%;
  display: flex;
  flex-direction: column; 
}

.error-message {
  color: red;
  font-size: 17px;
}

.messages {
  flex: 1; 
  overflow-y: auto; 
  background-color: #2c3e50;
  border-radius: 5px;
  padding: 10px; 
  margin-bottom: 10px; 
  font-size: 14px;
}

.messages::-webkit-scrollbar {
  width: 4px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 10px;
}

.message.user {
  background-color: #c2a513;
  text-align: left;
  color: black;
  width: 70%
}

.message.bot {
  background-color: #7f8c8d;
  text-align: left;
  color: black;
}

.message.bot pre{
  white-space: pre-wrap;
  word-wrap: break-word;
}

.message {
  padding: 6px; 
  margin: 20px 0; 
  border-radius: 10px; 
}

.input-area {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px; 
  background-color: rgba(255, 255, 255, 0.9); 
  border-top: 1px solid #ccc; 
  background-color: #2c3e50;
}

.input-area input {
  flex: 1; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px; 
  margin-right: 10px; 
  background-color: #34495e;
  color: white;
}

.input-area input::placeholder {
    color: #bdc3c7;
}

.input-area button {
  padding: 10px 15px; 
  border: none; 
  border-radius: 5px; 
  background-color: #fac506; 
  color: white; 
  cursor: pointer; 
  transition: background-color 0.3s;
}

.input-area button:hover {
  background-color: #c2a513;
}
</style>