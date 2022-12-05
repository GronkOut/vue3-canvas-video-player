# Vue3 Canvas Video Player

## Usage

### Install

```bash
npm install --save vue3-canvas-video-player
```

### Component

```jsx
<script>
import Vue3CanvasVideoPlayer from 'vue3-canvas-video-player';
import 'vue3-canvas-video-player/dist/style.css';
</script>

<template>
  <Vue3CanvasVideoPlayer
    :src="'video.mp4'"
    :muted="true"
    :autoplay="true"
    :range="[10, 20]"
    :fps="30"
    :bbox="{
      data: {
        100: [0, 200, 100, 400],
        101: [10, 210, 110, 410],
        102: [20, 220, 120, 420],
      },
      borderSize: 1,
      borderColor: 'rgba(255, 0, 0, 0.5)',
      fillColor: 'rgba(0, 0, 255, 0.5)',
    }"
    :type="'contain'"
    :messageTime="1000"
    :preview="true"
    :darkMode="true"
  />
</template>
```

## Props

Prop | Description | Default
:- | :- | :-
`src` | video source path | `''`
`muted` | muted volume | `false`
`autoplay` | autoplay video (when muted) | `false`
`range` | range seconds (`[1.2, 3.4]`) | `[]`
`fps` | fps (use `0` to disable) | `0`
`bbox` | bounding box (fps required) | `{}`
`type` | player style (`overlay`, `contain`) | `overlay`
`messageTime` | message time (use `0` to disable) | `0`
`preview` | preview on seek bar | `false`
`darkMode` | use dark mode | `true`
