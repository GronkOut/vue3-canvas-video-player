<template>
  <div class="cvp-main">
    <video
      class="cvp-video"
      ref="video"
      :src="src"
      :muted="muted"
      :autoplay="autoplay"
      @loadedmetadata="onLoadedMetaData"
    />
    <canvas
      class="cvp-canvas"
      ref="canvas"
      @click="toggleVideoPlay"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import usePlayer from '../compositions/player';

// props
const props = defineProps({
  src: { type: String, default: false, required: true },
  muted: { type: Boolean, default: false },
  autoplay: { type: Boolean, default: false },
});

// refs
const video = ref(null);
const canvas = ref(null);

// composition
const { data, initialVideo, toggleVideoPlay } = usePlayer();

// handler
const onLoadedMetaData = () => {
  Object.assign(data, {
    video: {
      ...data.video,
      element: video.value,
      canvas: canvas.value,
      width: video.value.videoWidth,
      height: video.value.videoHeight,
      duration: video.value.duration,
      paused: !(props.muted === true && props.autoplay === true),
    }
  });

  initialVideo();
};
</script>

<style scoped>
.cvp-main {
  overflow: hidden;
  height: 100%;
  background-color: var(--color-15-100);
}
.cvp-video {
  visibility: hidden;
  width: 0;
  height: 0;
}
.cvp-canvas {
  object-fit: contain;
  width: 100%;
  height: 100%;
  vertical-align: top;
}
</style>
