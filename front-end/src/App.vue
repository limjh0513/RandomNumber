<template>
  <div id="app">
    <Headers></Headers>
    <router-view />
  </div>
</template>

<script>
import Headers from "./components/Header.vue";
import firebase from "firebase/app";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyBGQj6r6XlKsaL4Ytc8Tjz0fu65E4SCQjY",
  authDomain: "announcestudent.firebaseapp.com",
  projectId: "announcestudent",
  storageBucket: "announcestudent.appspot.com",
  messagingSenderId: "430104531035",
  appId: "1:430104531035:web:2437c7feb89a5133e92f7e",
  measurementId: "G-6659PTKBLC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default {
  components: {
    Headers,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
