<template>
  <div id="container">
    <Vue3CanvasVideoPlayer
      class="player"
      v-if="videoVisible"
      :src="src"
      :muted="muted"
      :autoplay="autoplay"
      :loop="loop"
      :range="range"
      :fps="fps"
      :bbox="bbox"
      :type="type"
      :messageTime="messageTime"
      :preview="preview"
      :darkMode="darkMode"
    />
    <div class="panel">
      <div class="row">
        <label for="src">src</label>
        <input type="text" name="src" :value="src" @change="handleSrc" />
      </div>
      <div class="row">
        <label for="muted">muted</label>
        <input type="checkbox" name="muted" checked @change="handleMuted" />
      </div>
      <div class="row">
        <label for="autoplay">autoplay</label>
        <input type="checkbox" name="autoplay" checked @change="handleAutoplay" />
      </div>
      <div class="row">
        <label for="loop">loop</label>
        <input type="checkbox" name="loop" checked @change="handleLoop" />
      </div>
      <div class="row">
        <label for="range">range</label>
        <input type="text" disabled value="[10, 40]" style="width: 80px;" />
        <input type="checkbox" name="range" checked @change="handleRange" />
      </div>
      <div class="row">
        <label for="fps">fps</label>
        <input type="number" disabled value="30" style="width: 50px;" />
        <input type="checkbox" name="fps" checked @change="handleFps" />
      </div>
      <div class="row">
        <label for="bbox">bbox</label>
        <input type="checkbox" name="bbox" checked @change="handleBbox" />
      </div>
      <div class="row">
        <label for="type">type</label>
        <select name="type" @change="handleType">
          <option value="contain">contain</option>
          <option value="overlay">overlay</option>
        </select>
      </div>
      <div class="row">
        <label for="messageTime">messageTime</label>
        <input type="number" name="messageTime" value="1000" style="width: 50px;" @change="handleMessageTime" />
      </div>
      <div class="row">
        <label for="preview">preview</label>
        <input type="checkbox" name="preview" checked @change="handlePreview" />
      </div>
      <div class="row">
        <label for="darkMode">darkMode</label>
        <input type="checkbox" name="darkMode" checked @change="handleDarkMode" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Vue3CanvasVideoPlayer from '../lib/Vue3CanvasVideoPlayer.vue';
// import Vue3CanvasVideoPlayer from 'vue3-canvas-video-player';
// import 'vue3-canvas-video-player/dist/style.css';

const videoVisible = ref(true);

const src = ref('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
const handleSrc = ({ target }) => {
  src.value = target.value;
};

const muted = ref(true);
const handleMuted = ({ target }) => {
  muted.value = target.checked;
};

const autoplay = ref(true);
const handleAutoplay = ({ target }) => {
  autoplay.value = target.checked;
};

const loop = ref(true);
const handleLoop = ({ target }) => {
  loop.value = target.checked;
};

const range = ref([10, 40]);
const handleRange = ({ target }) => {
  range.value = target.checked ? [10, 40] : [];
};

const fps = ref(30);
const handleFps = ({ target }) => {
  fps.value = target.checked ? 30 : 0;
};

const tempData = {
  837: [{ label: 'test1', xywh: [0, 240, 130, 640] }, { label: 'test2 asdfasd qef qwdf as dfasdfqwef asdfasdf', xywh: [10, 340, 230, 740] } ],
  838: [{ label: 'test1', xywh: [0, 220, 200, 650] }, { label: 'test2', xywh: [10, 320, 300, 750] } ],
  839: [{ label: 'test1', xywh: [0, 220, 260, 710] }, { label: 'test2', xywh: [10, 320, 360, 810] } ],
  840: [{ label: 'test1', xywh: [0, 220, 260, 710] }, { label: 'test2', xywh: [10, 320, 360, 810] } ],
  841: [{ label: 'test1', xywh: [0, 220, 310, 720] }, { label: 'test2', xywh: [10, 320, 410, 820] } ],
  842: [{ label: 'test1', xywh: [0, 230, 340, 720] }, { label: 'test2', xywh: [10, 330, 440, 820] } ],
  843: [{ label: 'test1', xywh: [0, 240, 370, 720] }, { label: 'test2', xywh: [10, 340, 470, 820] } ],
  844: [{ label: 'test1', xywh: [0, 260, 390, 710] }, { label: 'test2', xywh: [10, 360, 490, 810] } ],
  845: [{ label: 'test1', xywh: [0, 280, 410, 690] }, { label: 'test2', xywh: [10, 380, 510, 790] } ],
  846: [{ label: 'test1', xywh: [0, 280, 410, 690] }, { label: 'test2', xywh: [10, 380, 510, 790] } ],
  847: [{ label: 'test1', xywh: [0, 310, 420, 660] }, { label: 'test2', xywh: [10, 410, 520, 760] } ],
};
const bbox = reactive({
  data: tempData,
  borderSize: 1,
  borderColor: 'rgba(255, 0, 0, 0.5)',
  fillColor: 'rgba(0, 0, 255, 0.5)',
});
const handleBbox = ({ target }) => {
  Object.assign(bbox, { data: target.checked ? tempData : {} });
};

const type = ref('contain');
const handleType = ({ target }) => {
  type.value = target.value;
};

const messageTime = ref(1000);
const handleMessageTime = ({ target }) => {
  messageTime.value = Number(target.value);
};

const preview = ref(true);
const handlePreview = ({ target }) => {
  preview.value = target.checked;
};

const darkMode = ref(true);
const handleDarkMode = ({ target }) => {
  darkMode.value = target.checked;
};
</script>

<style>
body {
  margin: 0;
  background-color: #777;
}
#container {
  display: flex;
  height: 80vh;
}
#container .player {
  overflow: hidden;
  flex: 1;
}
#container .panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 200px;
  gap: 10px;
}
#container .panel .row {
  display: flex;
  justify-content: space-between;
}
</style>