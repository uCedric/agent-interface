<template>
    <div class="login-wrapper">
      <img src="../../images/hades-icon128.png">
      <h2>Sign up</h2>
      <div v-if="error" class="error">{{ error }}</div>
      <form @submit.prevent="signup">
        <label for="name">Name:</label>
        <input v-model="name" type="name" id="name" placeholder="Enter your name" required />

        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
  
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
  
        <button type="submit">Sign up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { inject } from "vue";

  export default {
    setup(){
      const mapCredential = inject("mapCredential");
      const { state } = mapCredential;
      
      return {
        api: state.serviceApi
      }
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      signup() {
        fetch(this.api+'/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.email, password: this.password, name: this.name })
        })
        .then(response => {
          if(response.status != 200){
            return response.json().then(data => {
              this.error = data.message;
            });
          }

          this.$router.push({path: "/"});
        })
        .catch(error => {
            console.error('Error during request:', error);
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

  .login-wrapper {
    background-color: #34495e; /* Dark background color */
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4); /* Stronger shadow */
    width: 100%;
    height: 100%;
    max-width: 400px;
    text-align: center;
  }

  .login-wrapper img {
    margin-bottom: 15px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }

  .login-wrapper h2 {
    color: #ecf0f1; /* Light text color */
    margin-bottom: 20px;
  }

  .login-wrapper .error {
    color: #ff0000;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 15px;
  }

  .login-wrapper form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .login-wrapper form label {
    margin-bottom: 5px;
    color: #bdc3c7;
  }

  .login-wrapper form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #2c3e50;
    color: #ecf0f1;
    border: 1px solid #95a5a6;
    border-radius: 5px;
    outline: none;
    transition: border 0.3s;
  }

  .login-wrapper form input:focus {
    border-color: #7f8c8d;
  }

  .login-wrapper form button {
    width: 100%;
    background-color: #fac506; /* Darker button background */
    color: #2c3e50; /* Darker button text */
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .login-wrapper form button:hover {
    background-color: #c2a513; /* Darker hover effect */
    color: #ecf0f1; /* Light hover text */
  }
</style>
  