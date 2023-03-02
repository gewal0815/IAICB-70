<template>
  <div class="content-container">
    <div class="container-login-form"> </div>
  </div>
</template>

<script>


export default {
  components: { },
};
</script>

<style scoped>

.content-container {
  margin: 10px 0 0 0;
}
.container-login-form {
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  height: 40vh;
  border: var(--BorderSize) solid var(--BorderOutsideColor);
  border-radius: var(--Border-Radius);
}
</style>
