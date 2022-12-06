import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { secondToTimeString, secondToFrameNumber, frameNumberToSecond, numericWithComma } from '../utils';

const data = reactive({
  container: {
    element: null,
    fullScreen: false,
    type: 'overlay',
    mouseDown: false,
    mouseMove: false,
    mouseHold: false,
  },
  video: {
    element: null,
    canvas: null,
    width: 0,
    height: 0,
    duration: 0,
    currentTime: 0,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
    paused: true,
    fps: 0,
  },
  seek: {
    width: 0,
    total: 0,
  },
  preview: {
    enabled: false,
    element: null,
    left: 0,
    time: '00:00:00',
  },
  range: {
    start: 0,
    end: 0,
    left: 0,
    width: 0,
    enabled: false,
  },
  bbox: {
    data: {},
    borderSize: 1,
    borderColor: 'rgba(255, 0, 0, 0.5)',
    fillColor: 'rgba(0, 0, 255, 0.5)',
    enabled: false,
  },
  message: {
    time: 1000,
    visible: false,
    text: '',
  },
});

let mounted = false;

export default function() {
  // 컴퓨티드
  const hasRange = computed(() => (data.range.start > 0) && (data.range.end > 0));
  const hasFps = computed(() => data.video.fps > 0);
  const hasBbox = computed(() => Object.keys(data.bbox.data).length > 0);

  // 비디오 초기화
  const initialVideo = () => {
    const {
      video: { element: videoElement, canvas: videoCanvas, width: videoWidth, height: videoHeight, duration: videoDuration, fps: videoFps },
      range: { start: rangeStart, end: rangeEnd },
      bbox: { data: bboxData, fillColor: bboxFillColor, borderSize: bboxBorderSize, borderColor: bboxBorderColor },
    } = data;

    const context = videoCanvas.getContext('2d');

    videoCanvas.width = videoWidth;
    videoCanvas.height = videoHeight;

    if (hasRange.value) {
      videoElement.currentTime = rangeStart;
    }

    const drawCanvas = () => {
      const {
        range: { enabled: rangeEnabled },
        bbox: { enabled: bboxEnabled },
      } = data;

      context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

      const currentTime = data.video.currentTime = videoElement.currentTime;

      checkRange();

      if (hasRange.value && rangeEnabled) {
        data.seek.width = (((currentTime - rangeStart) / (rangeEnd - rangeStart)) * 100).toFixed(10);
      } else {
        data.seek.width = ((currentTime / videoDuration) * 100).toFixed(10);
      }

      if (hasFps.value && hasBbox.value && bboxEnabled) {
        const frameNumber = secondToFrameNumber(currentTime, videoFps);
        const bbox = bboxData[frameNumber];

        if (bbox && bbox.length === 4) {
          const x = bbox[0];
          const y = bbox[1];
          const w = bbox[2] - bbox[0];
          const h = bbox[3] - bbox[1];

          context.fillStyle = bboxFillColor;
          context.fillRect(x, y, w, h);

          if (bboxBorderSize) {
            context.lineWidth = bboxBorderSize;
            context.strokeStyle = bboxBorderColor;
            context.strokeRect(x - bboxBorderSize / 2, y - bboxBorderSize / 2, w + bboxBorderSize, h + bboxBorderSize);
          }
        }
      }

      if (videoElement.paused && Math.floor(data.seek.width) === 100) {
        data.video.paused = true;
      }

      window.requestAnimationFrame(drawCanvas);
    };

    drawCanvas();

    window.dispatchEvent(new Event('resize'));
  };

  // 프레임 설정
  const setFrame = (time) => {
    const {
      video: { element: videoElement, duration: videoDuration, fps: videoFps },
      range: { enabled: rangeEnabled, start: rangeStart, end: rangeEnd },
    } = data;

    videoElement.currentTime = (hasRange.value && rangeEnabled) ? Math.max(Math.min(time, rangeEnd), rangeStart) : Math.max(Math.min(time, videoDuration), 0);

    setMessage(`Seek ${
      secondToTimeString(videoElement.currentTime)
    } ${
      (hasFps.value) ? `[${ numericWithComma(secondToFrameNumber(videoElement.currentTime, videoFps)) }]` : ''
    } (${
      (hasRange.value && rangeEnabled) ? Math.round((videoElement.currentTime - rangeStart) / (rangeEnd - rangeStart) * 100) : Math.round(videoElement.currentTime / videoDuration * 100)
    }%)`);
  };

  // 탐색
  const setVideoSeek = ({ offsetX }) => {
    const {
      container: { mouseDown: containerMouseDown },
      video: { duration: videoDuration },
      seek: { total: seekTotal },
      preview: { enabled: previewEnabled, element: previewElement },
      range: { enabled: rangeEnabled, start: rangeStart, end: rangeEnd },
    } = data;

    const currentTime = (rangeEnabled) ? ((offsetX / seekTotal) * (rangeEnd - rangeStart)) + rangeStart : (offsetX / seekTotal) * videoDuration;

    if (containerMouseDown) {
      setFrame(currentTime);
    }

    if (previewEnabled) {
      previewElement.currentTime = currentTime;

      data.preview.time = secondToTimeString(currentTime);

      if (offsetX < 65) {
        data.preview.left = 65;
      } else if (offsetX > seekTotal - 65) {
        data.preview.left = seekTotal - 65;
      } else {
        data.preview.left = offsetX;
      }
    }
  }

  // 재생 / 일시 정지
  let toggleVideoPlayTimer;
  const toggleVideoPlay = ({ detail }) => {
    if (detail === 1) {
      const {
        video: { element: videoElement, paused: videoPaused },
        range: { enabled: rangeEnabled, start: rangeStart, end: rangeEnd },
      } = data;

      toggleVideoPlayTimer = setTimeout(() => {
        if (videoPaused) {
          if (hasRange.value && rangeEnabled && videoElement.currentTime === rangeEnd) {
            videoElement.currentTime = rangeStart;
          }

          videoElement.play();
        } else {
          videoElement.pause();
        }

        setMessage((videoPaused) ? 'Play' : 'Pause');

        data.video.paused = !videoPaused;
      }, 250);
    } else if (detail === 2) {
      clearTimeout(toggleVideoPlayTimer);

      toggleFullScreen();
    }
  };

  // 소리 설정
  const setVolume = (value) => {
    const {
      video: { element: videoElement },
    } = data;

    const volume = Math.max(Math.min(value, 1), 0);

    videoElement.volume = data.video.volume = volume;

    setMessage(`Volume ${ Math.floor(volume * 100) }%`);
  }

  // 볼륨 변경
  const changeVideoVolume = ({ offsetY }) => {
    const {
      container: { mouseDown: containerMouseDown },
    } = data;

    if (containerMouseDown) {
      setVolume((100 - offsetY) / 100);
    }
  }

  // 볼륨 토글
  const toggleVideoMute = () => {
    const {
      video: { element: videoElement, muted: videoMuted },
    } = data;

    videoElement.muted = data.video.muted = !videoMuted;

    setMessage((videoMuted) ? 'Unmuted' : 'Muted');
  };

  // 프레임 앞으로
  const forwardFrame = () => {
    const {
      video: { element: videoElement, fps: videoFps },
    } = data;

    if (hasFps.value) {
      setFrame(frameNumberToSecond(secondToFrameNumber(videoElement.currentTime, videoFps) + 1, videoFps));
    } else {
      setFrame(videoElement.currentTime + 1);
    }
  };

  // 프레임 뒤로
  const backwardFrame = () => {
    const {
      video: { element: videoElement, fps: videoFps },
    } = data;

    if (hasFps.value) {
      setFrame(frameNumberToSecond(secondToFrameNumber(videoElement.currentTime, videoFps) - 1, videoFps));
    } else {
      setFrame(videoElement.currentTime - 1);
    }
  };

  // 프레임 변경
  let changeVideoFrameInterval;
  const changeVideoFrame = (forward) => {
    const {
      container: { mouseDown: containerMouseDown },
    } = data;

    if (containerMouseDown) {
      changeVideoFrameInterval = setInterval(() => {
        if (forward) {
          forwardFrame();
        } else {
          backwardFrame();
        }
      }, 60);
    } else {
      clearInterval(changeVideoFrameInterval);
    }
  };

  // 재생 속도
  const setVideoPlaybackRate = (value) => {
    const {
      video: { element: videoElement },
    } = data;

    videoElement.playbackRate = data.video.playbackRate = value;

    setMessage(`Playback Rate x${ value.toFixed(1) }`);
  };

  // 전체 / 구간
  const checkRange = () => {
    const {
      video: { element: videoElement },
      range: { enabled: rangeEnabled, start: rangeStart, end: rangeEnd },
    } = data;

    if (!(hasRange.value && rangeEnabled)) return;

    if (videoElement.currentTime < rangeStart) {
      videoElement.currentTime = rangeStart;
    }

    if (videoElement.currentTime > rangeEnd) {
      videoElement.currentTime = rangeEnd;

      videoElement.pause();

      data.video.paused = true;
    }
  };

  // 구간 설정
  const setRange = () => {
    const {
      video: { duration: videoDuration },
      seek: { total: seekTotal },
      range: { enabled: rangeEnabled, start: rangeStart, end: rangeEnd },
    } = data;

    checkRange();

    data.range.left = (hasRange.value && rangeEnabled) ? 0 : (rangeStart / videoDuration) * seekTotal;
    data.range.width = (hasRange.value && rangeEnabled) ? seekTotal : ((rangeEnd / videoDuration) * seekTotal) - ((rangeStart / videoDuration) * seekTotal);
  };

  // 구간
  const toggleVideoRange = () => {
    const {
      range: { enabled: rangeEnabled },
    } = data;

    data.range.enabled = !rangeEnabled;

    setRange();

    setMessage((rangeEnabled) ? 'Inactive range' : 'Active range');
  };

  // 바운딩 박스
  const toggleVideoBbox = () => {
    const {
      bbox: { enabled: bboxEnabled },
    } = data;

    data.bbox.enabled = !bboxEnabled;

    setMessage((bboxEnabled) ? 'Hide bounding box' : 'Show bounding box');
  };

  // 메세지
  let setMessageTimer;
  const setMessage = (text) => {
    const { message } = data;
    const { time: messageTime } = message;

    if (!messageTime) return;

    message.text = text;
    message.visible = true;

    if (setMessageTimer) clearTimeout(setMessageTimer);

    setMessageTimer = setTimeout(() => {
      message.visible = false;
    }, messageTime);
  };

  // 전체화면 / 일반 화면
  const toggleFullScreen = () => {
    const {
      container: { element: containerElement },
    } = data;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerElement.requestFullscreen();
    }
  };

  // 윈도우 리사이즈
  const onWindowResize = () => {
    const {
      container: { element: containerElement },
      preview: { enabled: previewEnabled },
    } = data;

    data.seek.total = containerElement.offsetWidth;

    if (hasRange.value) {
      setRange();
    }

    if (previewEnabled) {
      data.preview.left = 0;
    }
  };

  // 윈도우 키 다운
  const onWindowKeydown = ({ altKey, ctrlKey, key }) => {
    const {
      video: { element: videoElement, paused: videoPaused, volume: videoVolume, fps: videoFps },
    } = data;

    if (altKey && ctrlKey) {
      if (key === 'g' && hasFps.value) { // 프레임 이동
        const frameNumber = window.prompt('Go to frame number', secondToFrameNumber(videoElement.currentTime, videoFps));

        if (videoPaused) {
          videoElement.pause();
        }

        videoElement.currentTime = frameNumberToSecond(frameNumber, videoFps);
      }

      if (key === 'ArrowUp') { // 소리 증가
        setVolume(videoVolume + 0.05);
      }

      if (key === 'ArrowDown') { // 소리 감소
        setVolume(videoVolume - 0.05);
      }

      if (key === 'ArrowLeft') { // 프레임 뒤로 이동
        backwardFrame();
      }

      if (key === 'ArrowRight') { // 프레임 앞으로 이동
        forwardFrame();
      }
    }
  };

  // 다큐먼트 화면 전환
  const onDocumentFullScreenChange = () => {
    data.container.fullScreen = Boolean(document.fullscreenElement);

    setMessage(`${ (data.container.fullScreen) ? 'Full' : 'Normal' } screen`);
  };

  // 컨테이너 마우스 이동
  let onContainerMouseMoveTimer;
  const onContainerMouseMove = () => {
    if (onContainerMouseMoveTimer) clearTimeout(onContainerMouseMoveTimer);

    data.container.mouseMove = true;

    if (data.container.mouseHold) return;

    onContainerMouseMoveTimer = setTimeout(() => {
      data.container.mouseMove = false;
    }, 1000);
  };

  // 마운트
  onMounted(() => {
    if (mounted) return;

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', onWindowKeydown);

    document.addEventListener('fullscreenchange', onDocumentFullScreenChange);

    mounted = true;
  });

  // 언마운트
  onUnmounted(() => {
    if (!mounted) return;

    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('keydown', onWindowKeydown);

    document.removeEventListener('fullscreenchange', onDocumentFullScreenChange);

    mounted = false;
  });

  // 반환
  return {
    data,
    initialVideo,
    setVideoSeek,
    toggleVideoPlay,
    toggleVideoMute,
    changeVideoVolume,
    changeVideoFrame,
    setVideoPlaybackRate,
    toggleVideoRange,
    toggleVideoBbox,
    toggleFullScreen,
    setMessage,
    onContainerMouseMove,
  };
}