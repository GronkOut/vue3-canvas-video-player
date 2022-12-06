<template>
  <div class="cvp-message">
    <div
      class="cvp-message-text"
      :class="(data.message.visible) ? 'cvp-message-text-show' : 'cvp-message-text-hide'"
      v-html="data.message.text"
    />
  </div>
</template>

<script setup>
import usePlayer from '../compositions/player';

// composition
const { data } = usePlayer();
</script>

<style scoped>
.cvp-message {
  position: absolute;
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.cvp-message-text {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-15-050);
  color: var(--color-00-100);
  opacity: 0;
}
.cvp-message-text.cvp-message-text-show {
  animation: fadeIn 0.5s 1 forwards;
}
.cvp-message-text.cvp-message-text-hide {
  animation: fadeOut 0.5s 1 forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
