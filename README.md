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

### src

video source path

> default `''`

### muted

muted volume

> default `false`

### autoplay

autoplay video (when muted)

> default `false`

### range

range seconds  
ex `[1.2, 3.4]`

> default `[]`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/range.gif)

### fps

fps (use `0` to disable)

> default `0`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/fps.gif)

### bbox

bounding box (fps required)

> default `{}`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/bbox.gif)

### type

player style  
`overlay`, `contain`

> default `overlay` 

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/type.gif)

### messageTime

message time (use `0` to disable)

> default `1000`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/messageTime.gif)

### preview

preview on seek bar

> default `false`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/preview.gif)

### darkMode

use dark mode

> default `true`

![image](https://github.com/GronkOut/vue3-canvas-video-player/raw/main/public/darkMode.gif)

## Shortcuts

Keys | Description
:- | :-
`ctrl` + `alt` + `ArrowUp` | Volume up
`ctrl` + `alt` + `ArrowDown` | Volume down
`ctrl` + `alt` + `ArrowLeft` | Prev second or frame
`ctrl` + `alt` + `ArrowRight` | Next second or frame
`ctrl` + `alt` + `g` | Go to frame (fps required)
