<template>
  <main class="auth-layout">
    <Navigation />
    <div class="container auth-layout--container">
      <slot />
    </div>
    <Notifications classes="my-notification" />
  </main>
</template>

<script setup lang="ts"></script>
