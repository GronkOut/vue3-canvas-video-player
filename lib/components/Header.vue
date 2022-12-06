<template>
  <div class="cvp-header">
    <div class="cvp-information" :class="!data.range.enabled && 'cvp-information-active'">
      <span>{{ secondToTimeString(data.video.currentTime) }}</span>
      <span style="opacity: 0.5;"> / </span>
      <span>{{ secondToTimeString(data.video.duration) }}</span>
      <span v-if="hasFps">
          <span> [ {{ numericWithComma(secondToFrameNumber(data.video.currentTime, data.video.fps)) }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ numericWithComma(secondToFrameNumber(data.video.duration, data.video.fps)) }} ]</span>
        </span>
    </div>
    <div v-if="hasRange" class="cvp-information" :class="data.range.enabled && 'cvp-information-active'">
      <span>{{ secondToTimeString(data.video.currentTime) }}</span>
      <span style="opacity: 0.5;"> / </span>
      <span>{{ secondToTimeString(data.range.end) }}</span>
      <span v-if="hasFps">
          <span> [ {{ numericWithComma(secondToFrameNumber(data.video.currentTime, data.video.fps)) }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ numericWithComma(secondToFrameNumber(data.range.end, data.video.fps)) }} ]</span>
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
  background-color: var(--color-14-100);
}
.cvp-information {
  font-size: 14px;
  color: var(--color-00-100);
  opacity: 0.1;
  transition: all 0.2s;
}
.cvp-information.cvp-information-active {
  opacity: 1;
}

[data-type=overlay] .cvp-header {
  display: none;
}
</style>
