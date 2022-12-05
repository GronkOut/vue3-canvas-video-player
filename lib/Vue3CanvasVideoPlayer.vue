<template>
  <div id="video-frame-canvas-player" ref="containerRef" :data-dark-mode="darkMode" :data-type="props.type">
    <!-- 헤더 -->
    <div class="header">
      <div class="time" :class="!player.range.enabled && 'active'">
        <span>{{ secondToTimeString(player.main.currentTime) }}</span>
        <span style="opacity: 0.5;"> / </span>
        <span>{{ secondToTimeString(player.main.duration) }}</span>
        <span v-if="hasFps">
          <span> [ {{ numericWithComma(secondToFrameNumber(player.main.currentTime)) }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ numericWithComma(secondToFrameNumber(player.main.duration)) }} ]</span>
        </span>
      </div>
      <div v-if="hasRange" class="time" :class="player.range.enabled && 'active'">
        <span>{{ secondToTimeString(player.main.currentTime) }}</span>
        <span style="opacity: 0.5;"> / </span>
        <span>{{ secondToTimeString(props.range[1]) }}</span>
        <span v-if="hasFps">
          <span> [ {{ numericWithComma(secondToFrameNumber(player.main.currentTime)) }}</span>
          <span style="opacity: 0.5;"> / </span>
          <span>{{ numericWithComma(secondToFrameNumber(props.range[1])) }} ]</span>
        </span>
      </div>
    </div>
    <!-- 메인 -->
    <div class="main">
      <video class="video-hidden" ref="mainVideoRef" :src="src" :muted="muted" :autoplay="autoplay" @loadedmetadata="initial" />
      <canvas class="canvas" ref="mainCanvasRef" @click="togglePlay" />
    </div>
    <!-- 푸터 -->
    <div class="footer" :class="player.mouse.move && 'active'" @mouseenter="player.mouse.hold = true" @mouseleave="player.mouse.hold = false; onContainerMouseMove()">
      <!-- 탐색 -->
      <div class="seek">
        <div class="drag">
          <div
            class="area"
            @mousedown.self="(event) => { player.mouse.down = true; setSeek(event); }"
            @mousemove="setSeek"
            @mouseup="player.mouse.down = false"
            @mouseleave="player.mouse.down = false"
          >
            <div class="bar" :style="{ width: `${ player.seek.width }%` }" />
            <div v-if="hasRange" class="range" :style="{ left: `${ player.range.left }px`, width: `${ player.range.width }px` }" />
          </div>
        </div>
        <div v-if="props.preview" class="preview" :style="{ left: `${ player.preview.left }px` }">
          <video class="video-hidden" ref="previewVideoRef" :src="src" />
          <canvas class="canvas" ref="previewCanvasRef" />
          <div class="time">{{ player.preview.time }}</div>
        </div>
      </div>
      <div class="controller">
        <!-- 재생 / 일시 정지 -->
        <button class="control-button" :title="(player.main.paused) ? 'Play' : 'Pause'" @click="togglePlay">
          <!-- 재생 아이콘 -->
          <svg v-if="player.main.paused" class="icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 4v16l13 -8z"></path>
          </svg>
          <!-- 일시 정지 아이콘 -->
          <svg v-else class="icon" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        </button>
        <!-- 소리 -->
        <div class="volume">
          <button class="control-button" :title="(player.main.muted) ? 'Unmute' : 'Mute'" @click="toggleMute">
            <!-- 소리 없음 아이콘 -->
            <svg v-if="player.main.muted" class="icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
              <path d="M16 10l4 4m0 -4l-4 4" />
            </svg>
            <!-- 소리 있음 아이콘 -->
            <svg v-else class="icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M15 8a5 5 0 0 1 0 8" />
              <path d="M17.7 5a9 9 0 0 1 0 14" />
              <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
            </svg>
          </button>
          <div class="drag">
            <div
              class="area"
              @mousedown.self="(event) => { player.mouse.down = true; changeVolume(event); }"
              @mousemove="changeVolume"
              @mouseup="player.mouse.down = false"
              @mouseleave="player.mouse.down = false"
            >
              <div class="bar" :style="{ height: `${ player.main.volume * 100 }%` }" />
            </div>
          </div>
        </div>
        <!-- 뒤로 이동 -->
        <button class="control-button" title="Backward" @mousedown="player.mouse.down = true; changeFrame(false)" @mouseup="player.mouse.down = false; changeFrame(false)">
          <!-- 뒤로 이동 아이콘 -->
          <svg class="icon" viewBox="-1 -1 26 26" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 5v14l-12 -7z" />
            <line x1="4" y1="5" x2="4" y2="19" />
          </svg>
        </button>
        <!-- 앞으로 이동 -->
        <button class="control-button" title="Forward" @mousedown="player.mouse.down = true; changeFrame(true)" @mouseup="player.mouse.down = false; changeFrame(true)">
          <!-- 앞으로 이동 아이콘 -->
          <svg class="icon" viewBox="-1 -1 26 26" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 5v14l12 -7z" />
            <line x1="20" y1="5" x2="20" y2="19" />
          </svg>
        </button>
        <div style="flex: 1" />
        <!-- 재생 속도 -->
        <div class="playback-rate">
          <div class="text">x{{ player.main.playbackRate?.toFixed(1) || '1.0' }}</div>
          <ul class="list">
            <li class="item" v-for="item in [0.1, 0.5, 1.0, 1.5, 2.0, 5.0]">
              <button class="button" @click="setPlaybackRate(item)">{{ item.toFixed(1) }}</button>
            </li>
          </ul>
        </div>
        <!-- 전체 / 구간 -->
        <button v-if="hasRange" class="control-button" :title="(player.range.enabled) ? 'Reset range' : 'Set range'" @click="toggleRange">
          <svg v-if="player.range.enabled" class="icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12h7l-3 -3m0 6l3 -3" />
            <path d="M21 12h-7l3 -3m0 6l-3 -3" />
            <path d="M9 6v-3h6v3" />
            <path d="M9 18v3h6v-3" />
          </svg>
          <svg v-else class="icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 12h-7l3 -3m0 6l-3 -3" />
            <path d="M14 12h7l-3 -3m0 6l3 -3" />
            <path d="M3 6v-3h18v3" />
            <path d="M3 18v3h18v-3" />
          </svg>
        </button>
        <!-- 바운딩 박스 -->
        <button v-if="hasFps && hasBbox" class="control-button" :class="player.bbox.enabled && 'active'" :title="(player.bbox.enabled) ? 'Hide bounding box' : 'Show bounding box'" @click="toggleBbox">
          <svg class="icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none">
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
        <button class="control-button" :title="(player.main.fullScreen) ? 'Normal screen' : 'Full screen'" @click="toggleScreen">
          <!-- 일반 화면 아이콘 -->
          <svg v-if="player.main.fullScreen" class="icon" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
            <path d="M15 5v2a2 2 0 0 0 2 2h2" />
            <path d="M5 15h2a2 2 0 0 1 2 2v2" />
            <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
          </svg>
          <!-- 전체 화면 아이콘 -->
          <svg v-else class="icon" viewBox="-2 -2 28 28" stroke-width="1" stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
          </svg>
        </button>
      </div>
    </div>
    <!-- 메세지 -->
    <div class="message">
      <div class="text" :class="(player.message.visible) ? 'show' : 'hide'" v-html="player.message.text" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// props
const props = defineProps({
  src: { type: String, default: '', required: true }, // 리소스
  muted: { type: Boolean, default: false }, // 음소거
  autoplay: { type: Boolean, default: false }, // 자동재생
  range: { type: Array, default() { return []; } }, // 구간
  fps: { type: Number, default: 0 }, // FPS
  bbox: { type: Object, default() { return {}; } }, // 바운딩 박스
  type: { type: String, default: 'overlay' }, // 컨테인 스타일
  messageTime: { type: Number, default: 1000 }, // 메세지 시간
  preview: { type: Boolean, default: false }, // 미리보기
  darkMode: { type: Boolean, default: true }, // 색상
});

// computed
const hasRange = computed(() => (props.range[0] > 0) && (props.range[1] > 0));
const hasFps = computed(() => props.fps > 0);
const hasBbox = computed(() => props.bbox?.data && Object.keys(props.bbox.data).length > 0);

// refs
const containerRef = ref(null);
const mainVideoRef = ref(null);
const mainCanvasRef = ref(null);
const previewVideoRef = ref(null);
const previewCanvasRef = ref(null);

// datas
const player = reactive({
  main: {
    video: null,
    canvas: null,
    context: null,
    width: 0,
    height: 0,
    paused: true,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
    fullScreen: false,
    currentTime: 0,
    duration: 0,
    ended: false,
  },
  seek: { width: 0, total: 0 },
  range: { enabled: false, left: 0, width: 0 },
  bbox: { enabled: false, data: {}, borderSize: 1, borderColor: 'rgba(255, 0, 0, 0.5)', fillColor: 'rgba(0, 0, 255, 0.5)' },
  message: { visible: false, text: '' },
  preview: { element: null, context: null, left: 0, time: '00:00:00' },
  mouse: { down: false, move: false, hold: false },
});

// 초기화
const initial = () => {
  Object.assign(player, {
    main: {
      ...player.main,
      video: mainVideoRef.value,
      canvas: mainCanvasRef.value,
      context: mainCanvasRef.value.getContext('2d'),
      width: mainVideoRef.value.videoWidth,
      height: mainVideoRef.value.videoHeight,
      paused: !(props.muted === true && props.autoplay === true),
      muted: props.muted,
      duration: mainVideoRef.value.duration,
    },
    seek: { ...player.seek, total: containerRef.value.offsetWidth },
    range: { ...player.range, enabled: hasRange.value },
    bbox: { ...player.bbox, ...props.bbox, enabled: hasBbox.value },
    preview: {
      ...player.preview,
      video: previewVideoRef.value,
      canvas: previewCanvasRef.value,
      context: previewCanvasRef.value?.getContext('2d'),
      width: previewVideoRef.value?.videoWidth,
      height: previewVideoRef.value?.videoHeight,
    },
  });

  const {
    main: {
      video: mainVideo,
      canvas: mainCanvas,
      context: mainContext,
      width: mainVideoWidth,
      height: mainVideoHeight,
      duration: mainVideoDuration,
    },
    preview: { video: previewVideo, canvas: previewCanvas, context: previewContext },
  } = player;

  const previewViewWidth = mainVideoWidth * 0.3;
  const previewViewHeight = mainVideoHeight * 0.3;

  mainCanvas.width = mainVideoWidth;
  mainCanvas.height = mainVideoHeight;

  if (props.preview) {
    previewCanvas.width = previewViewWidth;
    previewCanvas.height = previewViewHeight;
  }

  if (hasRange.value) {
    mainVideo.currentTime = props.range[0];
  }

  const draw = () => {
    const {
      range: { enabled: rangeEnabled },
    } = player;

    mainContext.drawImage(mainVideo, 0, 0, mainVideoWidth, mainVideoHeight);

    if (props.preview) {
      previewContext.imageSmoothingEnabled = true;
      previewContext.drawImage(previewVideo, 0, 0, previewViewWidth, previewViewHeight);
    }

    const currentTime = player.main.currentTime = mainVideo.currentTime;

    checkRangeEnd();

    if (hasRange.value && rangeEnabled) {
      player.seek.width = (((currentTime - props.range[0]) / (props.range[1] - props.range[0])) * 100).toFixed(10);
    } else {
      player.seek.width = ((currentTime / mainVideoDuration) * 100).toFixed(10);
    }

    if (mainVideo.paused && Math.floor(player.seek.width) === 100) {
      player.main.paused = true;
    }

    if (hasFps && hasBbox && player.bbox.enabled) {
      const frameNumber = secondToFrameNumber(currentTime);
      const bboxData = player.bbox.data[frameNumber];

      if (bboxData && bboxData.length === 4) {
        const x = bboxData[0];
        const y = bboxData[1];
        const w = bboxData[2] - bboxData[0];
        const h = bboxData[3] - bboxData[1];

        mainContext.fillStyle = player.bbox.fillColor;
        mainContext.fillRect(x, y, w, h);

        if (player.bbox.borderSize) {
          mainContext.lineWidth = player.bbox.borderSize;
          mainContext.strokeStyle = player.bbox.borderColor;
          mainContext.strokeRect(x - player.bbox.borderSize / 2, y - player.bbox.borderSize / 2, w + player.bbox.borderSize, h + player.bbox.borderSize);
        }
      }
    }

    window.requestAnimationFrame(draw);
  };

  draw();

  window.dispatchEvent(new Event('resize'));
};

// 공통 함수
const secondToTimeString = (seconds) => {
  const sec = parseInt(seconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return `${ (h < 10) ? '0' + h : h }:${ (m < 10) ? '0' + m : m }:${ (s < 10) ? '0' + s : s }`;
};
const secondToFrameNumber = (seconds) => Math.round(seconds * props.fps);
const frameNumberToSecond = (frameNumber) => frameNumber / props.fps;
const numericWithComma = (value) => {
  if (value === undefined) return false;

  return new Intl.NumberFormat().format(value);
};

// 메세지
let setMessageTimer;
const setMessage = (text) => {
  if (!props.messageTime) return;

  const { message } = player;

  message.text = text;
  message.visible = true;

  if (setMessageTimer) clearTimeout(setMessageTimer);

  setMessageTimer = setTimeout(() => {
    message.visible = false;
  }, props.messageTime);
};

// 탐색
const setSeek = ({ offsetX }) => {
  const {
    main: { duration: mainVideoDuration },
    seek: { total: seekTotal },
    preview: { video: previewVideo },
    range: { enabled: rangeEnabled },
    mouse: { down: mouseDown },
  } = player;

  const currentTime = (rangeEnabled) ? ((offsetX / seekTotal) * (props.range[1] - props.range[0])) + props.range[0] : (offsetX / seekTotal) * mainVideoDuration;

  if (mouseDown) {
    setFrame(currentTime);
  }

  if (props.preview) {
    previewVideo.currentTime = currentTime;

    player.preview.time = secondToTimeString(currentTime);

    if (offsetX < 65) {
      player.preview.left = 65;
    } else if (offsetX > seekTotal - 65) {
      player.preview.left = seekTotal - 65;
    } else {
      player.preview.left = offsetX;
    }
  }
}

// 재생 / 일시 정지
let togglePlayTimer;
const togglePlay = ({ detail }) => {
  if (detail === 1) {
    const {
      main: { video: mainVideo, paused: mainVideoPaused },
      range: { enabled: rangeEnabled },
    } = player;

    togglePlayTimer = setTimeout(() => {
      if (mainVideoPaused) {
        if (hasRange.value && rangeEnabled && mainVideo.currentTime === props.range[1]) {
          mainVideo.currentTime = props.range[0];
        }

        mainVideo.play();
      } else {
        mainVideo.pause();
      }

      setMessage((mainVideoPaused) ? 'Play' : 'Pause');

      player.main.paused = !mainVideoPaused;
    }, 250);
  } else if (detail === 2) {
    clearTimeout(togglePlayTimer);

    toggleScreen();
  }
};

// 소리 설정
const setVolume = (value) => {
  const {
    main: { video: mainVideo },
  } = player;

  const volume = Math.max(Math.min(value, 1), 0);

  mainVideo.volume = player.main.volume = volume;

  setMessage(`Volume ${ Math.floor(volume * 100) }%`);
}

// 소리 변경
const changeVolume = ({ offsetY }) => {
  const {
    mouse: { down: mouseDown },
  } = player;

  if (mouseDown) {
    setVolume((100 - offsetY) / 100);
  }
}

// 소리 토글
const toggleMute = () => {
  const {
    main: { video: mainVideo, muted: mainVideoMuted },
  } = player;

  mainVideo.muted = player.main.muted = !mainVideoMuted;

  setMessage((mainVideoMuted) ? 'Unmuted' : 'Muted');
};

// 프레임 설정
const setFrame = (time) => {
  const {
    main: { video: mainVideo, duration: mainVideoDuration },
    range: { enabled: rangeEnabled },
  } = player;

  mainVideo.currentTime = (hasRange.value && rangeEnabled) ? Math.max(Math.min(time, props.range[1]), props.range[0]) : Math.max(Math.min(time, mainVideoDuration), 0);

  setMessage(`Seek ${
    secondToTimeString(mainVideo.currentTime)
  } ${
    (hasFps.value) ? `[${ numericWithComma(secondToFrameNumber(mainVideo.currentTime)) }]` : ''
  } (${
    (hasRange.value && rangeEnabled) ? Math.round((mainVideo.currentTime - props.range[0]) / (props.range[1] - props.range[0]) * 100) : Math.round(mainVideo.currentTime / mainVideoDuration * 100)
  }%)`);
};

// 프레임 앞으로
const forwardFrame = () => {
  const {
    main: { video: mainVideo },
  } = player;

  if (hasFps.value) {
    setFrame(frameNumberToSecond(secondToFrameNumber(mainVideo.currentTime) + 1));
  } else {
    setFrame(mainVideo.currentTime + 1);
  }
};

// 프레임 뒤로
const backwardFrame = () => {
  const {
    main: { video: mainVideo },
  } = player;

  if (hasFps.value) {
    setFrame(frameNumberToSecond(secondToFrameNumber(mainVideo.currentTime) - 1));
  } else {
    setFrame(mainVideo.currentTime - 1);
  }
};

// 프레임 변경
let changeFrameInterval;
const changeFrame = (forward) => {
  const {
    mouse: { down: mouseDown },
  } = player;

  if (mouseDown) {
    changeFrameInterval = setInterval(() => {
      setFrame(forward);
    }, 60);
  } else {
    clearInterval(changeFrameInterval);
  }
};

// 재생 속도
const setPlaybackRate = (value) => {
  const {
    main: { video: mainVideo },
  } = player;

  mainVideo.playbackRate = player.main.playbackRate = value;

  setMessage(`Playback Rate x${ value.toFixed(1) }`);
};

// 바운딩 박스
const toggleBbox = () => {
  const {
    bbox: { enabled: bboxEnabled },
  } = player;

  player.bbox.enabled = !bboxEnabled;

  setMessage((bboxEnabled) ? 'Hide bounding box' : 'Show bounding box');
};

// 전체 / 구간
const checkRangeEnd = () => {
  const {
    main: { video: mainVideo },
    range: { enabled: rangeEnabled },
  } = player;

  if (!(hasRange.value && rangeEnabled)) return;

  if (mainVideo.currentTime < props.range[0]) {
    mainVideo.currentTime = props.range[0];
  }

  if (mainVideo.currentTime > props.range[1]) {
    mainVideo.currentTime = props.range[1];

    mainVideo.pause();

    player.main.paused = true;
  }
};

// 구간 설정
const setRange = () => {
  const {
    main: { duration: mainVideoDuration },
    seek: { total: seekTotal },
    range: { enabled: rangeEnabled },
  } = player;

  checkRangeEnd();

  player.range.left = (hasRange.value && rangeEnabled) ? 0 : (props.range[0] / mainVideoDuration) * seekTotal;
  player.range.width = (hasRange.value && rangeEnabled) ? seekTotal : ((props.range[1] / mainVideoDuration) * seekTotal) - ((props.range[0] / mainVideoDuration) * seekTotal);
};

// 구간 토글
const toggleRange = () => {
  const {
    range: { enabled: rangeEnabled },
  } = player;

  player.range.enabled = !rangeEnabled;

  setRange();

  setMessage((rangeEnabled) ? 'Inactive range' : 'Active range');
};

// 전체화면 / 일반 화면
const toggleScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    containerRef.value.requestFullscreen();
  }
};

// 윈도우 리사이즈
const onWindowResize = () => {
  player.seek.total = containerRef.value.offsetWidth;

  if (hasRange.value) {
    setRange();
  }

  if (props.preview) {
    player.preview.left = 0;
  }
};

// 키 다운
const onWindowKeydown = ({ altKey, ctrlKey, key }) => {
  const {
    main: { video: mainVideo, paused: mainVideoPaused, volume: mainVideoVolume },
  } = player;

  if (altKey && ctrlKey) {
    if (key === 'g' && hasFps.value) { // 프레임 이동
      const frameNumber = window.prompt('Go to frame number', secondToFrameNumber(mainVideo.currentTime));

      if (mainVideoPaused) {
        mainVideo.pause();
      }

      mainVideo.currentTime = frameNumberToSecond(frameNumber);
    }

    if (key === 'ArrowUp') { // 소리 증가
      setVolume(mainVideoVolume + 0.05);
    }

    if (key === 'ArrowDown') { // 소리 감소
      setVolume(mainVideoVolume - 0.05);
    }

    if (key === 'ArrowLeft') { // 프레임 뒤로 이동
      backwardFrame();
    }

    if (key === 'ArrowRight') { // 프레임 앞으로 이동
      forwardFrame();
    }
  }
};

// 화면 전환
const onDocumentFullscreenChange = () => {
  player.main.fullScreen = Boolean(document.fullscreenElement);

  setMessage(`${ (player.main.fullScreen) ? 'Full' : 'Normal' } screen`);
};

// 마우스 이동
let onContainerMouseMoveTimer;
const onContainerMouseMove = () => {
  if (onContainerMouseMoveTimer) clearTimeout(onContainerMouseMoveTimer);

  player.mouse.move = true;

  if (player.mouse.hold) return;

  onContainerMouseMoveTimer = setTimeout(() => {
    player.mouse.move = false;
  }, 1000);
};

// 마운트
onMounted(() => {
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', onWindowKeydown);

  document.addEventListener('fullscreenchange', onDocumentFullscreenChange);

  if (props.type === 'overlay') containerRef.value.addEventListener('mousemove', onContainerMouseMove);
});

// 언마운트
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('keydown', onWindowKeydown);

  document.removeEventListener('fullscreenchange', onDocumentFullscreenChange);

  if (props.type === 'overlay') containerRef.value?.removeEventListener('mousemove', onContainerMouseMove);
});
</script>

<style scoped>
/* 플레이어 */
#video-frame-canvas-player {
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
  display: grid;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);
  height: 100%;
  user-select: none;
}
#video-frame-canvas-player[data-dark-mode=true] {
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
#video-frame-canvas-player[data-type=overlay] {
  display: block;
}
#video-frame-canvas-player[data-type=overlay] .header {
  display: none;
}
#video-frame-canvas-player[data-type=overlay] .footer {
  position: absolute;
  inset: auto 0 0;
  height: 70px;
  background: linear-gradient(var(--color-15-000), var(--color-15-100));
  transform: translateY(100px);
  transition: all 0.5s ease-out;
}
#video-frame-canvas-player[data-type=overlay] .footer.active {
  transform: translateY(0);
}
#video-frame-canvas-player[data-type=overlay] .seek {
  background-color: transparent;
}
#video-frame-canvas-player[data-type=overlay] .seek .preview {
  margin-bottom: 0;
}
#video-frame-canvas-player[data-type=overlay] .controller {
  height: 40px;
  background-color: transparent;
}
#video-frame-canvas-player[data-type=overlay] .controller .volume .drag {
  background-color: var(--color-15-050);
}
#video-frame-canvas-player[data-type=overlay] .controller .playback-rate .list {
  background-color: var(--color-15-050);
}

.video-hidden {
  visibility: hidden;
  width: 0;
  height: 0;
}

/* 헤더 */
#video-frame-canvas-player .header {
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  width: 100%;
  height: var(--header-height);
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-14-100);
}
#video-frame-canvas-player .header .time {
  font-size: 14px;
  color: var(--color-00-100);
  opacity: 0.1;
  transition: all 0.2s;
}
#video-frame-canvas-player .header .time.active {
  opacity: 1;
}

/* 메인 */
#video-frame-canvas-player .main {
  overflow: hidden;
  height: 100%;
  background-color: var(--color-15-100);
}
#video-frame-canvas-player .canvas {
  object-fit: contain;
  width: 100%;
  height: 100%;
  vertical-align: top;
}

/* 푸터 */
#video-frame-canvas-player .footer {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: var(--footer-height);
}
#video-frame-canvas-player .seek {
  position: relative;
  height: 30px;
  background-color: var(--color-13-100);
}
#video-frame-canvas-player .seek .drag {
  height: 100%;
}
#video-frame-canvas-player .seek .drag:hover + .preview {
  bottom: 100%;
  opacity: 1;
}
#video-frame-canvas-player .seek .drag .area {
  position: absolute;
  inset: 0;
  cursor: pointer;
}
#video-frame-canvas-player .seek .drag .area:before {
  position: absolute;
  inset: 10px 0;
  background-color: var(--color-14-100);
  content: '';
}
#video-frame-canvas-player .seek .drag .bar {
  position: absolute;
  inset: 10px auto;
  height: 10px;
  background-color: var(--color-05-100);
  pointer-events: none;
}
#video-frame-canvas-player .seek .drag .bar:before {
  position: absolute;
  inset: -2px -1px -2px auto;
  width: 2px;
  background-color: var(--color-05-100);
  filter: drop-shadow(0 0 3px var(--color-00-100));
  content: '';
}
#video-frame-canvas-player .seek .drag .range {
  position: absolute;
  inset: 10px auto;
  height: 10px;
  background-color: #409eff;
  mix-blend-mode: hard-light;
  pointer-events: none;
}
#video-frame-canvas-player .seek .preview {
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
#video-frame-canvas-player .seek .preview .canvas {
  width: 100%;
  height: auto;
  vertical-align: top;
}
#video-frame-canvas-player .seek .preview .time {
  margin-top: 5px;
  text-align: center;
  font-size: 11px;
  color: var(--color-05-100);
}

/* 컨트롤러 */
#video-frame-canvas-player .controller {
  display: flex;
  height: 30px;
  gap: 5px;
  background-color: var(--color-14-100);
}

/* 토글 버튼 */
#video-frame-canvas-player .controller .control-button {
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
#video-frame-canvas-player .controller .control-button.active,
#video-frame-canvas-player .controller .control-button:hover {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-00-100));
}
#video-frame-canvas-player .controller .icon {
  width: 100%;
  height: 100%;
  stroke: var(--color-00-100);
}

/* 소리 */
#video-frame-canvas-player .controller .volume {
  position: relative;
}
#video-frame-canvas-player .controller .volume:hover .drag {
  height: 120px;
  opacity: 1;
}
#video-frame-canvas-player .controller .volume .drag {
  position: absolute;
  bottom: 100%;
  width: 30px;
  height: 0;
  background-color: var(--color-14-100);
  opacity: 0;
  transition: all 0.2s;
}
#video-frame-canvas-player .controller .volume .drag .area {
  position: absolute;
  inset: 10px;
  background-color: var(--color-13-100);
  cursor: pointer;
}
#video-frame-canvas-player .controller .volume .drag .bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--color-05-100);
  pointer-events: none;
}

/* 재생 속도 */
#video-frame-canvas-player .controller .playback-rate {
  position: relative;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#video-frame-canvas-player .controller .playback-rate:hover .list {
  height: 150px;
  opacity: 1;
}
#video-frame-canvas-player .controller .playback-rate .text {
  overflow: hidden;
  padding: 0 5px;
  height: 30px;
  font-size: 15px;
  font-weight: 100;
  line-height: 28px;
  color: var(--color-00-100);
  opacity: 0.5;
  transition: all 0.2s;
}
#video-frame-canvas-player .controller .playback-rate .text:hover {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-00-100));
}
#video-frame-canvas-player .controller .playback-rate .list {
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
#video-frame-canvas-player .controller .playback-rate .item .button {
  display: block;
  padding: 5px 10px;
  color: var(--color-05-100);
  border: 0;
  background-color: transparent;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
}
#video-frame-canvas-player .controller .playback-rate .item .button:hover {
  opacity: 1;
  filter: drop-shadow(0 0 3px var(--color-05-100));
}

/* 메세지 */
#video-frame-canvas-player .message {
  position: absolute;
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
#video-frame-canvas-player .message .text {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-15-050);
  color: var(--color-00-100);
  opacity: 0;
}
#video-frame-canvas-player .message .text.show {
  animation: fadeIn 0.5s 1 forwards;
}
#video-frame-canvas-player .message .text.hide {
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
