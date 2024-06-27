<template>
  <q-form @submit.prevent="formSubmit" class="form-register" ref="registerForm">
    <div>
      <InputField :label="'Email'">
        <template #input>
          <q-input
            v-model="formRegisterInputs.email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please insert email',
              (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please insert a valid email'
            ]"
            label-color="brand"
            placeholder="Please insert email"
            ref="emailRef"
            type="email"
            hide-bottom-space
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </template>
      </InputField>
    </div>

    <div>
      <InputField :label="'Password'">
        <template #input>
          <q-input
            v-model="formRegisterInputs.password"
            :rules="[(val) => (val && val.length > 0) || 'Please insert password']"
            :type="showPassword ? 'text' : 'password'"
            label-color="brand"
            placeholder="Please insert password"
            ref="passwordRef"
            hide-bottom-space
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>
        </template>
      </InputField>
    </div>

    <div>
      <InputField :label="'Confirm Password'">
        <template #input>
          <q-input
            v-model="formRegisterInputs.confirmPassword"
            :rules="[
              (val) => (val && val.length > 0) || 'Please insert confirm password',
              (val) => val === formRegisterInputs.password || 'Passwords must match'
            ]"
            :type="showPassword ? 'text' : 'password'"
            label-color="brand"
            placeholder="Please insert confirm password"
            ref="confirmPasswordRef"
            hide-bottom-space
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>
        </template>
      </InputField>
    </div>

    <div class="q-mt-auto">
      <q-btn
        type="submit"
        :loading="submitting"
        color="primary"
        label="Register"
        size="lg"
        no-caps
        style="width: 100%"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputField from 'components/forms/InputField.vue';
import FirebaseRegister from 'src/firebase/firebase-register';

const router = useRouter();

// loading / submitting state.
const submitting = ref(false);

// form ref.
const registerForm = ref(null);

// form inputs ref.
const emailRef = ref();
const passwordRef = ref();
const confirmPasswordRef = ref();

// form inputs for v-model.
const formRegisterInputs = reactive({
  email: null,
  password: null,
  confirmPassword: null
});

// password input show / hide.
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// form submit action.
const formSubmit = async () => {
  submitting.value = true;

  try {
    if (registerForm.value.validate() && !!(await FirebaseRegister(formRegisterInputs))) {
      router.push('/app');
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped lang="scss">
@import 'styles/FormRegister';
</style>
