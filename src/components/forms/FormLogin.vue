<template>
  <q-form class="form-login" @submit.prevent="formSubmit">
    <div>
      <InputField :label="'Username'">
        <template #input>
          <q-input
            type="text"
            ref="usernameRef"
            v-model="formLogin.username"
            :rules="[(val) => (val && val.length > 0) || 'Please insert username']"
            label-color="brand"
            autocomplete="username"
            outlined
            placeholder="Please insert username"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </template>
      </InputField>
    </div>

    <div>
      <InputField :label="'Password'">
        <template #input>
          <q-input
            type="password"
            ref="passwordRef"
            v-model="formLogin.password"
            :rules="[(val) => (val && val.length > 0) || 'Please insert password']"
            label-color="brand"
            autocomplete="password"
            outlined
            placeholder="Please insert password"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </template>
      </InputField>
    </div>

    <!-- <div style="margin-top: 20px">
      <q-btn @click="googleSignIn" color="red" label="Sign in with Google" size="lg" style="width: 100%">
        <template v-slot:prepend>
          <q-icon name="fab fa-google" />
        </template>
      </q-btn>
    </div> -->

    <div style="margin-top: auto">
      <q-btn type="submit" :loading="submitting" color="primary" label="Login" size="lg" style="width: 100%">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import InputField from 'components/forms/InputField.vue';

const submitting = ref(false);
const usernameRef = ref();
const passwordRef = ref();

const formLogin = reactive({
  username: '',
  password: ''
});

const formSubmit = () => {
  submitting.value = true;

  // Simulating a delay here.
  // When we are done, we reset "submitting"
  // Boolean to false to restore the
  // initial state.
  setTimeout(() => {
    // delay simulated, we are done,
    // now restoring submit to its initial state
    submitting.value = false;
  }, 3000);
};
</script>

<style scoped lang="scss">
@import 'styles/FormLogin';
</style>

<!-- <style scoped lang="scss" src="@/components/forms/styles/FormLogin.scss" /> -->
