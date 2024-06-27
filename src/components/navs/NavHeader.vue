<template>
  <q-header>
    <q-toolbar>
      <q-btn flat dense to="/" exact>Home</q-btn>

      <q-btn flat dense to="/about">About</q-btn>

      <q-btn flat dense to="/profile" v-if="userLoggedIn">Profile</q-btn>

      <q-space />

      <template v-if="userLoggedIn">
        <q-btn @click="userLogOut">Logout</q-btn>
      </template>
      <template v-else>
        <q-btn to="/login">Login</q-btn>
        <q-btn to="/register">Register</q-btn>
      </template>
    </q-toolbar>
  </q-header>

  <div>
    <!-- <pre>{{ ui }}</pre> -->
    <pre>userLoggedIn~~{{ userLoggedIn }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import FirebaseSignout from 'src/firebase/firebase-signout';
import { LocalStorage } from 'quasar';

const router = useRouter();

const userLoggedIn = computed(() => LocalStorage.has('user'));

// logout action.
const userLogOut = () => {
  FirebaseSignout().then(() => {
    router.push('/').then(() => {
      window.location.reload();
    });
  });
};
</script>

<style scoped>
/* Styles for NavHeader */
</style>
