

<template>
  <div class="card-overlay">{{ overlayText }}</div>
</template>

<script>
export default {
  props: {
    overlayText: String,
  },
  mounted() {
    setTimeout(() => {
      this.$emit('hide-overlay');
    }, 2000);
  },
};
</script>

<style scoped>
.card-overlay {
  position: absolute;
  top: -30px;
  right: -30px;
  background-color: rgba(0, 128, 0, 0.9);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: small;
}
</style>
