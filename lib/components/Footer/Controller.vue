<template>
  <div class="cvp-controller">

    <!-- 재생 / 일시 정지 -->
    <button class="cvp-controller-button" :title="(data.video.paused) ? 'Play' : 'Pause'" @click="toggleVideoPlay">
      <!-- 재생 아이콘 -->
      <svg v-if="data.video.paused" class="cvp-controller-icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 4v16l13 -8z"></path>
      </svg>
      <!-- 일시 정지 아이콘 -->
      <svg v-else class="cvp-controller-icon" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    </button>

    <!-- 소리 -->
    <div class="cvp-controller-volume">
      <button class="cvp-controller-button" :title="(data.video.muted) ? 'Unmute' : 'Mute'" @click="toggleVideoMute">
        <!-- 소리 없음 아이콘 -->
        <svg v-if="data.video.muted" class="cvp-controller-icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          <path d="M16 10l4 4m0 -4l-4 4" />
        </svg>
        <!-- 소리 있음 아이콘 -->
        <svg v-else class="cvp-controller-icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      </button>
      <div class="cvp-controller-volume-drag">
        <div
          class="cvp-controller-volume-area"
          @mousedown.self="(event) => { data.container.mouseDown = true; changeVideoVolume(event); }"
          @mousemove="changeVideoVolume"
          @mouseup="data.container.mouseDown = false"
          @mouseleave="data.container.mouseDown = false"
        >
          <div class="cvp-controller-volume-bar" :style="{ height: `${ data.video.volume * 100 }%` }" />
        </div>
      </div>
    </div>

    <!-- 뒤로 이동 -->
    <button
      class="cvp-controller-button"
      title="Backward"
      @mousedown="data.container.mouseDown = true; changeVideoFrame(false)"
      @mouseup="data.container.mouseDown = false; changeVideoFrame(false)"
    >
      <svg class="cvp-controller-icon" viewBox="-1 -1 26 26" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 5v14l-12 -7z" />
        <line x1="4" y1="5" x2="4" y2="19" />
      </svg>
    </button>

    <!-- 앞으로 이동 -->
    <button
      class="cvp-controller-button"
      title="Forward"
      @mousedown="data.container.mouseDown = true; changeVideoFrame(true)"
      @mouseup="data.container.mouseDown = false; changeVideoFrame(true)"
    >
      <svg class="cvp-controller-icon" viewBox="-1 -1 26 26" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 5v14l12 -7z" />
        <line x1="20" y1="5" x2="20" y2="19" />
      </svg>
    </button>

    <div style="flex: 1" />

    <!-- 재생 속도 -->
    <div class="cvp-controller-playback-rate">
      <div class="cvp-controller-playback-rate-text" title="Playback rate">x{{ data.video.playbackRate?.toFixed(1) || '1.0' }}</div>
      <ul class="cvp-controller-playback-rate-list">
        <li class="cvp-controller-playback-rate-item" v-for="item in [0.1, 0.5, 1.0, 1.5, 2.0, 5.0]">
          <button class="cvp-controller-playback-rate-button" @click="setVideoPlaybackRate(item)">{{ item.toFixed(1) }}</button>
        </li>
      </ul>
    </div>

    <!-- 전체 / 구간 -->
    <button
      v-if="hasRange"
      class="cvp-controller-button"
      :class="data.range.enabled && 'cvp-controller-button-active'"
      :title="(data.range.enabled) ? 'Reset range' : 'Set range'"
      @click="toggleVideoRange"
    >
      <!-- 구간 아이콘 -->
      <svg v-if="data.range.enabled" class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 12h7l-3 -3m0 6l3 -3" />
        <path d="M21 12h-7l3 -3m0 6l-3 -3" />
        <path d="M9 6v-3h6v3" />
        <path d="M9 18v3h6v-3" />
      </svg>
      <!-- 전체 아이콘 -->
      <svg v-else class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 12h-7l3 -3m0 6l-3 -3" />
        <path d="M14 12h7l-3 -3m0 6l3 -3" />
        <path d="M3 6v-3h18v3" />
        <path d="M3 18v3h18v-3" />
      </svg>
    </button>

    <!-- 반복 -->
    <button
      class="cvp-controller-button"
      :class="data.video.loop && 'cvp-controller-button-active'"
      :title="(data.video.loop) ? 'Play once' : 'Repeat play'"
      @click="toggleVideoLoop"
    >
      <svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1.5" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
        <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
      </svg>
    </button>

    <!-- 바운딩 박스 -->
    <button
      v-if="hasFps && hasBbox"
      class="cvp-controller-button"
      :class="data.bbox.enabled && 'cvp-controller-button-active'"
      :title="(data.bbox.enabled) ? 'Hide bounding box' : 'Show bounding box'"
      @click="toggleVideoBbox"
    >
      <svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <line x1="5" y1="7" x2="5" y2="17" />
        <line x1="7" y1="5" x2="17" y2="5" />
        <line x1="7" y1="19" x2="17" y2="19" />
        <line x1="19" y1="7" x2="19" y2="17" />
      </svg>
    </button>

    <!-- 전체 화면 / 일반 화면 -->
    <button class="cvp-controller-button" :title="(data.container.fullScreen) ? 'Normal screen' : 'Full screen'" @click="toggleFullScreen">
      <!-- 일반 화면 아이콘 -->
      <svg v-if="data.container.fullScreen" class="cvp-controller-icon" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
        <path d="M15 5v2a2 2 0 0 0 2 2h2" />
        <path d="M5 15h2a2 2 0 0 1 2 2v2" />
        <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
      </svg>
      <!-- 전체 화면 아이콘 -->
      <svg v-else class="cvp-controller-icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
      </svg>
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import usePlayer from '../../compositions/player';

// composition
const {
  data,
  toggleVideoPlay,
  toggleVideoMute,
  changeVideoVolume,
  changeVideoFrame,
  setVideoPlaybackRate,
  setVideoRange,
  toggleVideoLoop,
  toggleVideoBbox,
  toggleFullScreen,
} = usePlayer();

// computed
const hasRange = computed(() => (data.range.start > 0) && (data.range.end > 0));
const hasFps = computed(() => data.video.fps > 0);
const hasBbox = computed(() => Object.keys(data.bbox.data).length > 0);

const toggleVideoRange = () => {
  setVideoRange(!data.range.enabled);
};
</script>

<style scoped>
.cvp-controller {
  display: flex;
  height: 30px;
  gap: 5px;
  background-color: var(--color-14-100);
}
.cvp-controller-button {
  overflow: hidden;
  display: flex;
  width: 30px;
  height: 30px;
  padding: 0;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: transparent;
  opacity: 0.5;
  transition: all 0.2s;
  cursor: pointer;
}
.cvp-controller-button:hover, .cvp-controller-button.cvp-controller-button-active {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-00-100));
}
.cvp-controller-icon {
  width: 100%;
  height: 100%;
  stroke: var(--color-00-100);
}
.cvp-controller-volume {
  position: relative;
}
.cvp-controller-volume:hover .cvp-controller-volume-drag {
  height: 120px;
  opacity: 1;
}
.cvp-controller-volume-drag {
  position: absolute;
  bottom: 100%;
  width: 30px;
  height: 0;
  background-color: var(--color-14-100);
  opacity: 0;
  transition: all 0.2s;
}
.cvp-controller-volume-area {
  position: absolute;
  inset: 10px;
  background-color: var(--color-13-100);
  cursor: pointer;
}
.cvp-controller-volume-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--color-05-100);
  pointer-events: none;
}
.cvp-controller-playback-rate {
  position: relative;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.cvp-controller-playback-rate:hover .cvp-controller-playback-rate-list {
  height: 150px;
  line-height: 14px;
  opacity: 1;
}
.cvp-controller-playback-rate-text {
  overflow: hidden;
  padding: 0 5px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  font-weight: 100;
  line-height: 28px;
  color: var(--color-00-100);
  opacity: 0.5;
  transition: all 0.2s;
}
.cvp-controller-playback-rate-text:hover {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-00-100));
}
.cvp-controller-playback-rate-list {
  overflow: hidden;
  position: absolute;
  bottom: 100%;
  margin: 0;
  padding: 5px 0 0;
  height: 0;
  list-style: none;
  background-color: var(--color-14-100);
  opacity: 0;
  transition: all 0.2s;
}
.cvp-controller-playback-rate-button {
  display: block;
  padding: 5px 10px;
  color: var(--color-05-100);
  border: 0;
  background-color: transparent;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
}
.cvp-controller-playback-rate-button:hover {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-05-100));
}

[data-type=overlay] .cvp-controller {
  background-color: transparent;
}
[data-type=overlay] .cvp-controller-volume-drag {
  bottom: calc(100% + 5px);
  background-color: var(--color-15-030);
}
[data-type=overlay] .cvp-controller-playback-rate-list {
  bottom: calc(100% + 5px);
  background-color: var(--color-15-030);
}
[data-type=overlay] .cvp-controller-playback-rate-button {
  color: var(--color-03-100);
}
</style>
