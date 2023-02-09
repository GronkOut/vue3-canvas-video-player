<template>
  <div
    id="vue3-canvas-video-player"
    ref="container"
    :data-dark-mode="darkMode"
    :data-type="props.type"
  >
    <Header />
    <Main
      :src="props.src"
      :muted="props.muted"
      :autoplay="props.autoplay"
    />
    <Footer />
    <Message />
    <div v-if="!props.src.length" class="cvp-block">
      {{ data.block.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import usePlayer from './compositions/player';
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer/index.vue';
import Message from './components/Message.vue';

// props
const props = defineProps({
  src: { type: String, default: '', required: true }, // 리소스
  muted: { type: Boolean, default: false }, // 음소거
  autoplay: { type: Boolean, default: false }, // 자동재생
  loop: { type: Boolean, default: false }, // 반복
  range: { type: Array, validator: (value) => !value.length || (value.length === 2 && value.every((n) => (typeof n === 'number'))), default: () => ([0, 0]) }, // 구간
  fps: { type: Number, default: 0 }, // FPS
  bbox: { type: Object, default: () => ({ data: {}, textColor: '#fff', fillColor: 'rgba(0, 0, 255, 0.5)', borderSize: 1, borderColor: 'rgba(255, 0, 0, 0.5)' }) }, // 바운딩 박스
  type: { type: String, default: 'overlay' }, // 컨테인 스타일
  messageTime: { type: Number, default: 1000 }, // 메세지 시간
  preview: { type: Boolean, default: false }, // 미리보기
  darkMode: { type: Boolean, default: true }, // 색상
});

// refs
const container = ref(null);

// composition
const { data, setVideoRange, handleContainerMouseMove } = usePlayer();

// watch
watch(() => props, ({ src, muted, loop, range, fps, bbox, type, messageTime, preview }) => {
  Object.assign(data.container, { type });
  Object.assign(data.video, { src, muted, loop, fps });
  Object.assign(data.preview, { enabled: preview });
  Object.assign(data.range, { start: range[0], end: range[1] });
  Object.assign(data.bbox, { ...bbox });
  Object.assign(data.message, { time: messageTime });

  if (data.range.start && data.range.end) {
    setVideoRange(true);
  }

  if (Object.keys(data.bbox.data).length) {
    data.bbox.enabled = true;
  }
}, { deep: true });

onMounted(() => {
  Object.assign(data, { container: { ...data.container, element: container.value } });

  if (data.container.type === 'overlay') {
    data.container.element.addEventListener('mousemove', handleContainerMouseMove);
  }
});

onBeforeUnmount(() => {
  if (data.container.type === 'overlay') {
    data.container.element.removeEventListener('mousemove', handleContainerMouseMove);
  }
});
</script>

<style scoped>
#vue3-canvas-video-player {
  --header-height: 30px;
  --footer-height: 60px;

  --color-00-100: rgba(0, 0, 0, 1.0);
  --color-00-090: rgba(0, 0, 0, 0.9);
  --color-00-080: rgba(0, 0, 0, 0.8);
  --color-00-070: rgba(0, 0, 0, 0.7);
  --color-00-060: rgba(0, 0, 0, 0.6);
  --color-00-050: rgba(0, 0, 0, 0.5);
  --color-00-040: rgba(0, 0, 0, 0.4);
  --color-00-030: rgba(0, 0, 0, 0.3);
  --color-00-020: rgba(0, 0, 0, 0.2);
  --color-00-010: rgba(0, 0, 0, 0.1);

  --color-01-100: #111;
  --color-02-100: #222;
  --color-03-100: #333;
  --color-04-100: #444;
  --color-05-100: #555;
  --color-06-100: #666;
  --color-07-100: #777;
  --color-08-100: #888;
  --color-09-100: #999;
  --color-10-100: #aaa;
  --color-11-100: #bbb;
  --color-12-100: #ccc;
  --color-13-100: #ddd;
  --color-14-100: #eee;

  --color-15-000: rgba(255, 255, 255, 0);
  --color-15-010: rgba(255, 255, 255, 0.1);
  --color-15-020: rgba(255, 255, 255, 0.2);
  --color-15-030: rgba(255, 255, 255, 0.3);
  --color-15-040: rgba(255, 255, 255, 0.4);
  --color-15-050: rgba(255, 255, 255, 0.5);
  --color-15-060: rgba(255, 255, 255, 0.6);
  --color-15-070: rgba(255, 255, 255, 0.7);
  --color-15-080: rgba(255, 255, 255, 0.8);
  --color-15-090: rgba(255, 255, 255, 0.9);
  --color-15-100: rgba(255, 255, 255, 1.0);

  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);
  height: 100%;
  user-select: none;
}
#vue3-canvas-video-player[data-dark-mode=true] {
  --color-00-100: rgba(255, 255, 255, 1.0);
  --color-00-090: rgba(255, 255, 255, 0.9);
  --color-00-080: rgba(255, 255, 255, 0.8);
  --color-00-070: rgba(255, 255, 255, 0.7);
  --color-00-060: rgba(255, 255, 255, 0.6);
  --color-00-050: rgba(255, 255, 255, 0.5);
  --color-00-040: rgba(255, 255, 255, 0.4);
  --color-00-030: rgba(255, 255, 255, 0.3);
  --color-00-020: rgba(255, 255, 255, 0.2);
  --color-00-010: rgba(255, 255, 255, 0.1);

  --color-01-100: #eee;
  --color-02-100: #ddd;
  --color-03-100: #ccc;
  --color-04-100: #bbb;
  --color-05-100: #aaa;
  --color-06-100: #999;
  --color-07-100: #888;
  --color-08-100: #777;
  --color-09-100: #666;
  --color-10-100: #555;
  --color-11-100: #444;
  --color-12-100: #333;
  --color-13-100: #222;
  --color-14-100: #111;

  --color-15-000: rgba(0, 0, 0, 0);
  --color-15-010: rgba(0, 0, 0, 0.1);
  --color-15-020: rgba(0, 0, 0, 0.2);
  --color-15-030: rgba(0, 0, 0, 0.3);
  --color-15-040: rgba(0, 0, 0, 0.4);
  --color-15-050: rgba(0, 0, 0, 0.5);
  --color-15-060: rgba(0, 0, 0, 0.6);
  --color-15-070: rgba(0, 0, 0, 0.7);
  --color-15-080: rgba(0, 0, 0, 0.8);
  --color-15-090: rgba(0, 0, 0, 0.9);
  --color-15-100: rgba(0, 0, 0, 1.0);
}
#vue3-canvas-video-player[data-type=overlay] {
  display: block;
}

.cvp-block {
  position: absolute;
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
  color: var(--color-07-100);
  background-color: var(--color-15-050);
}
</style>
