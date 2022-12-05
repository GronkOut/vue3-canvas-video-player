export const secondToTimeString = (seconds) => {
  const sec = parseInt(seconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return `${ (h < 10) ? '0' + h : h }:${ (m < 10) ? '0' + m : m }:${ (s < 10) ? '0' + s : s }`;
};

export const secondToFrameNumber = (seconds) => Math.round(seconds * props.fps);

export const frameNumberToSecond = (frameNumber) => frameNumber / props.fps;

export const numericWithComma = (value) => {
  if (value === undefined) return false;

  return new Intl.NumberFormat().format(value);
};
