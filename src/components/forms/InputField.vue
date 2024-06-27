<template>
  <!-- Passed props -->
  <!-- <pre>{{ props }}</pre> -->

  <div class="input-field">
    <div class="field-title">{{ props.label }}</div>
    <slot name="input"></slot>
  </div>
</template>

<script setup>
const props = defineProps(['label']);
</script>

<style scoped lang="scss">
@import 'styles/InputField';
</style>
