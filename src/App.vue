<template>
  <div id="container">
    <Vue3CanvasVideoPlayer
      class="player"
      v-if="videoVisible"
      :src="'video.mp4'"
      :muted="muted"
      :autoplay="autoplay"
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
        <label for="muted">muted</label>
        <input type="checkbox" name="muted" checked @change="handleMuted" />
      </div>
      <div class="row">
        <label for="autoplay">autoplay</label>
        <input type="checkbox" name="autoplay" checked @change="handleAutoplay" />
      </div>
      <div class="row">
        <label for="range">range</label>
        <input type="text" disabled value="[10, 20]" style="width: 80px;" />
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
// import Vue3CanvasVideoPlayer from '../lib/Vue3CanvasVideoPlayer.vue';
import Vue3CanvasVideoPlayer from 'vue3-canvas-video-player';
import 'vue3-canvas-video-player/dist/style.css';

const videoVisible = ref(true);

const muted = ref(true);
const handleMuted = ({ target }) => {
  videoVisible.value = false;

  muted.value = target.checked;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const autoplay = ref(true);
const handleAutoplay = ({ target }) => {
  videoVisible.value = false;

  autoplay.value = target.checked;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const range = ref([10, 20]);
const handleRange = ({ target }) => {
  videoVisible.value = false;

  range.value = target.checked ? [10, 20] : [];

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const fps = ref(30);
const handleFps = ({ target }) => {
  videoVisible.value = false;

  fps.value = target.checked ? 30 : 0;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const tempData = {
  837: [0, 240, 130, 640],
  838: [0, 220, 200, 650],
  839: [0, 220, 260, 710],
  840: [0, 220, 260, 710],
  841: [0, 220, 310, 720],
  842: [0, 230, 340, 720],
  843: [0, 240, 370, 720],
  844: [0, 260, 390, 710],
  845: [0, 280, 410, 690],
  846: [0, 280, 410, 690],
  847: [0, 310, 420, 660],
  848: [10, 320, 420, 650],
  849: [10, 320, 420, 650],
  850: [20, 320, 430, 630],
  851: [40, 310, 450, 620],
  852: [40, 310, 450, 620],
  853: [50, 290, 470, 610],
  854: [60, 270, 480, 610],
  855: [70, 220, 500, 600],
  856: [80, 170, 500, 600],
  857: [90, 120, 490, 600],
  858: [90, 120, 490, 600],
  859: [110, 100, 460, 620],
  860: [120, 100, 430, 640],
  861: [110, 110, 420, 650],
  862: [90, 120, 400, 660],
  863: [80, 140, 390, 660],
  864: [80, 140, 390, 660],
  865: [70, 160, 380, 660],
  866: [60, 170, 380, 660],
  867: [60, 190, 380, 650],
  868: [70, 190, 400, 630],
  869: [80, 200, 420, 610],
  870: [80, 200, 420, 610],
  871: [90, 200, 430, 590],
  872: [110, 210, 440, 570],
  873: [120, 210, 450, 560],
  874: [140, 200, 460, 560],
  875: [150, 200, 470, 550],
  876: [150, 200, 470, 550],
  877: [170, 190, 490, 540],
  878: [180, 170, 510, 540],
  879: [180, 170, 510, 540],
  880: [180, 140, 530, 540],
  881: [180, 110, 540, 550],
  882: [180, 110, 540, 550],
  883: [170, 70, 600, 560],
  884: [180, 50, 650, 560],
  885: [180, 30, 690, 560],
  886: [190, 20, 710, 560],
  887: [190, 20, 710, 560],
};
const bbox = reactive({
  data: tempData,
  borderSize: 1,
  borderColor: 'rgba(255, 0, 0, 0.5)',
  fillColor: 'rgba(0, 0, 255, 0.5)',
});
const handleBbox = ({ target }) => {
  videoVisible.value = false;

  Object.assign(bbox, { data: target.checked ? tempData : {} });

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const type = ref('contain');
const handleType = ({ target }) => {
  videoVisible.value = false;

  type.value = target.value;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const messageTime = ref(1000);
const handleMessageTime = ({ target }) => {
  videoVisible.value = false;

  messageTime.value = Number(target.value);

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const preview = ref(true);
const handlePreview = ({ target }) => {
  videoVisible.value = false;

  preview.value = target.checked;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
};

const darkMode = ref(true);
const handleDarkMode = ({ target }) => {
  videoVisible.value = false;

  darkMode.value = target.checked;

  setTimeout(() => {
    videoVisible.value = true;
  }, 100);
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
  border-radius: 10px;
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