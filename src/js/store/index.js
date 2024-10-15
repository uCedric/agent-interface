import { readonly } from "vue";

const state = { //reactive({data...}), once data change, will trigger vue component to rerender the value of data
  serviceApi: "http://localhost:8080",//"https://buzzard-comic-raccoon.ngrok-free.app",
  Authorization: ""
};

const setAuth = (token) => {
    state.Authorization = "Bearer " + token;
}

export default {
  state: readonly(state),
  setAuth
};