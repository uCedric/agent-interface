<template>
    <div id="main frame" style="height: 98%;">
        <router-view></router-view>
    </div>
</template>

<script>
import { provide } from "vue";
import store from "../store";

export default {
  setup() { //execute before vue component is created
    provide("mapCredential", store);
  },
};
</script>