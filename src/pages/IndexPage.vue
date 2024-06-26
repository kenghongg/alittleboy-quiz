<template>
  this is index
  <q-btn flat @click="logout">Logout</q-btn>
</template>

<script setup>
import { onMounted } from 'vue';
import signout from 'src/firebase/firebase-signout';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  signout().then(() => {
    router.push('/');
  });
};

onMounted(() => {
  console.log('Firebase API Key:', process.env.VUE_APP_FIREBASE_API_KEY); // Should log your API key
});
</script>
