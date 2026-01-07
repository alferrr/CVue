<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const getStarted = () => {
  router.push("/getstarted");
};
</script>

<template>
  <section class="templates" id="temp">
    <h1>Templates</h1>
    <div class="container">
      <div class="template">
        <h1>Coming Soon...</h1>
        <div class="overlay"></div>
      </div>
      <div class="template simple" @click="getStarted" role="link">
        <div class="overlay"></div>
        <img src="../assets/images/simple.png" alt="" />
      </div>
      <div class="template">
        <h1>Coming Soon...</h1>
        <div class="overlay"></div>
      </div>
    </div>
  </section>
  <footer>
    <h2>Switch templates anytime without losing data</h2>
  </footer>
</template>

<style src="../assets/globals.css"></style>
<style scoped>
footer {
  display: grid;
  place-items: center;
  height: 30vh;
  width: 100%;
  color: black;
  background: #fafafa;

  h2 {
    color: var(--blue);
    font-size: 2rem;
    letter-spacing: -1px;
  }
}
</style>
