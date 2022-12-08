import { reactive as Te, computed as C, onMounted as pe, onUnmounted as $e, openBlock as p, createElementBlock as f, createElementVNode as n, normalizeClass as A, unref as t, toDisplayString as T, createCommentVNode as H, pushScopeId as fe, popScopeId as me, ref as G, withModifiers as he, normalizeStyle as q, Fragment as Ee, renderList as Se, createStaticVNode as K, createVNode as W, onBeforeUnmount as Ve } from "vue";
const N = (r) => {
  const e = parseInt(r), v = Math.floor(e / 3600), l = Math.floor(e % 3600 / 60), i = e % 60;
  return `${v < 10 ? "0" + v : v}:${l < 10 ? "0" + l : l}:${i < 10 ? "0" + i : i}`;
}, V = (r, e) => Math.round(r * e), te = (r, e) => r / e, U = (r) => r === void 0 ? !1 : new Intl.NumberFormat().format(r), a = Te({
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
  }
});
let Q = !1;
function z() {
  const r = C(() => a.range.start > 0 && a.range.end > 0), e = C(() => a.video.fps > 0), v = C(() => Object.keys(a.bbox.data).length > 0), l = () => {
    const {
      video: { element: o, canvas: s, width: c, height: h, duration: b, fps: k },
      range: { start: M, end: R },
      bbox: { data: ee, fillColor: j, borderSize: L, borderColor: ye }
    } = a, I = s.getContext("2d");
    s.width = c, s.height = h, o.loop = a.video.loop, r.value && (o.currentTime = M);
    const ie = () => {
      const {
        video: { loop: we },
        range: { enabled: xe },
        bbox: { enabled: ke }
      } = a;
      I.drawImage(o, 0, 0, c, h);
      let J = a.video.currentTime = o.currentTime;
      if (r.value && xe ? (O(), a.progress.seekWidth = ((J - M) / (R - M) * 100).toFixed(10), a.progress.bufferWidth = 100) : (o.ended && we && (J = 0), a.progress.seekWidth = (J / b * 100).toFixed(10), o.buffered.length > 0 && (a.progress.bufferWidth = o.buffered.end(o.buffered.length - 1) / b * 100)), e.value && v.value && ke) {
        const Me = V(J, k), F = ee[Me];
        if (F && F.length === 4) {
          const de = F[0], ce = F[1], ve = F[2] - F[0], ue = F[3] - F[1];
          I.fillStyle = j, I.fillRect(de, ce, ve, ue), L && (I.lineWidth = L, I.strokeStyle = ye, I.strokeRect(de - L / 2, ce - L / 2, ve + L, ue + L));
        }
      }
      o.paused && Math.floor(a.progress.seekWidth) === 100 && (a.video.paused = !0), window.requestAnimationFrame(ie);
    };
    ie(), window.dispatchEvent(new Event("resize"));
  }, i = (o) => {
    const {
      video: { element: s, duration: c, fps: h },
      range: { enabled: b, start: k, end: M }
    } = a;
    s.currentTime = r.value && b ? Math.max(Math.min(o, M), k) : Math.max(Math.min(o, c), 0), E(`Seek ${N(s.currentTime)} ${e.value ? `[${U(V(s.currentTime, h))}]` : ""} (${r.value && b ? Math.round((s.currentTime - k) / (M - k) * 100) : Math.round(s.currentTime / c * 100)}%)`);
  }, w = ({ offsetX: o }) => {
    const {
      container: { mouseDown: s },
      video: { duration: c },
      progress: { seekTotal: h },
      preview: { enabled: b, element: k },
      range: { enabled: M, start: R, end: ee }
    } = a, j = M ? o / h * (ee - R) + R : o / h * c;
    s && i(j), b && (k.currentTime = j, a.preview.time = N(j), o < 65 ? a.preview.left = 65 : o > h - 65 ? a.preview.left = h - 65 : a.preview.left = o);
  };
  let S;
  const $ = ({ detail: o }) => {
    if (o === 1) {
      const {
        video: { element: s, paused: c },
        range: { enabled: h, start: b, end: k }
      } = a;
      S = setTimeout(() => {
        c ? (r.value && h && s.currentTime === k && (s.currentTime = b), s.play()) : s.pause(), E(c ? "Play" : "Pause"), a.video.paused = !c;
      }, 250);
    } else
      o === 2 && (clearTimeout(S), ae());
  }, g = (o) => {
    const {
      video: { element: s }
    } = a, c = Math.max(Math.min(o, 1), 0);
    s.volume = a.video.volume = c, E(`Volume ${Math.floor(c * 100)}%`);
  }, x = ({ offsetY: o }) => {
    const {
      container: { mouseDown: s }
    } = a;
    s && g((100 - o) / 100);
  }, m = () => {
    const {
      video: { element: o, muted: s }
    } = a;
    o.muted = a.video.muted = !s, E(s ? "Unmuted" : "Muted");
  }, _ = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    e.value ? i(te(V(o.currentTime, s) + 1, s)) : i(o.currentTime + 1);
  }, B = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    e.value ? i(te(V(o.currentTime, s) - 1, s)) : i(o.currentTime - 1);
  };
  let D;
  const oe = (o) => {
    const {
      container: { mouseDown: s }
    } = a;
    s ? D = setInterval(() => {
      o ? _() : B();
    }, 60) : clearInterval(D);
  }, d = (o) => {
    const {
      video: { element: s }
    } = a;
    s.playbackRate = a.video.playbackRate = o, E(`Playback Rate x${o.toFixed(1)}`);
  }, O = () => {
    const {
      video: { element: o, loop: s },
      range: { enabled: c, start: h, end: b }
    } = a;
    !(r.value && c) || (o.currentTime < h && (o.currentTime = h), o.currentTime > b && (s ? o.currentTime = h : (o.currentTime = b, o.pause(), a.video.paused = !0)));
  }, u = () => {
    const {
      video: { duration: o },
      progress: { seekTotal: s },
      range: { enabled: c, start: h, end: b }
    } = a;
    O(), a.range.left = r.value && c ? 0 : h / o * s, a.range.width = r.value && c ? s : b / o * s - h / o * s;
  }, ne = () => {
    const {
      range: { enabled: o }
    } = a;
    a.range.enabled = !o, u(), E(o ? "Inactive range" : "Active range");
  }, _e = () => {
    const {
      video: { element: o, loop: s }
    } = a;
    o.loop = a.video.loop = !s, E(s ? "Play once" : "Repeat play");
  }, ge = () => {
    const {
      bbox: { enabled: o }
    } = a;
    a.bbox.enabled = !o, E(o ? "Hide bounding box" : "Show bounding box");
  };
  let Z;
  const E = (o) => {
    const { message: s } = a, { time: c } = s;
    !c || (s.text = o, s.visible = !0, Z && clearTimeout(Z), Z = setTimeout(() => {
      s.visible = !1;
    }, c));
  }, ae = () => {
    const {
      container: { element: o }
    } = a;
    document.fullscreenElement ? document.exitFullscreen() : o.requestFullscreen();
  }, se = () => {
    const {
      container: { element: o },
      preview: { enabled: s }
    } = a;
    a.progress.seekTotal = o.offsetWidth, r.value && u(), s && (a.preview.left = 0);
  }, le = ({ altKey: o, ctrlKey: s, key: c }) => {
    const {
      video: { element: h, paused: b, volume: k, fps: M }
    } = a;
    if (o && s) {
      if (c === "g" && e.value) {
        const R = window.prompt("Go to frame number", V(h.currentTime, M));
        b && h.pause(), h.currentTime = te(R, M);
      }
      c === "ArrowUp" && g(k + 0.05), c === "ArrowDown" && g(k - 0.05), c === "ArrowLeft" && B(), c === "ArrowRight" && _();
    }
  }, re = () => {
    a.container.fullScreen = Boolean(document.fullscreenElement), E(`${a.container.fullScreen ? "Full" : "Normal"} screen`);
  };
  let X;
  const be = () => {
    X && clearTimeout(X), a.container.mouseMove = !0, !a.container.mouseHold && (X = setTimeout(() => {
      a.container.mouseMove = !1;
    }, 1e3));
  };
  return pe(() => {
    Q || (window.addEventListener("resize", se), window.addEventListener("keydown", le), document.addEventListener("fullscreenchange", re), Q = !0);
  }), $e(() => {
    !Q || (window.removeEventListener("resize", se), window.removeEventListener("keydown", le), document.removeEventListener("fullscreenchange", re), Q = !1);
  }), {
    data: a,
    initialVideo: l,
    setVideoSeek: w,
    toggleVideoPlay: $,
    toggleVideoMute: m,
    changeVideoVolume: x,
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
const P = (r, e) => {
  const v = r.__vccOpts || r;
  for (const [l, i] of e)
    v[l] = i;
  return v;
}, Y = (r) => (fe("data-v-05360fd3"), r = r(), me(), r), Ce = { class: "cvp-header" }, Fe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, De = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), He = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = { key: 0 }, Pe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = {
  __name: "Header",
  setup(r) {
    const { data: e } = z(), v = C(() => e.range.start > 0 && e.range.end > 0), l = C(() => e.video.fps > 0);
    return (i, w) => (p(), f("div", Ce, [
      n("div", {
        class: A(["cvp-information", !t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, T(t(N)(t(e).video.currentTime)), 1),
        Fe,
        n("span", null, T(t(N)(t(e).video.duration)), 1),
        t(l) ? (p(), f("span", Be, [
          n("span", null, " [ " + T(t(U)(t(V)(t(e).video.currentTime, t(e).video.fps))), 1),
          De,
          n("span", null, T(t(U)(t(V)(t(e).video.duration, t(e).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2),
      t(v) ? (p(), f("div", {
        key: 0,
        class: A(["cvp-information", t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, T(t(N)(t(e).video.currentTime)), 1),
        He,
        n("span", null, T(t(N)(t(e).range.end)), 1),
        t(l) ? (p(), f("span", ze, [
          n("span", null, " [ " + T(t(U)(t(V)(t(e).video.currentTime, t(e).video.fps))), 1),
          Pe,
          n("span", null, T(t(U)(t(V)(t(e).range.end, t(e).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2)) : H("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ P(Re, [["__scopeId", "data-v-05360fd3"]]);
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
    const v = r, l = G(null), i = G(null), { data: w, initialVideo: S, toggleVideoPlay: $ } = z(), g = (x) => {
      Object.assign(w, {
        video: {
          ...w.video,
          element: l.value,
          canvas: i.value,
          width: l.value.videoWidth,
          height: l.value.videoHeight,
          duration: l.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), S(), e("loadedmetadata", x);
    };
    return (x, m) => (p(), f("div", Ie, [
      n("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: l,
        src: r.src,
        muted: r.muted,
        autoplay: r.autoplay,
        onLoadedmetadata: m[0] || (m[0] = (_) => g(_)),
        onPlay: m[1] || (m[1] = (_) => e("play", _)),
        onPause: m[2] || (m[2] = (_) => e("pause", _)),
        onTimeupdate: m[3] || (m[3] = (_) => e("timeupdate", _)),
        onVolumechange: m[4] || (m[4] = (_) => e("volumechange", _)),
        onError: m[5] || (m[5] = (_) => e("error", _))
      }, null, 40, We),
      n("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: i,
        onClick: m[6] || (m[6] = (..._) => t($) && t($)(..._))
      }, null, 512)
    ]));
  }
}, Ae = /* @__PURE__ */ P(Ne, [["__scopeId", "data-v-c9a7d0c6"]]);
const Oe = { class: "cvp-progress" }, je = { class: "cvp-progress-drag" }, qe = ["src"], Ue = { class: "cvp-progress-preview-time" }, Ge = {
  __name: "Progress",
  setup(r) {
    const e = G(null), v = G(null), { data: l, setVideoSeek: i } = z(), w = C(() => l.range.start > 0 && l.range.end > 0), S = () => {
      const {
        video: { width: $, height: g },
        preview: { enabled: x }
      } = l;
      if (!x)
        return;
      const m = v.value.getContext("2d"), _ = $ * 0.3, B = g * 0.3;
      v.value.width = _, v.value.height = B, Object.assign(l, {
        preview: {
          ...l.preview,
          element: e.value
        }
      });
      const D = () => {
        !e.value || (m.imageSmoothingEnabled = !0, m.drawImage(e.value, 0, 0, _, B), window.requestAnimationFrame(D));
      };
      D();
    };
    return ($, g) => (p(), f("div", Oe, [
      n("div", je, [
        n("div", {
          class: "cvp-progress-area",
          onMousedown: g[0] || (g[0] = he((x) => {
            t(l).container.mouseDown = !0, t(i)(x);
          }, ["self"])),
          onMousemove: g[1] || (g[1] = (...x) => t(i) && t(i)(...x)),
          onMouseup: g[2] || (g[2] = (x) => t(l).container.mouseDown = !1),
          onMouseleave: g[3] || (g[3] = (x) => t(l).container.mouseDown = !1)
        }, [
          n("div", {
            class: "cvp-progress-buffer",
            style: q({ width: `${t(l).progress.bufferWidth}%` })
          }, null, 4),
          n("div", {
            class: "cvp-progress-bar",
            style: q({ width: `${t(l).progress.seekWidth}%` })
          }, null, 4),
          t(w) ? (p(), f("div", {
            key: 0,
            class: "cvp-progress-range",
            style: q({ left: `${t(l).range.left}px`, width: `${t(l).range.width}px` })
          }, null, 4)) : H("", !0)
        ], 32)
      ]),
      t(l).preview.enabled ? (p(), f("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: q({ left: `${t(l).preview.left}px` })
      }, [
        n("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: e,
          src: t(l).video.src,
          onLoadedmetadata: S
        }, null, 40, qe),
        n("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        n("div", Ue, T(t(l).preview.time), 1)
      ], 4)) : H("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ P(Ge, [["__scopeId", "data-v-1d33ca57"]]);
const y = (r) => (fe("data-v-5393a002"), r = r(), me(), r), Je = { class: "cvp-controller" }, Qe = ["title"], Ye = {
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
], xt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("svg", {
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
], -1)), kt = [
  xt
], Mt = /* @__PURE__ */ y(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), Tt = { class: "cvp-controller-playback-rate" }, $t = { class: "cvp-controller-playback-rate-text" }, Et = { class: "cvp-controller-playback-rate-list" }, St = { class: "cvp-controller-playback-rate-item" }, Vt = ["onClick"], Ct = ["title"], Ft = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Bt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-5393a002></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-5393a002></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-5393a002></path><path d="M9 6v-3h6v3" data-v-5393a002></path><path d="M9 18v3h6v-3" data-v-5393a002></path>', 5), Dt = [
  Bt
], Ht = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, zt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-5393a002></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-5393a002></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-5393a002></path><path d="M3 6v-3h18v3" data-v-5393a002></path><path d="M3 18v3h18v-3" data-v-5393a002></path>', 5), Pt = [
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
], Wt = ["title"], Nt = /* @__PURE__ */ K('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-5393a002><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-5393a002></path><circle cx="5" cy="5" r="2" data-v-5393a002></circle><circle cx="19" cy="5" r="2" data-v-5393a002></circle><circle cx="5" cy="19" r="2" data-v-5393a002></circle><circle cx="19" cy="19" r="2" data-v-5393a002></circle><line x1="5" y1="7" x2="5" y2="17" data-v-5393a002></line><line x1="7" y1="5" x2="17" y2="5" data-v-5393a002></line><line x1="7" y1="19" x2="17" y2="19" data-v-5393a002></line><line x1="19" y1="7" x2="19" y2="17" data-v-5393a002></line></svg>', 1), At = [
  Nt
], Ot = ["title"], jt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, qt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-5393a002></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-5393a002></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-5393a002></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-5393a002></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-5393a002></path>', 5), Ut = [
  qt
], Gt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Kt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-5393a002></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-5393a002></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-5393a002></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-5393a002></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-5393a002></path>', 5), Jt = [
  Kt
], Qt = {
  __name: "Controller",
  setup(r) {
    const {
      data: e,
      toggleVideoPlay: v,
      toggleVideoMute: l,
      changeVideoVolume: i,
      changeVideoFrame: w,
      setVideoPlaybackRate: S,
      toggleVideoRange: $,
      toggleVideoLoop: g,
      toggleVideoBbox: x,
      toggleFullScreen: m
    } = z(), _ = C(() => e.range.start > 0 && e.range.end > 0), B = C(() => e.video.fps > 0), D = C(() => Object.keys(e.bbox.data).length > 0);
    return (oe, d) => {
      var O;
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
            onClick: d[1] || (d[1] = (...u) => t(l) && t(l)(...u))
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
                style: q({ height: `${t(e).video.volume * 100}%` })
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
        }, kt, 32),
        Mt,
        n("div", Tt, [
          n("div", $t, "x" + T(((O = t(e).video.playbackRate) == null ? void 0 : O.toFixed(1)) || "1.0"), 1),
          n("ul", Et, [
            (p(!0), f(Ee, null, Se([0.1, 0.5, 1, 1.5, 2, 5], (u) => (p(), f("li", St, [
              n("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (ne) => t(S)(u)
              }, T(u.toFixed(1)), 9, Vt)
            ]))), 256))
          ])
        ]),
        t(_) ? (p(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          title: t(e).range.enabled ? "Reset range" : "Set range",
          onClick: d[10] || (d[10] = (...u) => t($) && t($)(...u))
        }, [
          t(e).range.enabled ? (p(), f("svg", Ft, Dt)) : (p(), f("svg", Ht, Pt))
        ], 8, Ct)) : H("", !0),
        n("button", {
          class: A(["cvp-controller-button", t(e).video.loop && "cvp-controller-button-active"]),
          title: t(e).video.loop ? "Play once" : "Repeat play",
          onClick: d[11] || (d[11] = (...u) => t(g) && t(g)(...u))
        }, It, 10, Rt),
        t(B) && t(D) ? (p(), f("button", {
          key: 1,
          class: A(["cvp-controller-button", t(e).bbox.enabled && "cvp-controller-button-active"]),
          title: t(e).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: d[12] || (d[12] = (...u) => t(x) && t(x)(...u))
        }, At, 10, Wt)) : H("", !0),
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
}, Yt = /* @__PURE__ */ P(Qt, [["__scopeId", "data-v-5393a002"]]);
const Zt = {
  __name: "index",
  setup(r) {
    const { data: e, onContainerMouseMove: v } = z();
    return (l, i) => (p(), f("div", {
      class: A(["cvp-footer", t(e).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: i[0] || (i[0] = (w) => t(e).container.mouseHold = !0),
      onMouseleave: i[1] || (i[1] = (w) => {
        t(e).container.mouseHold = !1, t(v)();
      })
    }, [
      W(Ke),
      W(Yt)
    ], 34));
  }
}, Xt = /* @__PURE__ */ P(Zt, [["__scopeId", "data-v-52798f3a"]]);
const eo = { class: "cvp-message" }, to = ["innerHTML"], oo = {
  __name: "Message",
  setup(r) {
    const { data: e } = z();
    return (v, l) => (p(), f("div", eo, [
      n("div", {
        class: A(["cvp-message-text", t(e).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: t(e).message.text
      }, null, 10, to)
    ]));
  }
}, no = /* @__PURE__ */ P(oo, [["__scopeId", "data-v-1ecb3b3a"]]);
const ao = ["data-dark-mode", "data-type"], so = {
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
    const e = r, v = G(null), { data: l, onContainerMouseMove: i } = z();
    return pe(() => {
      Object.assign(l, {
        container: {
          ...l.container,
          element: v.value,
          type: e.type
        },
        video: {
          ...l.video,
          src: e.src,
          muted: e.muted,
          autoplay: e.autoplay,
          loop: e.loop,
          fps: e.fps
        },
        preview: {
          ...l.preview,
          enabled: e.preview
        },
        range: {
          ...l.range,
          start: e.range[0],
          end: e.range[1],
          enabled: e.range[0] > 0 && e.range[1] > 0
        },
        bbox: {
          ...l.bbox,
          ...e.bbox,
          enabled: Object.keys(e.bbox.data).length > 0
        },
        message: {
          ...l.message,
          time: e.messageTime
        }
      }), l.container.type === "overlay" && l.container.element.addEventListener("mousemove", i);
    }), Ve(() => {
      l.container.type === "overlay" && l.container.element.removeEventListener("mousemove", i);
    }), (w, S) => (p(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": r.darkMode,
      "data-type": e.type
    }, [
      W(Le),
      W(Ae, {
        src: e.src,
        muted: e.muted,
        autoplay: e.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      W(Xt),
      W(no)
    ], 8, ao));
  }
}, ro = /* @__PURE__ */ P(so, [["__scopeId", "data-v-0adcb1a7"]]);
export {
  ro as default
};
