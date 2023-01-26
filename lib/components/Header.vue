<template>
  <div class="cvp-header">
    <div class="cvp-information" :data-active="!data.range.enabled">
      <span>{{ currentTime }}</span>
      <span style="opacity: 0.5;"> / </span>
      <span>{{ duration }}</span>
      <span v-if="hasFps">
          <span> [ {{ currentFrame }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ totalFrame }} ]</span>
        </span>
    </div>
    <div v-if="hasRange" class="cvp-information" :data-active="data.range.enabled">
      <span>{{ currentTime }}</span>
      <span style="opacity: 0.5;"> / </span>
      <span>{{ rangeTime }}</span>
      <span v-if="hasFps">
          <span> [ {{ currentFrame }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ rangeFrame }} ]</span>
        </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import usePlayer from '../compositions/player';
import { secondToTimeString, secondToFrameNumber, numericWithComma } from '../utils';

// composition
const { data } = usePlayer();

// computed
const hasRange = computed(() => (data.range.start > 0) && (data.range.end > 0));
const hasFps = computed(() => data.video.fps > 0);
const currentTime = computed(() => secondToTimeString(data.video.src && data.video.currentTime || 0));
const duration = computed(() => secondToTimeString(data.video.src && data.video.duration || 0));
const rangeTime = computed(() => secondToTimeString(data.video.src && data.range.end || 0));
const currentFrame = computed(() => numericWithComma(secondToFrameNumber(data.video.src && data.video.currentTime || 0, data.video.fps)));
const totalFrame = computed(() => numericWithComma(secondToFrameNumber(data.video.src && data.video.duration || 0, data.video.fps)));
const rangeFrame = computed(() => numericWithComma(secondToFrameNumber(data.video.src && data.range.end || 0, data.video.fps)));
</script>

<style scoped>
.cvp-header {
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  width: 100%;
  height: var(--header-height);
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: var(--color-14-100);
}
.cvp-information {
  font-size: 14px;
  white-space: nowrap;
  color: var(--color-00-100);
  opacity: 0.1;
  transition: all 0.2s;
}
.cvp-information[data-active=true] {
  opacity: 1;
}

[data-type=overlay] .cvp-header {
  display: none;
}
</style>
