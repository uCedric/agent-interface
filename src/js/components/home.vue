<template>
    <div class="home-wrapper">
        <div id="top-bar">
            <img src="../../images/hades-icon64.png">
            <div id="title">Hades</div>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="applications-wrapper">
            <router-link id="app-item" to="/chatbot">
                <img src="../../images/chat-icon64.png" alt="Google Icon" />
                <p>chatbot</p>
            </router-link>
            <router-link id="app-item" to="/home">
                <img src="../../images/rag-icon64.png" alt="YouTube Icon" />
                <p>RAG file</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            error: "Rag file is currently unavailable."
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

.home-wrapper {
    background-color: #34495e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    max-width: 400px;
    text-align: center;
}

.home-wrapper #top-bar img {
    border-radius: 10px;
}

.home-wrapper #top-bar #title {
    margin-top: 10px;
    font-size: 50px;
    height: 35px;
    font-family: 'title-font';
    color: #ffffff;
}

.home-wrapper .error {
    color: red;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 15px;
}

.applications-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 30px;
    transition: background-color 0.3s ease;
}

.applications-wrapper :hover {
    background-color: #616c78;
}

.applications-wrapper #app-item {
    padding: 5px;
    border-radius: 15px;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    text-decoration: none;
}

.applications-wrapper #app-item img {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
}

.applications-wrapper #app-item p {
    font-size: 0.9rem;
    color: white;
}
</style>