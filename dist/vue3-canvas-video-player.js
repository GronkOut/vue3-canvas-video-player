import { reactive as Te, computed as F, onMounted as pe, onUnmounted as $e, openBlock as p, createElementBlock as f, createElementVNode as n, normalizeClass as N, unref as t, toDisplayString as M, createCommentVNode as D, pushScopeId as fe, popScopeId as me, ref as U, withModifiers as he, normalizeStyle as j, Fragment as Ee, renderList as Ve, createStaticVNode as G, createVNode as I, onBeforeUnmount as Se } from "vue";
const W = (r) => {
  const e = parseInt(r), v = Math.floor(e / 3600), s = Math.floor(e % 3600 / 60), i = e % 60;
  return `${v < 10 ? "0" + v : v}:${s < 10 ? "0" + s : s}:${i < 10 ? "0" + i : i}`;
}, C = (r, e) => Math.round(r * e), te = (r, e) => r / e, q = (r) => r === void 0 ? !1 : new Intl.NumberFormat().format(r), a = Te({
  container: {
    element: null,
    fullScreen: !1,
    type: "overlay",
    mouseDown: !1,
    mouseMove: !1,
    mouseHold: !1
  },
  video: {
    element: null,
    canvas: null,
    width: 0,
    height: 0,
    duration: 0,
    currentTime: 0,
    muted: !1,
    volume: 1,
    loop: !1,
    playbackRate: 1,
    paused: !0,
    fps: 0
  },
  progress: {
    seekWidth: 0,
    seekTotal: 0,
    bufferWidth: 0
  },
  preview: {
    enabled: !1,
    element: null,
    left: 0,
    time: "00:00:00"
  },
  range: {
    start: 0,
    end: 0,
    left: 0,
    width: 0,
    enabled: !1
  },
  bbox: {
    data: {},
    borderSize: 1,
    borderColor: "rgba(255, 0, 0, 0.5)",
    fillColor: "rgba(0, 0, 255, 0.5)",
    enabled: !1
  },
  message: {
    time: 1e3,
    visible: !1,
    text: ""
  },
  block: {
    visible: !1,
    text: ""
  }
});
let Q = !1;
function P() {
  const r = F(() => a.range.start > 0 && a.range.end > 0), e = F(() => a.video.fps > 0), v = F(() => Object.keys(a.bbox.data).length > 0), s = () => {
    const {
      video: { element: o, canvas: l, width: c, height: b, duration: _, fps: x },
      range: { start: T, end: O },
      bbox: { data: K, fillColor: ee, borderSize: V, borderColor: ye }
    } = a, L = l.getContext("2d");
    l.width = c, l.height = b, o.loop = a.video.loop, r.value && (o.currentTime = T);
    const ie = () => {
      const {
        video: { loop: we },
        range: { enabled: ke },
        bbox: { enabled: xe }
      } = a;
      L.drawImage(o, 0, 0, c, b);
      let J = a.video.currentTime = o.currentTime;
      if (r.value && ke ? (A(), a.progress.seekWidth = ((J - T) / (O - T) * 100).toFixed(10), a.progress.bufferWidth = 100) : (o.ended && we && (J = 0), a.progress.seekWidth = (J / _ * 100).toFixed(10), o.buffered.length > 0 && (a.progress.bufferWidth = o.buffered.end(o.buffered.length - 1) / _ * 100)), e.value && v.value && xe) {
        const Me = C(J, x), B = K[Me];
        if (B && B.length === 4) {
          const de = B[0], ce = B[1], ve = B[2] - B[0], ue = B[3] - B[1];
          L.fillStyle = ee, L.fillRect(de, ce, ve, ue), V && (L.lineWidth = V, L.strokeStyle = ye, L.strokeRect(de - V / 2, ce - V / 2, ve + V, ue + V));
        }
      }
      o.paused && Math.floor(a.progress.seekWidth) === 100 && (a.video.paused = !0), window.requestAnimationFrame(ie);
    };
    ie();
  }, i = (o) => {
    const {
      video: { element: l, duration: c, fps: b },
      range: { enabled: _, start: x, end: T }
    } = a;
    l.currentTime = r.value && _ ? Math.max(Math.min(o, T), x) : Math.max(Math.min(o, c), 0), E(`Seek ${W(l.currentTime)} ${e.value ? `[${q(C(l.currentTime, b))}]` : ""} (${r.value && _ ? Math.round((l.currentTime - x) / (T - x) * 100) : Math.round(l.currentTime / c * 100)}%)`);
  }, w = ({ offsetX: o }) => {
    const {
      container: { mouseDown: l },
      video: { element: c, duration: b },
      progress: { seekTotal: _ },
      preview: { enabled: x, element: T },
      range: { enabled: O, start: K, end: ee }
    } = a;
    if (!c)
      return;
    const V = O ? o / _ * (ee - K) + K : o / _ * b;
    l && i(V), x && (T.currentTime = V, a.preview.time = W(V), o < 65 ? a.preview.left = 65 : o > _ - 65 ? a.preview.left = _ - 65 : a.preview.left = o);
  };
  let S;
  const $ = ({ detail: o }) => {
    if (o === 1) {
      const {
        video: { element: l, paused: c },
        range: { enabled: b, start: _, end: x }
      } = a;
      S = setTimeout(() => {
        c ? (r.value && b && l.currentTime === x && (l.currentTime = _), l.play()) : l.pause(), E(c ? "Play" : "Pause"), a.video.paused = !c;
      }, 250);
    } else
      o === 2 && (clearTimeout(S), ae());
  }, g = (o) => {
    const {
      video: { element: l }
    } = a, c = Math.max(Math.min(o, 1), 0);
    l.volume = a.video.volume = c, E(`Volume ${Math.floor(c * 100)}%`);
  }, k = ({ offsetY: o }) => {
    const {
      container: { mouseDown: l }
    } = a;
    l && g((100 - o) / 100);
  }, m = () => {
    const {
      video: { element: o, muted: l }
    } = a;
    o.muted = a.video.muted = !l, E(l ? "Unmuted" : "Muted");
  }, h = () => {
    const {
      video: { element: o, fps: l }
    } = a;
    e.value ? i(te(C(o.currentTime, l) + 1, l)) : i(o.currentTime + 1);
  }, H = () => {
    const {
      video: { element: o, fps: l }
    } = a;
    e.value ? i(te(C(o.currentTime, l) - 1, l)) : i(o.currentTime - 1);
  };
  let z;
  const oe = (o) => {
    const {
      container: { mouseDown: l }
    } = a;
    l ? z = setInterval(() => {
      o ? h() : H();
    }, 60) : clearInterval(z);
  }, d = (o) => {
    const {
      video: { element: l }
    } = a;
    l.playbackRate = a.video.playbackRate = o, E(`Playback Rate x${o.toFixed(1)}`);
  }, A = () => {
    const {
      video: { element: o, loop: l },
      range: { enabled: c, start: b, end: _ }
    } = a;
    !o || !(r.value && c) || (o.currentTime < b && (o.currentTime = b), o.currentTime > _ && (l ? o.currentTime = b : (o.currentTime = _, o.pause(), a.video.paused = !0)));
  }, u = () => {
    const {
      video: { element: o, duration: l },
      progress: { seekTotal: c },
      range: { enabled: b, start: _, end: x }
    } = a;
    !o || (A(), a.range.left = r.value && b ? 0 : _ / l * c, a.range.width = r.value && b ? c : x / l * c - _ / l * c);
  }, ne = () => {
    const {
      range: { enabled: o }
    } = a;
    a.range.enabled = !o, u(), E(o ? "Inactive range" : "Active range");
  }, _e = () => {
    const {
      video: { element: o, loop: l }
    } = a;
    o.loop = a.video.loop = !l, E(l ? "Play once" : "Repeat play");
  }, ge = () => {
    const {
      bbox: { enabled: o }
    } = a;
    a.bbox.enabled = !o, E(o ? "Hide bounding box" : "Show bounding box");
  };
  let Z;
  const E = (o) => {
    const { message: l } = a, { time: c } = l;
    !c || (l.text = o, l.visible = !0, Z && clearTimeout(Z), Z = setTimeout(() => {
      l.visible = !1;
    }, c));
  }, ae = () => {
    const {
      container: { element: o }
    } = a;
    document.fullscreenElement ? document.exitFullscreen() : o.requestFullscreen();
  }, se = () => {
    const {
      container: { element: o },
      preview: { enabled: l }
    } = a;
    a.progress.seekTotal = o.offsetWidth, r.value && u(), l && (a.preview.left = 0);
  }, le = ({ altKey: o, ctrlKey: l, key: c }) => {
    const {
      video: { element: b, paused: _, volume: x, fps: T }
    } = a;
    if (o && l) {
      if (c === "g" && e.value) {
        const O = window.prompt("Go to frame number", C(b.currentTime, T));
        _ && b.pause(), b.currentTime = te(O, T);
      }
      c === "ArrowUp" && g(x + 0.05), c === "ArrowDown" && g(x - 0.05), c === "ArrowLeft" && H(), c === "ArrowRight" && h();
    }
  }, re = () => {
    a.container.fullScreen = Boolean(document.fullscreenElement), E(`${a.container.fullScreen ? "Full" : "Normal"} screen`);
  };
  let X;
  const be = () => {
    X && clearTimeout(X), a.container.mouseMove = !0, !a.container.mouseHold && (X = setTimeout(() => {
      a.container.mouseMove = !1;
    }, 2e3));
  };
  return pe(() => {
    Q || (window.addEventListener("resize", se), window.addEventListener("keydown", le), document.addEventListener("fullscreenchange", re), setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300), Q = !0);
  }), $e(() => {
    !Q || (window.removeEventListener("resize", se), window.removeEventListener("keydown", le), document.removeEventListener("fullscreenchange", re), Q = !1);
  }), {
    data: a,
    initialVideo: s,
    setVideoSeek: w,
    toggleVideoPlay: $,
    toggleVideoMute: m,
    changeVideoVolume: k,
    changeVideoFrame: oe,
    setVideoPlaybackRate: d,
    toggleVideoRange: ne,
    toggleVideoLoop: _e,
    toggleVideoBbox: ge,
    toggleFullScreen: ae,
    setMessage: E,
    onContainerMouseMove: be
  };
}
const R = (r, e) => {
  const v = r.__vccOpts || r;
  for (const [s, i] of e)
    v[s] = i;
  return v;
}, Y = (r) => (fe("data-v-05360fd3"), r = r(), me(), r), Ce = { class: "cvp-header" }, Fe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, De = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), He = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = { key: 0 }, Pe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = {
  __name: "Header",
  setup(r) {
    const { data: e } = P(), v = F(() => e.range.start > 0 && e.range.end > 0), s = F(() => e.video.fps > 0);
    return (i, w) => (p(), f("div", Ce, [
      n("div", {
        class: N(["cvp-information", !t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, M(t(W)(t(e).video.currentTime)), 1),
        Fe,
        n("span", null, M(t(W)(t(e).video.duration)), 1),
        t(s) ? (p(), f("span", Be, [
          n("span", null, " [ " + M(t(q)(t(C)(t(e).video.currentTime, t(e).video.fps))), 1),
          De,
          n("span", null, M(t(q)(t(C)(t(e).video.duration, t(e).video.fps))) + " ]", 1)
        ])) : D("", !0)
      ], 2),
      t(v) ? (p(), f("div", {
        key: 0,
        class: N(["cvp-information", t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, M(t(W)(t(e).video.currentTime)), 1),
        He,
        n("span", null, M(t(W)(t(e).range.end)), 1),
        t(s) ? (p(), f("span", ze, [
          n("span", null, " [ " + M(t(q)(t(C)(t(e).video.currentTime, t(e).video.fps))), 1),
          Pe,
          n("span", null, M(t(q)(t(C)(t(e).range.end, t(e).video.fps))) + " ]", 1)
        ])) : D("", !0)
      ], 2)) : D("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ R(Re, [["__scopeId", "data-v-05360fd3"]]);
const Ie = { class: "cvp-main" }, We = ["src", "muted", "autoplay"], Ne = {
  __name: "Main",
  props: {
    src: { type: String, default: !1, required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 }
  },
  emits: [
    "loadedmetadata",
    "play",
    "pause",
    "timeupdate",
    "volumechange",
    "error"
  ],
  setup(r, { emit: e }) {
    const v = r, s = U(null), i = U(null), { data: w, initialVideo: S, toggleVideoPlay: $ } = P(), g = (k) => {
      Object.assign(w, {
        video: {
          ...w.video,
          element: s.value,
          canvas: i.value,
          width: s.value.videoWidth,
          height: s.value.videoHeight,
          duration: s.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), S(), e("loadedmetadata", k);
    };
    return (k, m) => (p(), f("div", Ie, [
      n("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: s,
        src: r.src,
        muted: r.muted,
        autoplay: r.autoplay,
        onLoadedmetadata: m[0] || (m[0] = (h) => g(h)),
        onPlay: m[1] || (m[1] = (h) => e("play", h)),
        onPause: m[2] || (m[2] = (h) => e("pause", h)),
        onTimeupdate: m[3] || (m[3] = (h) => e("timeupdate", h)),
        onVolumechange: m[4] || (m[4] = (h) => e("volumechange", h)),
        onError: m[5] || (m[5] = (h) => e("error", h))
      }, null, 40, We),
      n("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: i,
        onClick: m[6] || (m[6] = (...h) => t($) && t($)(...h))
      }, null, 512)
    ]));
  }
}, Ae = /* @__PURE__ */ R(Ne, [["__scopeId", "data-v-c9a7d0c6"]]);
const Oe = { class: "cvp-progress" }, je = { class: "cvp-progress-drag" }, qe = ["src"], Ue = { class: "cvp-progress-preview-time" }, Ge = {
  __name: "Progress",
  setup(r) {
    const e = U(null), v = U(null), { data: s, setVideoSeek: i } = P(), w = F(() => s.range.start > 0 && s.range.end > 0), S = () => {
      const {
        video: { width: $, height: g },
        preview: { enabled: k }
      } = s;
      if (!k)
        return;
      const m = v.value.getContext("2d"), h = $ * 0.3, H = g * 0.3;
      v.value.width = h, v.value.height = H, Object.assign(s, {
        preview: {
          ...s.preview,
          element: e.value
        }
      });
      const z = () => {
        !e.value || (m.imageSmoothingEnabled = !0, m.drawImage(e.value, 0, 0, h, H), window.requestAnimationFrame(z));
      };
      z();
    };
    return ($, g) => (p(), f("div", Oe, [
      n("div", je, [
        n("div", {
          class: "cvp-progress-area",
          onMousedown: g[0] || (g[0] = he((k) => {
            t(s).container.mouseDown = !0, t(i)(k);
          }, ["self"])),
          onMousemove: g[1] || (g[1] = (...k) => t(i) && t(i)(...k)),
          onMouseup: g[2] || (g[2] = (k) => t(s).container.mouseDown = !1),
          onMouseleave: g[3] || (g[3] = (k) => t(s).container.mouseDown = !1)
        }, [
          n("div", {
            class: "cvp-progress-buffer",
            style: j({ width: `${t(s).progress.bufferWidth}%` })
          }, null, 4),
          n("div", {
            class: "cvp-progress-bar",
            style: j({ width: `${t(s).progress.seekWidth}%` })
          }, null, 4),
          t(w) ? (p(), f("div", {
            key: 0,
            class: "cvp-progress-range",
            style: j({ left: `${t(s).range.left}px`, width: `${t(s).range.width}px` })
          }, null, 4)) : D("", !0)
        ], 32)
      ]),
      t(s).preview.enabled ? (p(), f("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: j({ left: `${t(s).preview.left}px` })
      }, [
        n("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: e,
          src: t(s).video.src,
          onLoadedmetadata: S
        }, null, 40, qe),
        n("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        n("div", Ue, M(t(s).preview.time), 1)
      ], 4)) : D("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ R(Ge, [["__scopeId", "data-v-1d33ca57"]]);
const y = (r) => (fe("data-v-09e1eca1"), r = r(), me(), r), Je = { class: "cvp-controller" }, Qe = ["title"], Ye = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ze = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Xe = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M7 4v16l13 -8z" }, null, -1)), et = [
  Ze,
  Xe
], tt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ot = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), nt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), at = /* @__PURE__ */ y(() => /* @__PURE__ */ n("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), st = [
  ot,
  nt,
  at
], lt = { class: "cvp-controller-volume" }, rt = ["title"], it = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, dt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ct = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), vt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), ut = [
  dt,
  ct,
  vt
], pt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ft = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), mt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ht = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), _t = /* @__PURE__ */ y(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), gt = [
  ft,
  mt,
  ht,
  _t
], bt = { class: "cvp-controller-volume-drag" }, yt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("svg", {
  class: "cvp-controller-icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ n("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ n("path", { d: "M20 5v14l-12 -7z" }),
  /* @__PURE__ */ n("line", {
    x1: "4",
    y1: "5",
    x2: "4",
    y2: "19"
  })
], -1)), wt = [
  yt
], kt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("svg", {
  class: "cvp-controller-icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ n("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ n("path", { d: "M4 5v14l12 -7z" }),
  /* @__PURE__ */ n("line", {
    x1: "20",
    y1: "5",
    x2: "20",
    y2: "19"
  })
], -1)), xt = [
  kt
], Mt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), Tt = { class: "cvp-controller-playback-rate" }, $t = { class: "cvp-controller-playback-rate-text" }, Et = { class: "cvp-controller-playback-rate-list" }, Vt = { class: "cvp-controller-playback-rate-item" }, St = ["onClick"], Ct = ["title"], Ft = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Bt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M9 6v-3h6v3" data-v-09e1eca1></path><path d="M9 18v3h6v-3" data-v-09e1eca1></path>', 5), Dt = [
  Bt
], Ht = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, zt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M3 6v-3h18v3" data-v-09e1eca1></path><path d="M3 18v3h18v-3" data-v-09e1eca1></path>', 5), Pt = [
  zt
], Rt = ["title"], Lt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("svg", {
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1.5",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ n("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ n("path", { d: "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }),
  /* @__PURE__ */ n("path", { d: "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" })
], -1)), It = [
  Lt
], Wt = ["title"], Nt = /* @__PURE__ */ G('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-09e1eca1><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><circle cx="5" cy="5" r="2" data-v-09e1eca1></circle><circle cx="19" cy="5" r="2" data-v-09e1eca1></circle><circle cx="5" cy="19" r="2" data-v-09e1eca1></circle><circle cx="19" cy="19" r="2" data-v-09e1eca1></circle><line x1="5" y1="7" x2="5" y2="17" data-v-09e1eca1></line><line x1="7" y1="5" x2="17" y2="5" data-v-09e1eca1></line><line x1="7" y1="19" x2="17" y2="19" data-v-09e1eca1></line><line x1="19" y1="7" x2="19" y2="17" data-v-09e1eca1></line></svg>', 1), At = [
  Nt
], Ot = ["title"], jt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, qt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>', 5), Ut = [
  qt
], Gt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Kt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>', 5), Jt = [
  Kt
], Qt = {
  __name: "Controller",
  setup(r) {
    const {
      data: e,
      toggleVideoPlay: v,
      toggleVideoMute: s,
      changeVideoVolume: i,
      changeVideoFrame: w,
      setVideoPlaybackRate: S,
      toggleVideoRange: $,
      toggleVideoLoop: g,
      toggleVideoBbox: k,
      toggleFullScreen: m
    } = P(), h = F(() => e.range.start > 0 && e.range.end > 0), H = F(() => e.video.fps > 0), z = F(() => Object.keys(e.bbox.data).length > 0);
    return (oe, d) => {
      var A;
      return p(), f("div", Je, [
        n("button", {
          class: "cvp-controller-button",
          title: t(e).video.paused ? "Play" : "Pause",
          onClick: d[0] || (d[0] = (...u) => t(v) && t(v)(...u))
        }, [
          t(e).video.paused ? (p(), f("svg", Ye, et)) : (p(), f("svg", tt, st))
        ], 8, Qe),
        n("div", lt, [
          n("button", {
            class: "cvp-controller-button",
            title: t(e).video.muted ? "Unmute" : "Mute",
            onClick: d[1] || (d[1] = (...u) => t(s) && t(s)(...u))
          }, [
            t(e).video.muted ? (p(), f("svg", it, ut)) : (p(), f("svg", pt, gt))
          ], 8, rt),
          n("div", bt, [
            n("div", {
              class: "cvp-controller-volume-area",
              onMousedown: d[2] || (d[2] = he((u) => {
                t(e).container.mouseDown = !0, t(i)(u);
              }, ["self"])),
              onMousemove: d[3] || (d[3] = (...u) => t(i) && t(i)(...u)),
              onMouseup: d[4] || (d[4] = (u) => t(e).container.mouseDown = !1),
              onMouseleave: d[5] || (d[5] = (u) => t(e).container.mouseDown = !1)
            }, [
              n("div", {
                class: "cvp-controller-volume-bar",
                style: j({ height: `${t(e).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        n("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: d[6] || (d[6] = (u) => {
            t(e).container.mouseDown = !0, t(w)(!1);
          }),
          onMouseup: d[7] || (d[7] = (u) => {
            t(e).container.mouseDown = !1, t(w)(!1);
          })
        }, wt, 32),
        n("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: d[8] || (d[8] = (u) => {
            t(e).container.mouseDown = !0, t(w)(!0);
          }),
          onMouseup: d[9] || (d[9] = (u) => {
            t(e).container.mouseDown = !1, t(w)(!0);
          })
        }, xt, 32),
        Mt,
        n("div", Tt, [
          n("div", $t, "x" + M(((A = t(e).video.playbackRate) == null ? void 0 : A.toFixed(1)) || "1.0"), 1),
          n("ul", Et, [
            (p(!0), f(Ee, null, Ve([0.1, 0.5, 1, 1.5, 2, 5], (u) => (p(), f("li", Vt, [
              n("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (ne) => t(S)(u)
              }, M(u.toFixed(1)), 9, St)
            ]))), 256))
          ])
        ]),
        t(h) ? (p(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          title: t(e).range.enabled ? "Reset range" : "Set range",
          onClick: d[10] || (d[10] = (...u) => t($) && t($)(...u))
        }, [
          t(e).range.enabled ? (p(), f("svg", Ft, Dt)) : (p(), f("svg", Ht, Pt))
        ], 8, Ct)) : D("", !0),
        n("button", {
          class: N(["cvp-controller-button", t(e).video.loop && "cvp-controller-button-active"]),
          title: t(e).video.loop ? "Play once" : "Repeat play",
          onClick: d[11] || (d[11] = (...u) => t(g) && t(g)(...u))
        }, It, 10, Rt),
        t(H) && t(z) ? (p(), f("button", {
          key: 1,
          class: N(["cvp-controller-button", t(e).bbox.enabled && "cvp-controller-button-active"]),
          title: t(e).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: d[12] || (d[12] = (...u) => t(k) && t(k)(...u))
        }, At, 10, Wt)) : D("", !0),
        n("button", {
          class: "cvp-controller-button",
          title: t(e).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: d[13] || (d[13] = (...u) => t(m) && t(m)(...u))
        }, [
          t(e).container.fullScreen ? (p(), f("svg", jt, Ut)) : (p(), f("svg", Gt, Jt))
        ], 8, Ot)
      ]);
    };
  }
}, Yt = /* @__PURE__ */ R(Qt, [["__scopeId", "data-v-09e1eca1"]]);
const Zt = {
  __name: "index",
  setup(r) {
    const { data: e, onContainerMouseMove: v } = P();
    return (s, i) => (p(), f("div", {
      class: N(["cvp-footer", t(e).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: i[0] || (i[0] = (w) => t(e).container.mouseHold = !0),
      onMouseleave: i[1] || (i[1] = (w) => {
        t(e).container.mouseHold = !1, t(v)();
      })
    }, [
      I(Ke),
      I(Yt)
    ], 34));
  }
}, Xt = /* @__PURE__ */ R(Zt, [["__scopeId", "data-v-52798f3a"]]);
const eo = { class: "cvp-message" }, to = ["innerHTML"], oo = {
  __name: "Message",
  setup(r) {
    const { data: e } = P();
    return (v, s) => (p(), f("div", eo, [
      n("div", {
        class: N(["cvp-message-text", t(e).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: t(e).message.text
      }, null, 10, to)
    ]));
  }
}, no = /* @__PURE__ */ R(oo, [["__scopeId", "data-v-1ecb3b3a"]]);
const ao = ["data-dark-mode", "data-type"], so = {
  key: 0,
  class: "cvp-block"
}, lo = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    range: { type: Array, validator: (r) => !r.length || r.length === 2 && r.every((e) => typeof e == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(r) {
    const e = r, v = U(null), { data: s, onContainerMouseMove: i } = P();
    return pe(() => {
      Object.assign(s, {
        container: {
          ...s.container,
          element: v.value,
          type: e.type
        },
        video: {
          ...s.video,
          src: e.src,
          muted: e.muted,
          autoplay: e.autoplay,
          loop: e.loop,
          fps: e.fps
        },
        preview: {
          ...s.preview,
          enabled: e.preview
        },
        range: {
          ...s.range,
          start: e.range[0],
          end: e.range[1],
          enabled: e.range[0] > 0 && e.range[1] > 0
        },
        bbox: {
          ...s.bbox,
          ...e.bbox,
          enabled: Object.keys(e.bbox.data).length > 0
        },
        message: {
          ...s.message,
          time: e.messageTime
        },
        block: {
          ...s.block,
          visible: !e.src.length,
          text: "Video file has not been loaded"
        }
      }), s.container.type === "overlay" && s.container.element.addEventListener("mousemove", i);
    }), Se(() => {
      s.container.type === "overlay" && s.container.element.removeEventListener("mousemove", i);
    }), (w, S) => (p(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": r.darkMode,
      "data-type": e.type
    }, [
      I(Le),
      I(Ae, {
        src: e.src,
        muted: e.muted,
        autoplay: e.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      I(Xt),
      I(no),
      t(s).block.visible ? (p(), f("div", so, M(t(s).block.text), 1)) : D("", !0)
    ], 8, ao));
  }
}, io = /* @__PURE__ */ R(lo, [["__scopeId", "data-v-014bf948"]]);
export {
  io as default
};
