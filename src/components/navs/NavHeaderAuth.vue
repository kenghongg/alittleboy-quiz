<template>
  <q-toolbar class="top-toolbar">
    <q-btn @click="router.push('/')" icon="chevron_left" flat round />
    <q-space />
    <q-btn
      :label="authHeader.title"
      @click="router.push(authHeader.path)"
      flat
      no-caps
      size="md"
      color="primary"
    />
  </q-toolbar>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const authHeader = reactive({
  title: null,
  path: null
});

const getAuthHeader = () => {
  switch (route.path) {
    case '/login':
      authHeader.title = 'Register';
      authHeader.path = '/register';
      break;
    case '/register':
      authHeader.title = 'Login';
      authHeader.path = '/login';
      break;
    default:
      break;
  }
};

onMounted(() => {
  getAuthHeader();
});
</script>

<style scoped lang="scss">
.top-toolbar {
  height: 50px;
}
</style>
