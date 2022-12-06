<template>
  <div class="cvp-seek">
    <div class="cvp-seek-drag">
      <div
        class="cvp-seek-area"
        @mousedown.self="(event) => { data.container.mouseDown = true; setVideoSeek(event); }"
        @mousemove="setVideoSeek"
        @mouseup="data.container.mouseDown = false"
        @mouseleave="data.container.mouseDown = false"
      >
        <div class="cvp-seek-bar" :style="{ width: `${ data.seek.width }%` }" />
        <div v-if="hasRange" class="cvp-seek-range" :style="{ left: `${ data.range.left }px`, width: `${ data.range.width }px` }" />
      </div>
    </div>
    <div v-if="data.preview.enabled" class="cvp-seek-preview" :style="{ left: `${ data.preview.left }px` }">
      <video class="cvp-seek-preview-video" ref="video" :src="data.video.src" @loadedmetadata="onLoadedMetaData" />
      <canvas class="cvp-seek-preview-canvas" ref="canvas" />
      <div class="cvp-seek-preview-time">{{ data.preview.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import usePlayer from '../../compositions/player';

// refs
const video = ref(null);
const canvas = ref(null);

// composition
const { data, setVideoSeek } = usePlayer();

// computed
const hasRange = computed(() => (data.range.start > 0) && (data.range.end > 0));

// handler
const onLoadedMetaData = () => {
  const {
    video: { width: videoWidth, height: videoHeight },
    preview: { enabled: previewEnabled },
  } = data;

  if (!previewEnabled) return;

  const context = canvas.value.getContext('2d');
  const canvasWidth = videoWidth * 0.3;
  const canvasHeight = videoHeight * 0.3;

  canvas.value.width = canvasWidth;
  canvas.value.height = canvasHeight;

  Object.assign(data, {
    preview: {
      ...data.preview,
      element: video.value,
    },
  });

  const drawCanvas = () => {
    if (!video.value) return;

    context.imageSmoothingEnabled = true;
    context.drawImage(video.value, 0, 0, canvasWidth, canvasHeight);

    window.requestAnimationFrame(drawCanvas);
  };

  drawCanvas();
};
</script>

<style scoped>
.cvp-seek {
  position: relative;
  height: 30px;
  background-color: var(--color-13-100);
}
.cvp-seek-drag {
  height: 100%;
}
.cvp-seek-drag:hover + .cvp-seek-preview {
  bottom: 100%;
  opacity: 1;
}
.cvp-seek-area {
  position: absolute;
  inset: 0;
  cursor: pointer;
}
.cvp-seek-area:before {
  position: absolute;
  inset: 10px 0;
  background-color: var(--color-14-100);
  content: '';
}
.cvp-seek-bar {
  position: absolute;
  inset: 10px auto;
  height: 10px;
  background-color: var(--color-05-100);
  pointer-events: none;
}
.cvp-seek-bar:before {
  position: absolute;
  inset: -2px -1px -2px auto;
  width: 2px;
  background-color: var(--color-05-100);
  filter: drop-shadow(0 0 3px var(--color-00-100));
  content: '';
}
.cvp-seek-range {
  position: absolute;
  inset: 10px auto;
  height: 10px;
  background-color: #409eff;
  mix-blend-mode: hard-light;
  pointer-events: none;
}
.cvp-seek-preview {
  position: absolute;
  bottom: 50%;
  width: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
  background-color: var(--color-13-100);
  transform: translateX(-50%);
  transition: bottom 0.2s, opacity 0.2s;
  pointer-events: none;
  opacity: 0;
}
.cvp-seek-preview-video {
  visibility: hidden;
  width: 0;
  height: 0;
}
.cvp-seek-preview-canvas {
  width: 100%;
  height: auto;
  vertical-align: top;
}
.cvp-seek-preview-time {
  margin-top: 5px;
  text-align: center;
  font-size: 11px;
  color: var(--color-05-100);
}

[data-type=overlay] .cvp-seek {
  height: 10px;
  background-color: transparent;
}
[data-type=overlay] .cvp-seek-area:before {
  inset: 0;
  background-color: var(--color-00-010);
}
[data-type=overlay] .cvp-seek-bar {
  top: 0;
  background-color: var(--color-15-050);
}
[data-type=overlay] .cvp-seek-range {
  top: 0;
}
[data-type=overlay] .cvp-seek-bar:before {
  background-color: var(--color-00-030);
  filter: drop-shadow(0 0 3px var(--color-00-050));
}
</style>
