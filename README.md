# Vue3 Canvas Video Player

Canvas-based video player available on Vue3. If you enter FPS, it operates in frames. You can set the range and visualize the image recognition bounding-box data.

[Demo](https://stackblitz.com/edit/vue3-canvas-video-player?file=src/App.vue)

> Streaming videos may have delays. Local video files are recommended.

## Usage

### Install

```bash
npm install --save vue3-canvas-video-player
```

### Component

```jsx
<script setup>
import Vue3CanvasVideoPlayer from 'vue3-canvas-video-player';
import 'vue3-canvas-video-player/dist/style.css';
</script>

<template>
  <Vue3CanvasVideoPlayer
    :src="'video.mp4'" // ''
    :muted="true" // false
    :autoplay="true" // false
    :loop="true" // false
    :range="[10, 20]" // [0, 0]
    :fps="30" // 0
    :bbox="{
      data: {
        100: [0, 200, 100, 400],
        101: [10, 210, 110, 410],
        102: [20, 220, 120, 420],
      },
      borderSize: 1,
      borderColor: 'rgba(255, 0, 0, 0.5)',
      fillColor: 'rgba(0, 0, 255, 0.5)',
    }" // { data: {}, borderSize: 1, borderColor: 'rgba(255, 0, 0, 0.5)', fillColor: 'rgba(0, 0, 255, 0.5)' }; } }
    :type="'contain'" // 'overlay'
    :messageTime="1000" // 1000
    :preview="true" // false
    :darkMode="true" // true
    @loadedmetadata="(event) => console.log('loadedmetadata', event)"
    @play="(event) => console.log('play', event)"
    @pause="(event) => console.log('pause', event)"
    @timeupdate="(event) => console.log('timeupdate', event)"
    @volumechange="(event) => console.log('volumechange', event)"
    @error="(event) => console.log('error', event)"
  />
</template>
```

## Props

### src

Path to the video source file.

### muted

Defines the start-up mute state.

### autoplay

Automatically play video at startup. It only works when it is muted.

### loop

Which controls whether the media element should start over when it reaches the end.

### range

Use seconds to set the range of the beginning and end of the video.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/range.gif)

### fps

When you enter the FPS for the video, it operates in frames.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/fps.gif)

### bbox

Visualize the image recognition bounding-box data. You can change the line thickness, fill and line color. It only works when use FPS.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/bbox.gif)

### type

You can use 'contain' mode to prevent the controller from covering the screen, or 'overlay' mode for movie viewing.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/type.gif)

### messageTime

Sets the time when messages displayed in the center of the screen disappear. No message is displayed when `0`.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/messageTime.gif)

### preview

Displays a preview in the seek bar.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/preview.gif)

### darkMode

Use dark or light mode.

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/darkMode.gif)

## Events

### loadedmetadata

The `loadedmetadata` event is fired when the metadata has been loaded.

### play

The `play` event is fired when the `paused` property is changed from `true` to `false`, as a result of the `play` method, or the `autoplay` attribute.

### pause

The `pause` event is sent when a request to pause an activity is handled and the activity has entered its paused state, most commonly after the media has been paused through a call to the element's `pause()` method.

The event is sent once the `pause()` method returns and after the media element's `paused` property has been changed to `true`.

### timeupdate

The `timeupdate` event is fired when the time indicated by the `currentTime` attribute has been updated.

The event frequency is dependent on the system load, but will be thrown between about 4Hz and 66Hz (assuming the event handlers don't take longer than 250ms to run). User agents are encouraged to vary the frequency of the event based on the system load and the average cost of processing the event each time, so that the UI updates are not any more frequent than the user agent can comfortably handle while decoding the video.

### volumechange

The `volumechange` event is fired when the volume has changed.

### error

The `error` event is fired when the resource could not be loaded due to an error (for example, a network connectivity problem).

## Shortcuts

Keys | Description
:- | :-
`ctrl` + `alt` + `ArrowUp` | Volume up
`ctrl` + `alt` + `ArrowDown` | Volume down
`ctrl` + `alt` + `ArrowLeft` | Prev second or frame
`ctrl` + `alt` + `ArrowRight` | Next second or frame
`ctrl` + `alt` + `g` | Go to frame (FPS required)

## License

[MIT](http://opensource.org/licenses/MIT)
