import { reactive as Te, computed as V, onMounted as pe, onUnmounted as $e, openBlock as p, createElementBlock as f, createElementVNode as n, normalizeClass as A, unref as e, toDisplayString as k, createCommentVNode as H, pushScopeId as fe, popScopeId as me, ref as G, withModifiers as he, normalizeStyle as q, Fragment as Ee, renderList as Se, createStaticVNode as K, createVNode as W, onBeforeUnmount as Ve } from "vue";
const N = (r) => {
  const t = parseInt(r), d = Math.floor(t / 3600), l = Math.floor(t % 3600 / 60), i = t % 60;
  return `${d < 10 ? "0" + d : d}:${l < 10 ? "0" + l : l}:${i < 10 ? "0" + i : i}`;
}, S = (r, t) => Math.round(r * t), te = (r, t) => r / t, U = (r) => r === void 0 ? !1 : new Intl.NumberFormat().format(r), a = Te({
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
  const r = V(() => a.range.start > 0 && a.range.end > 0), t = V(() => a.video.fps > 0), d = V(() => Object.keys(a.bbox.data).length > 0), l = () => {
    const {
      video: { element: o, canvas: s, width: v, height: m, duration: _, fps: w },
      range: { start: x, end: R },
      bbox: { data: ee, fillColor: j, borderSize: L, borderColor: ye }
    } = a, I = s.getContext("2d");
    s.width = v, s.height = m, o.loop = a.video.loop, r.value && (o.currentTime = x);
    const ie = () => {
      const {
        video: { loop: we },
        range: { enabled: xe },
        bbox: { enabled: ke }
      } = a;
      I.drawImage(o, 0, 0, v, m);
      let J = a.video.currentTime = o.currentTime;
      if (r.value && xe ? (O(), a.progress.seekWidth = ((J - x) / (R - x) * 100).toFixed(10), a.progress.bufferWidth = 100) : (o.ended && we && (J = 0), a.progress.seekWidth = (J / _ * 100).toFixed(10), o.buffered.length > 0 && (a.progress.bufferWidth = o.buffered.end(o.buffered.length - 1) / _ * 100)), t.value && d.value && ke) {
        const Me = S(J, w), C = ee[Me];
        if (C && C.length === 4) {
          const de = C[0], ce = C[1], ve = C[2] - C[0], ue = C[3] - C[1];
          I.fillStyle = j, I.fillRect(de, ce, ve, ue), L && (I.lineWidth = L, I.strokeStyle = ye, I.strokeRect(de - L / 2, ce - L / 2, ve + L, ue + L));
        }
      }
      o.paused && Math.floor(a.progress.seekWidth) === 100 && (a.video.paused = !0), window.requestAnimationFrame(ie);
    };
    ie(), window.dispatchEvent(new Event("resize"));
  }, i = (o) => {
    const {
      video: { element: s, duration: v, fps: m },
      range: { enabled: _, start: w, end: x }
    } = a;
    s.currentTime = r.value && _ ? Math.max(Math.min(o, x), w) : Math.max(Math.min(o, v), 0), T(`Seek ${N(s.currentTime)} ${t.value ? `[${U(S(s.currentTime, m))}]` : ""} (${r.value && _ ? Math.round((s.currentTime - w) / (x - w) * 100) : Math.round(s.currentTime / v * 100)}%)`);
  }, y = ({ offsetX: o }) => {
    const {
      container: { mouseDown: s },
      video: { duration: v },
      progress: { seekTotal: m },
      preview: { enabled: _, element: w },
      range: { enabled: x, start: R, end: ee }
    } = a, j = x ? o / m * (ee - R) + R : o / m * v;
    s && i(j), _ && (w.currentTime = j, a.preview.time = N(j), o < 65 ? a.preview.left = 65 : o > m - 65 ? a.preview.left = m - 65 : a.preview.left = o);
  };
  let M;
  const $ = ({ detail: o }) => {
    if (o === 1) {
      const {
        video: { element: s, paused: v },
        range: { enabled: m, start: _, end: w }
      } = a;
      M = setTimeout(() => {
        v ? (r.value && m && s.currentTime === w && (s.currentTime = _), s.play()) : s.pause(), T(v ? "Play" : "Pause"), a.video.paused = !v;
      }, 250);
    } else
      o === 2 && (clearTimeout(M), ae());
  }, h = (o) => {
    const {
      video: { element: s }
    } = a, v = Math.max(Math.min(o, 1), 0);
    s.volume = a.video.volume = v, T(`Volume ${Math.floor(v * 100)}%`);
  }, b = ({ offsetY: o }) => {
    const {
      container: { mouseDown: s }
    } = a;
    s && h((100 - o) / 100);
  }, E = () => {
    const {
      video: { element: o, muted: s }
    } = a;
    o.muted = a.video.muted = !s, T(s ? "Unmuted" : "Muted");
  }, F = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    t.value ? i(te(S(o.currentTime, s) + 1, s)) : i(o.currentTime + 1);
  }, B = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    t.value ? i(te(S(o.currentTime, s) - 1, s)) : i(o.currentTime - 1);
  };
  let D;
  const oe = (o) => {
    const {
      container: { mouseDown: s }
    } = a;
    s ? D = setInterval(() => {
      o ? F() : B();
    }, 60) : clearInterval(D);
  }, c = (o) => {
    const {
      video: { element: s }
    } = a;
    s.playbackRate = a.video.playbackRate = o, T(`Playback Rate x${o.toFixed(1)}`);
  }, O = () => {
    const {
      video: { element: o, loop: s },
      range: { enabled: v, start: m, end: _ }
    } = a;
    !(r.value && v) || (o.currentTime < m && (o.currentTime = m), o.currentTime > _ && (s ? o.currentTime = m : (o.currentTime = _, o.pause(), a.video.paused = !0)));
  }, u = () => {
    const {
      video: { duration: o },
      progress: { seekTotal: s },
      range: { enabled: v, start: m, end: _ }
    } = a;
    O(), a.range.left = r.value && v ? 0 : m / o * s, a.range.width = r.value && v ? s : _ / o * s - m / o * s;
  }, ne = () => {
    const {
      range: { enabled: o }
    } = a;
    a.range.enabled = !o, u(), T(o ? "Inactive range" : "Active range");
  }, _e = () => {
    const {
      video: { element: o, loop: s }
    } = a;
    o.loop = a.video.loop = !s, T(s ? "Play once" : "Repeat play");
  }, ge = () => {
    const {
      bbox: { enabled: o }
    } = a;
    a.bbox.enabled = !o, T(o ? "Hide bounding box" : "Show bounding box");
  };
  let Z;
  const T = (o) => {
    const { message: s } = a, { time: v } = s;
    !v || (s.text = o, s.visible = !0, Z && clearTimeout(Z), Z = setTimeout(() => {
      s.visible = !1;
    }, v));
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
  }, le = ({ altKey: o, ctrlKey: s, key: v }) => {
    const {
      video: { element: m, paused: _, volume: w, fps: x }
    } = a;
    if (o && s) {
      if (v === "g" && t.value) {
        const R = window.prompt("Go to frame number", S(m.currentTime, x));
        _ && m.pause(), m.currentTime = te(R, x);
      }
      v === "ArrowUp" && h(w + 0.05), v === "ArrowDown" && h(w - 0.05), v === "ArrowLeft" && B(), v === "ArrowRight" && F();
    }
  }, re = () => {
    a.container.fullScreen = Boolean(document.fullscreenElement), T(`${a.container.fullScreen ? "Full" : "Normal"} screen`);
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
    setVideoSeek: y,
    toggleVideoPlay: $,
    toggleVideoMute: E,
    changeVideoVolume: b,
    changeVideoFrame: oe,
    setVideoPlaybackRate: c,
    toggleVideoRange: ne,
    toggleVideoLoop: _e,
    toggleVideoBbox: ge,
    toggleFullScreen: ae,
    setMessage: T,
    onContainerMouseMove: be
  };
}
const P = (r, t) => {
  const d = r.__vccOpts || r;
  for (const [l, i] of t)
    d[l] = i;
  return d;
}, Y = (r) => (fe("data-v-05360fd3"), r = r(), me(), r), Ce = { class: "cvp-header" }, Fe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, De = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), He = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = { key: 0 }, Pe = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = {
  __name: "Header",
  setup(r) {
    const { data: t } = z(), d = V(() => t.range.start > 0 && t.range.end > 0), l = V(() => t.video.fps > 0);
    return (i, y) => (p(), f("div", Ce, [
      n("div", {
        class: A(["cvp-information", !e(t).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, k(e(N)(e(t).video.currentTime)), 1),
        Fe,
        n("span", null, k(e(N)(e(t).video.duration)), 1),
        e(l) ? (p(), f("span", Be, [
          n("span", null, " [ " + k(e(U)(e(S)(e(t).video.currentTime, e(t).video.fps))), 1),
          De,
          n("span", null, k(e(U)(e(S)(e(t).video.duration, e(t).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2),
      e(d) ? (p(), f("div", {
        key: 0,
        class: A(["cvp-information", e(t).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, k(e(N)(e(t).video.currentTime)), 1),
        He,
        n("span", null, k(e(N)(e(t).range.end)), 1),
        e(l) ? (p(), f("span", ze, [
          n("span", null, " [ " + k(e(U)(e(S)(e(t).video.currentTime, e(t).video.fps))), 1),
          Pe,
          n("span", null, k(e(U)(e(S)(e(t).range.end, e(t).video.fps))) + " ]", 1)
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
  setup(r) {
    const t = r, d = G(null), l = G(null), { data: i, initialVideo: y, toggleVideoPlay: M } = z(), $ = () => {
      Object.assign(i, {
        video: {
          ...i.video,
          element: d.value,
          canvas: l.value,
          width: d.value.videoWidth,
          height: d.value.videoHeight,
          duration: d.value.duration,
          paused: !(t.muted === !0 && t.autoplay === !0)
        }
      }), y();
    };
    return (h, b) => (p(), f("div", Ie, [
      n("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: d,
        src: r.src,
        muted: r.muted,
        autoplay: r.autoplay,
        onLoadedmetadata: $
      }, null, 40, We),
      n("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: l,
        onClick: b[0] || (b[0] = (...E) => e(M) && e(M)(...E))
      }, null, 512)
    ]));
  }
}, Ae = /* @__PURE__ */ P(Ne, [["__scopeId", "data-v-760255dc"]]);
const Oe = { class: "cvp-progress" }, je = { class: "cvp-progress-drag" }, qe = ["src"], Ue = { class: "cvp-progress-preview-time" }, Ge = {
  __name: "Progress",
  setup(r) {
    const t = G(null), d = G(null), { data: l, setVideoSeek: i } = z(), y = V(() => l.range.start > 0 && l.range.end > 0), M = () => {
      const {
        video: { width: $, height: h },
        preview: { enabled: b }
      } = l;
      if (!b)
        return;
      const E = d.value.getContext("2d"), F = $ * 0.3, B = h * 0.3;
      d.value.width = F, d.value.height = B, Object.assign(l, {
        preview: {
          ...l.preview,
          element: t.value
        }
      });
      const D = () => {
        !t.value || (E.imageSmoothingEnabled = !0, E.drawImage(t.value, 0, 0, F, B), window.requestAnimationFrame(D));
      };
      D();
    };
    return ($, h) => (p(), f("div", Oe, [
      n("div", je, [
        n("div", {
          class: "cvp-progress-area",
          onMousedown: h[0] || (h[0] = he((b) => {
            e(l).container.mouseDown = !0, e(i)(b);
          }, ["self"])),
          onMousemove: h[1] || (h[1] = (...b) => e(i) && e(i)(...b)),
          onMouseup: h[2] || (h[2] = (b) => e(l).container.mouseDown = !1),
          onMouseleave: h[3] || (h[3] = (b) => e(l).container.mouseDown = !1)
        }, [
          n("div", {
            class: "cvp-progress-buffer",
            style: q({ width: `${e(l).progress.bufferWidth}%` })
          }, null, 4),
          n("div", {
            class: "cvp-progress-bar",
            style: q({ width: `${e(l).progress.seekWidth}%` })
          }, null, 4),
          e(y) ? (p(), f("div", {
            key: 0,
            class: "cvp-progress-range",
            style: q({ left: `${e(l).range.left}px`, width: `${e(l).range.width}px` })
          }, null, 4)) : H("", !0)
        ], 32)
      ]),
      e(l).preview.enabled ? (p(), f("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: q({ left: `${e(l).preview.left}px` })
      }, [
        n("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: t,
          src: e(l).video.src,
          onLoadedmetadata: M
        }, null, 40, qe),
        n("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: d
        }, null, 512),
        n("div", Ue, k(e(l).preview.time), 1)
      ], 4)) : H("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ P(Ge, [["__scopeId", "data-v-1d33ca57"]]);
const g = (r) => (fe("data-v-5393a002"), r = r(), me(), r), Je = { class: "cvp-controller" }, Qe = ["title"], Ye = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ze = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Xe = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M7 4v16l13 -8z" }, null, -1)), et = [
  Ze,
  Xe
], tt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ot = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), nt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), at = /* @__PURE__ */ g(() => /* @__PURE__ */ n("rect", {
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
}, dt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ct = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), vt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), ut = [
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
}, ft = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), mt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ht = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), _t = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), gt = [
  ft,
  mt,
  ht,
  _t
], bt = { class: "cvp-controller-volume-drag" }, yt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("svg", {
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
], xt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("svg", {
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
], Mt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), Tt = { class: "cvp-controller-playback-rate" }, $t = { class: "cvp-controller-playback-rate-text" }, Et = { class: "cvp-controller-playback-rate-list" }, St = { class: "cvp-controller-playback-rate-item" }, Vt = ["onClick"], Ct = ["title"], Ft = {
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
], Rt = ["title"], Lt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("svg", {
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
      data: t,
      toggleVideoPlay: d,
      toggleVideoMute: l,
      changeVideoVolume: i,
      changeVideoFrame: y,
      setVideoPlaybackRate: M,
      toggleVideoRange: $,
      toggleVideoLoop: h,
      toggleVideoBbox: b,
      toggleFullScreen: E
    } = z(), F = V(() => t.range.start > 0 && t.range.end > 0), B = V(() => t.video.fps > 0), D = V(() => Object.keys(t.bbox.data).length > 0);
    return (oe, c) => {
      var O;
      return p(), f("div", Je, [
        n("button", {
          class: "cvp-controller-button",
          title: e(t).video.paused ? "Play" : "Pause",
          onClick: c[0] || (c[0] = (...u) => e(d) && e(d)(...u))
        }, [
          e(t).video.paused ? (p(), f("svg", Ye, et)) : (p(), f("svg", tt, st))
        ], 8, Qe),
        n("div", lt, [
          n("button", {
            class: "cvp-controller-button",
            title: e(t).video.muted ? "Unmute" : "Mute",
            onClick: c[1] || (c[1] = (...u) => e(l) && e(l)(...u))
          }, [
            e(t).video.muted ? (p(), f("svg", it, ut)) : (p(), f("svg", pt, gt))
          ], 8, rt),
          n("div", bt, [
            n("div", {
              class: "cvp-controller-volume-area",
              onMousedown: c[2] || (c[2] = he((u) => {
                e(t).container.mouseDown = !0, e(i)(u);
              }, ["self"])),
              onMousemove: c[3] || (c[3] = (...u) => e(i) && e(i)(...u)),
              onMouseup: c[4] || (c[4] = (u) => e(t).container.mouseDown = !1),
              onMouseleave: c[5] || (c[5] = (u) => e(t).container.mouseDown = !1)
            }, [
              n("div", {
                class: "cvp-controller-volume-bar",
                style: q({ height: `${e(t).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        n("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: c[6] || (c[6] = (u) => {
            e(t).container.mouseDown = !0, e(y)(!1);
          }),
          onMouseup: c[7] || (c[7] = (u) => {
            e(t).container.mouseDown = !1, e(y)(!1);
          })
        }, wt, 32),
        n("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: c[8] || (c[8] = (u) => {
            e(t).container.mouseDown = !0, e(y)(!0);
          }),
          onMouseup: c[9] || (c[9] = (u) => {
            e(t).container.mouseDown = !1, e(y)(!0);
          })
        }, kt, 32),
        Mt,
        n("div", Tt, [
          n("div", $t, "x" + k(((O = e(t).video.playbackRate) == null ? void 0 : O.toFixed(1)) || "1.0"), 1),
          n("ul", Et, [
            (p(!0), f(Ee, null, Se([0.1, 0.5, 1, 1.5, 2, 5], (u) => (p(), f("li", St, [
              n("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (ne) => e(M)(u)
              }, k(u.toFixed(1)), 9, Vt)
            ]))), 256))
          ])
        ]),
        e(F) ? (p(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          title: e(t).range.enabled ? "Reset range" : "Set range",
          onClick: c[10] || (c[10] = (...u) => e($) && e($)(...u))
        }, [
          e(t).range.enabled ? (p(), f("svg", Ft, Dt)) : (p(), f("svg", Ht, Pt))
        ], 8, Ct)) : H("", !0),
        n("button", {
          class: A(["cvp-controller-button", e(t).video.loop && "cvp-controller-button-active"]),
          title: e(t).video.loop ? "Play once" : "Repeat play",
          onClick: c[11] || (c[11] = (...u) => e(h) && e(h)(...u))
        }, It, 10, Rt),
        e(B) && e(D) ? (p(), f("button", {
          key: 1,
          class: A(["cvp-controller-button", e(t).bbox.enabled && "cvp-controller-button-active"]),
          title: e(t).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: c[12] || (c[12] = (...u) => e(b) && e(b)(...u))
        }, At, 10, Wt)) : H("", !0),
        n("button", {
          class: "cvp-controller-button",
          title: e(t).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: c[13] || (c[13] = (...u) => e(E) && e(E)(...u))
        }, [
          e(t).container.fullScreen ? (p(), f("svg", jt, Ut)) : (p(), f("svg", Gt, Jt))
        ], 8, Ot)
      ]);
    };
  }
}, Yt = /* @__PURE__ */ P(Qt, [["__scopeId", "data-v-5393a002"]]);
const Zt = {
  __name: "index",
  setup(r) {
    const { data: t, onContainerMouseMove: d } = z();
    return (l, i) => (p(), f("div", {
      class: A(["cvp-footer", e(t).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: i[0] || (i[0] = (y) => e(t).container.mouseHold = !0),
      onMouseleave: i[1] || (i[1] = (y) => {
        e(t).container.mouseHold = !1, e(d)();
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
    const { data: t } = z();
    return (d, l) => (p(), f("div", eo, [
      n("div", {
        class: A(["cvp-message-text", e(t).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: e(t).message.text
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
    range: { type: Array, validator: (r) => !r.length || r.length === 2 && r.every((t) => typeof t == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(r) {
    const t = r, d = G(null), { data: l, onContainerMouseMove: i } = z();
    return pe(() => {
      Object.assign(l, {
        container: {
          ...l.container,
          element: d.value,
          type: t.type
        },
        video: {
          ...l.video,
          src: t.src,
          muted: t.muted,
          autoplay: t.autoplay,
          loop: t.loop,
          fps: t.fps
        },
        preview: {
          ...l.preview,
          enabled: t.preview
        },
        range: {
          ...l.range,
          start: t.range[0],
          end: t.range[1],
          enabled: t.range[0] > 0 && t.range[1] > 0
        },
        bbox: {
          ...l.bbox,
          ...t.bbox,
          enabled: Object.keys(t.bbox.data).length > 0
        },
        message: {
          ...l.message,
          time: t.messageTime
        }
      }), l.container.type === "overlay" && l.container.element.addEventListener("mousemove", i);
    }), Ve(() => {
      l.container.type === "overlay" && l.container.element.removeEventListener("mousemove", i);
    }), (y, M) => (p(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: d,
      "data-dark-mode": r.darkMode,
      "data-type": t.type
    }, [
      W(Le),
      W(Ae, {
        src: t.src,
        muted: t.muted,
        autoplay: t.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      W(Xt),
      W(no)
    ], 8, ao));
  }
}, ro = /* @__PURE__ */ P(so, [["__scopeId", "data-v-55a9235c"]]);
export {
  ro as default
};
