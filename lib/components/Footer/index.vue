<template>
  <div class="cvp-footer" :data-active="data.container.mouseMove" @mouseenter="data.container.mouseHold = true" @mouseleave="data.container.mouseHold = false; handleContainerMouseMove()">
    <Progress />
    <Controller />
  </div>
</template>

<script setup>
import usePlayer from '../../compositions/player';
import Progress from './Progress.vue';
import Controller from './Controller.vue';

// composition
const { data, handleContainerMouseMove } = usePlayer();
</script>

<style scoped>
.cvp-footer {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: var(--footer-height);
}

[data-type=overlay] .cvp-footer {
  position: absolute;
  inset: auto 0 0;
  height: 50px;
  gap: 5px;
  background: linear-gradient(var(--color-15-000), var(--color-15-100));
  transform: translateY(100px);
  transition: all 0.5s ease-out;
}
[data-type=overlay] .cvp-footer[data-active=true] {
  transform: translateY(0);
}
</style>
