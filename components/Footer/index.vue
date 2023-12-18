<template>
  <footer class="footer">
    <div class="container">
      <h2>Subscribe to our newsletter</h2>
      <div class="footer-top">
        <div>
          <input
            type="email"
            placeholder="Enter email here"
            class="footer-subscription"
          />
          <button class="btn">Submit</button>
        </div>
        <div>
          <a href="#">
            <img src="/images/icons/pintrest.svg" alt="Pinterest" />
          </a>
          <a href="#">
            <img src="/images/icons/x.svg" alt="Twitter" />
          </a>
          <a href="#">
            <img src="/images/icons/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
      <hr class="footer-break" />
      <div class="footer-middle">
        <h4>Top Searches for Framer templates</h4>

        <div>
          <a href="#">Portfolio</a>
          <a href="#">Saas</a>
          <a href="#">Startup</a>
          <a href="#">Fitness</a>
          <a href="#">Beauty</a>
          <a href="#">Photography</a>
          <a href="#">Pod casting</a>
          <a href="#">Real Estate</a>
          <a href="#">Health</a>
          <a href="#">Agency</a>
          <a href="#">Marketing</a>
          <a href="#">Business</a>
          <a href="#">Technology</a>
        </div>
      </div>
      <hr class="footer-break" />
      <div class="footer-bottom">
        <div>
          <nuxt-link to="/">About us</nuxt-link>
          <nuxt-link to="/">Blog</nuxt-link>
          <nuxt-link to="/">Contact us</nuxt-link>
          <nuxt-link to="/">Submit a template</nuxt-link>
          <nuxt-link to="/">Promote a template</nuxt-link>
          <nuxt-link to="/">Customisation</nuxt-link>
        </div>
        <div>
          <p><span>©</span> Copyright 2023 Framerstore</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style></style>
