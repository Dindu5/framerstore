<template>
  <main class="auth-layout">
    <Navigation width="50rem" classes="my-notification" />
    <div class="container">
      <slot />
    </div>
    <notifications />
  </main>
</template>

<script setup lang="ts"></script>
