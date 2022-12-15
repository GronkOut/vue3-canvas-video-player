import { reactive as Me, computed as z, onMounted as pe, onUnmounted as Te, openBlock as u, createElementBlock as p, createElementVNode as a, normalizeClass as R, unref as e, toDisplayString as $, createCommentVNode as H, pushScopeId as fe, popScopeId as me, ref as G, withModifiers as he, normalizeStyle as q, Fragment as $e, renderList as Ee, createStaticVNode as K, createVNode as W, watch as Ve, onBeforeUnmount as Se } from "vue";
const N = (l) => {
  const t = parseInt(l), v = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), i = t % 60;
  return `${v < 10 ? "0" + v : v}:${s < 10 ? "0" + s : s}:${i < 10 ? "0" + i : i}`;
}, B = (l, t) => Math.round(l * t), ae = (l, t) => l / t, U = (l) => l === void 0 ? !1 : new Intl.NumberFormat().format(l), o = Me({
  container: {
    element: null,
    fullScreen: !1,
    type: "overlay",
    mouseDown: !1,
    mouseMove: !1,
    mouseHold: !1,
    resizeObserver: null
  },
  video: {
    element: null,
    src: "",
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
    text: "Video file has not been loaded"
  }
});
let X = !1;
function I() {
  const l = z(() => o.range.start > 0 && o.range.end > 0), t = z(() => o.video.fps > 0), v = z(() => Object.keys(o.bbox.data).length > 0), s = () => {
    const {
      video: { element: n, canvas: r, width: c, height: w, duration: b, fps: x },
      range: { start: S }
    } = o, M = r.getContext("2d");
    r.width = c, r.height = w, n.loop = o.video.loop, l.value && (n.currentTime = S), n.paused && (o.video.paused = !0, n.pause());
    const A = () => {
      const {
        video: { loop: Y },
        range: { enabled: P, start: oe, end: ne },
        bbox: { data: be, fillColor: ye, borderSize: L, borderColor: we, enabled: ke }
      } = o;
      M.drawImage(n, 0, 0, c, w);
      let Z = o.video.currentTime = n.currentTime;
      if (l.value && P ? (n.currentTime >= ne && (Y ? n.currentTime = oe : (n.currentTime = ne, n.pause(), o.video.paused = !0)), o.progress.seekWidth = ((Z - oe) / (ne - oe) * 100).toFixed(10), o.progress.bufferWidth = 100) : (n.ended && Y && (Z = 0), o.progress.seekWidth = (Z / b * 100).toFixed(10), n.buffered.length > 0 && (o.progress.bufferWidth = n.buffered.end(n.buffered.length - 1) / b * 100)), t.value && v.value && ke) {
        const xe = B(Z, x), D = be[xe];
        if (D && D.length === 4) {
          const de = D[0], ce = D[1], ve = D[2] - D[0], ue = D[3] - D[1];
          M.fillStyle = ye, M.fillRect(de, ce, ve, ue), L && (M.lineWidth = L, M.strokeStyle = we, M.strokeRect(de - L / 2, ce - L / 2, ve + L, ue + L));
        }
      }
      n.paused && Math.floor(o.progress.seekWidth) === 100 && (o.video.paused = !0), window.requestAnimationFrame(A);
    };
    A();
  }, i = (n) => {
    const {
      video: { element: r, duration: c, fps: w },
      range: { enabled: b, start: x, end: S }
    } = o;
    r.currentTime = l.value && b ? Math.max(Math.min(n, S), x) : Math.max(Math.min(n, c), 0);
    const M = l.value && b ? Math.round((r.currentTime - x) / (S - x) * 100) : Math.round(r.currentTime / c * 100);
    V(`Seek ${N(r.currentTime)} ${t.value ? `[${U(B(r.currentTime, w))}]` : ""} (${M > 0 ? M : 100}%)`);
  }, y = ({ offsetX: n }) => {
    const {
      container: { mouseDown: r },
      video: { element: c, duration: w },
      progress: { seekTotal: b },
      preview: { enabled: x, element: S },
      range: { enabled: M, start: A, end: Y }
    } = o;
    if (!c)
      return;
    const P = M ? n / b * (Y - A) + A : n / b * w;
    P === 1 / 0 || isNaN(P) || (r && i(P), S && x && (S.currentTime = P, o.preview.time = N(P), n < 65 ? o.preview.left = 65 : n > b - 65 ? o.preview.left = b - 65 : o.preview.left = n));
  };
  let E;
  const T = ({ detail: n }) => {
    if (n === 1) {
      const {
        video: { element: r, paused: c },
        range: { enabled: w, start: b, end: x }
      } = o;
      E = setTimeout(() => {
        c ? (l.value && w && r.currentTime === x && (r.currentTime = b), r.play()) : r.pause(), V(c ? "Play" : "Pause"), o.video.paused = !c;
      }, 250);
    } else
      n === 2 && (clearTimeout(E), re());
  }, _ = (n) => {
    const {
      video: { element: r }
    } = o, c = Math.max(Math.min(n, 1), 0);
    r.volume = o.video.volume = c, V(`Volume ${Math.floor(c * 100)}%`);
  }, g = ({ offsetY: n }) => {
    const {
      container: { mouseDown: r }
    } = o;
    r && _((100 - n) / 100);
  }, f = () => {
    const {
      video: { element: n, muted: r }
    } = o;
    n.muted = o.video.muted = !r, V(r ? "Unmuted" : "Muted");
  }, h = () => {
    const {
      video: { element: n, fps: r }
    } = o;
    t.value ? i(ae(B(n.currentTime, r) + 1, r)) : i(n.currentTime + 1);
  }, C = () => {
    const {
      video: { element: n, fps: r }
    } = o;
    t.value ? i(ae(B(n.currentTime, r) - 1, r)) : i(n.currentTime - 1);
  };
  let F;
  const j = (n) => {
    const {
      container: { mouseDown: r }
    } = o;
    r ? F = setInterval(() => {
      n ? h() : C();
    }, 60) : clearInterval(F);
  }, se = (n) => {
    const {
      video: { element: r }
    } = o;
    r.playbackRate = o.video.playbackRate = n, V(`Playback Rate x${n.toFixed(1)}`);
  }, d = (n) => {
    const {
      video: { element: r, duration: c },
      progress: { seekTotal: w },
      range: { start: b, end: x }
    } = o;
    o.range.enabled !== n && (o.range.enabled = n, V(n ? "Active range" : "Inactive range")), n ? (r.currentTime = b, o.range.left = 0, o.range.width = w, o.progress.seekWidth = 0) : (r.currentTime = 0, o.range.left = b / c * w, o.range.width = x / c * w - b / c * w);
  }, J = () => {
    const {
      video: { element: n, loop: r }
    } = o;
    n.loop = o.video.loop = !r, V(r ? "Play once" : "Repeat play");
  }, m = () => {
    const {
      bbox: { enabled: n }
    } = o;
    o.bbox.enabled = !n, V(n ? "Hide bounding box" : "Show bounding box");
  };
  let Q;
  const V = (n) => {
    const { message: r } = o, { time: c } = r;
    !c || (r.text = n, r.visible = !0, Q && clearTimeout(Q), Q = setTimeout(() => {
      r.visible = !1;
    }, c));
  }, re = () => {
    const {
      container: { element: n }
    } = o;
    document.fullscreenElement ? document.exitFullscreen() : n.requestFullscreen();
  }, le = ({ altKey: n, ctrlKey: r, key: c }) => {
    const {
      video: { element: w, paused: b, volume: x, fps: S }
    } = o;
    if (n && r) {
      if (c === "g" && t.value) {
        const M = window.prompt("Go to frame number", B(w.currentTime, S));
        b && w.pause(), w.currentTime = ae(M, S);
      }
      c === "ArrowUp" && _(x + 0.05), c === "ArrowDown" && _(x - 0.05), c === "ArrowLeft" && C(), c === "ArrowRight" && h();
    }
  }, ie = () => {
    o.container.fullScreen = Boolean(document.fullscreenElement), V(`${o.container.fullScreen ? "Full" : "Normal"} screen`);
  }, _e = () => {
    const {
      container: { element: n },
      range: { enabled: r },
      preview: { enabled: c }
    } = o;
    o.progress.seekTotal = n.offsetWidth, l.value && r && d(!0), c && (o.preview.left = 0);
  };
  let te;
  const ge = () => {
    te && clearTimeout(te), o.container.mouseMove = !0, !o.container.mouseHold && (te = setTimeout(() => {
      o.container.mouseMove = !1;
    }, 2e3));
  };
  return pe(() => {
    X || (window.addEventListener("keydown", le), document.addEventListener("fullscreenchange", ie), setTimeout(() => {
      o.container.resizeObserver = new ResizeObserver(_e), o.container.resizeObserver.observe(o.container.element);
    }, 300), X = !0);
  }), Te(() => {
    !X || (o.container.resizeObserver.unobserve(o.container.element), window.removeEventListener("keydown", le), document.removeEventListener("fullscreenchange", ie), X = !1);
  }), {
    data: o,
    initialVideo: s,
    setVideoSeek: y,
    toggleVideoPlay: T,
    toggleVideoMute: f,
    changeVideoVolume: g,
    changeVideoFrame: j,
    setVideoPlaybackRate: se,
    setVideoRange: d,
    toggleVideoLoop: J,
    toggleVideoBbox: m,
    toggleFullScreen: re,
    setMessage: V,
    handleContainerMouseMove: ge
  };
}
const O = (l, t) => {
  const v = l.__vccOpts || l;
  for (const [s, i] of t)
    v[s] = i;
  return v;
}, ee = (l) => (fe("data-v-05360fd3"), l = l(), me(), l), Ce = { class: "cvp-header" }, Fe = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, ze = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), De = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), He = { key: 0 }, Pe = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = {
  __name: "Header",
  setup(l) {
    const { data: t } = I(), v = z(() => t.range.start > 0 && t.range.end > 0), s = z(() => t.video.fps > 0);
    return (i, y) => (u(), p("div", Ce, [
      a("div", {
        class: R(["cvp-information", !e(t).range.enabled && "cvp-information-active"])
      }, [
        a("span", null, $(e(N)(e(t).video.currentTime)), 1),
        Fe,
        a("span", null, $(e(N)(e(t).video.duration)), 1),
        e(s) ? (u(), p("span", Be, [
          a("span", null, " [ " + $(e(U)(e(B)(e(t).video.currentTime, e(t).video.fps))), 1),
          ze,
          a("span", null, $(e(U)(e(B)(e(t).video.duration, e(t).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2),
      e(v) ? (u(), p("div", {
        key: 0,
        class: R(["cvp-information", e(t).range.enabled && "cvp-information-active"])
      }, [
        a("span", null, $(e(N)(e(t).video.currentTime)), 1),
        De,
        a("span", null, $(e(N)(e(t).range.end)), 1),
        e(s) ? (u(), p("span", He, [
          a("span", null, " [ " + $(e(U)(e(B)(e(t).video.currentTime, e(t).video.fps))), 1),
          Pe,
          a("span", null, $(e(U)(e(B)(e(t).range.end, e(t).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2)) : H("", !0)
    ]));
  }
}, Ie = /* @__PURE__ */ O(Re, [["__scopeId", "data-v-05360fd3"]]);
const Oe = { class: "cvp-main" }, Le = ["src", "muted", "autoplay"], We = {
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
  setup(l, { emit: t }) {
    const v = l, s = G(null), i = G(null), { data: y, initialVideo: E, toggleVideoPlay: T } = I(), _ = (g) => {
      Object.assign(y, {
        video: {
          ...y.video,
          element: s.value,
          canvas: i.value,
          width: s.value.videoWidth,
          height: s.value.videoHeight,
          duration: s.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), E(), t("loadedmetadata", g);
    };
    return (g, f) => (u(), p("div", Oe, [
      a("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: s,
        src: l.src,
        muted: l.muted,
        autoplay: l.autoplay,
        onLoadedmetadata: f[0] || (f[0] = (h) => _(h)),
        onPlay: f[1] || (f[1] = (h) => t("play", h)),
        onPause: f[2] || (f[2] = (h) => t("pause", h)),
        onTimeupdate: f[3] || (f[3] = (h) => t("timeupdate", h)),
        onVolumechange: f[4] || (f[4] = (h) => t("volumechange", h)),
        onError: f[5] || (f[5] = (h) => t("error", h))
      }, null, 40, Le),
      a("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: i,
        onClick: f[6] || (f[6] = (...h) => e(T) && e(T)(...h))
      }, null, 512)
    ]));
  }
}, Ne = /* @__PURE__ */ O(We, [["__scopeId", "data-v-aa93fbd6"]]);
const je = { class: "cvp-progress" }, Ae = { class: "cvp-progress-drag" }, qe = ["src"], Ue = { class: "cvp-progress-preview-time" }, Ge = {
  __name: "Progress",
  setup(l) {
    const t = G(null), v = G(null), { data: s, setVideoSeek: i } = I(), y = z(() => s.range.start > 0 && s.range.end > 0), E = () => {
      setTimeout(() => {
        const {
          video: { width: T, height: _ },
          preview: { enabled: g }
        } = s;
        if (!g)
          return;
        const f = v.value.getContext("2d"), h = T * 0.3, C = _ * 0.3;
        v.value.width = h, v.value.height = C, Object.assign(s, {
          preview: {
            ...s.preview,
            element: t.value
          }
        });
        const F = () => {
          !t.value || (f.imageSmoothingEnabled = !0, f.drawImage(t.value, 0, 0, h, C), window.requestAnimationFrame(F));
        };
        F();
      }, 100);
    };
    return (T, _) => (u(), p("div", je, [
      a("div", Ae, [
        a("div", {
          class: "cvp-progress-area",
          onMousedown: _[0] || (_[0] = he((g) => {
            e(s).container.mouseDown = !0, e(i)(g);
          }, ["self"])),
          onMousemove: _[1] || (_[1] = (...g) => e(i) && e(i)(...g)),
          onMouseup: _[2] || (_[2] = (g) => e(s).container.mouseDown = !1),
          onMouseleave: _[3] || (_[3] = (g) => e(s).container.mouseDown = !1)
        }, [
          a("div", {
            class: "cvp-progress-buffer",
            style: q({ width: `${e(s).progress.bufferWidth}%` })
          }, null, 4),
          a("div", {
            class: "cvp-progress-bar",
            style: q({ width: `${e(s).progress.seekWidth}%` })
          }, null, 4),
          e(y) ? (u(), p("div", {
            key: 0,
            class: "cvp-progress-range",
            style: q({ left: `${e(s).range.left}px`, width: `${e(s).range.width}px` })
          }, null, 4)) : H("", !0)
        ], 32)
      ]),
      e(s).preview.enabled ? (u(), p("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: q({ left: `${e(s).preview.left}px` })
      }, [
        a("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: t,
          src: e(s).video.src,
          onLoadeddata: E
        }, null, 40, qe),
        a("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        a("div", Ue, $(e(s).preview.time), 1)
      ], 4)) : H("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ O(Ge, [["__scopeId", "data-v-9a38ced9"]]);
const k = (l) => (fe("data-v-0dab554c"), l = l(), me(), l), Je = { class: "cvp-controller" }, Qe = ["title"], Ye = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ze = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Xe = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M7 4v16l13 -8z" }, null, -1)), et = [
  Ze,
  Xe
], tt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ot = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), nt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), at = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), st = [
  ot,
  nt,
  at
], rt = { class: "cvp-controller-volume" }, lt = ["title"], it = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, dt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ct = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), vt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), ut = [
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
}, ft = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), mt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ht = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), _t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), gt = [
  ft,
  mt,
  ht,
  _t
], bt = { class: "cvp-controller-volume-drag" }, yt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
  class: "cvp-controller-icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ a("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ a("path", { d: "M20 5v14l-12 -7z" }),
  /* @__PURE__ */ a("line", {
    x1: "4",
    y1: "5",
    x2: "4",
    y2: "19"
  })
], -1)), wt = [
  yt
], kt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
  class: "cvp-controller-icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ a("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ a("path", { d: "M4 5v14l12 -7z" }),
  /* @__PURE__ */ a("line", {
    x1: "20",
    y1: "5",
    x2: "20",
    y2: "19"
  })
], -1)), xt = [
  kt
], Mt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("div", { style: { flex: "1" } }, null, -1)), Tt = { class: "cvp-controller-playback-rate" }, $t = {
  class: "cvp-controller-playback-rate-text",
  title: "Playback rate"
}, Et = { class: "cvp-controller-playback-rate-list" }, Vt = { class: "cvp-controller-playback-rate-item" }, St = ["onClick"], Ct = ["title"], Ft = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Bt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-0dab554c></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-0dab554c></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-0dab554c></path><path d="M9 6v-3h6v3" data-v-0dab554c></path><path d="M9 18v3h6v-3" data-v-0dab554c></path>', 5), zt = [
  Bt
], Dt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ht = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-0dab554c></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-0dab554c></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-0dab554c></path><path d="M3 6v-3h18v3" data-v-0dab554c></path><path d="M3 18v3h18v-3" data-v-0dab554c></path>', 5), Pt = [
  Ht
], Rt = ["title"], It = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1.5",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ a("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ a("path", { d: "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }),
  /* @__PURE__ */ a("path", { d: "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" })
], -1)), Ot = [
  It
], Lt = ["title"], Wt = /* @__PURE__ */ K('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-0dab554c><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-0dab554c></path><circle cx="5" cy="5" r="2" data-v-0dab554c></circle><circle cx="19" cy="5" r="2" data-v-0dab554c></circle><circle cx="5" cy="19" r="2" data-v-0dab554c></circle><circle cx="19" cy="19" r="2" data-v-0dab554c></circle><line x1="5" y1="7" x2="5" y2="17" data-v-0dab554c></line><line x1="7" y1="5" x2="17" y2="5" data-v-0dab554c></line><line x1="7" y1="19" x2="17" y2="19" data-v-0dab554c></line><line x1="19" y1="7" x2="19" y2="17" data-v-0dab554c></line></svg>', 1), Nt = [
  Wt
], jt = ["title"], At = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, qt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-0dab554c></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-0dab554c></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-0dab554c></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-0dab554c></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-0dab554c></path>', 5), Ut = [
  qt
], Gt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Kt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-0dab554c></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-0dab554c></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-0dab554c></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-0dab554c></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-0dab554c></path>', 5), Jt = [
  Kt
], Qt = {
  __name: "Controller",
  setup(l) {
    const {
      data: t,
      toggleVideoPlay: v,
      toggleVideoMute: s,
      changeVideoVolume: i,
      changeVideoFrame: y,
      setVideoPlaybackRate: E,
      setVideoRange: T,
      toggleVideoLoop: _,
      toggleVideoBbox: g,
      toggleFullScreen: f
    } = I(), h = z(() => t.range.start > 0 && t.range.end > 0), C = z(() => t.video.fps > 0), F = z(() => Object.keys(t.bbox.data).length > 0), j = () => {
      T(!t.range.enabled);
    };
    return (se, d) => {
      var J;
      return u(), p("div", Je, [
        a("button", {
          class: "cvp-controller-button",
          title: e(t).video.paused ? "Play" : "Pause",
          onClick: d[0] || (d[0] = (...m) => e(v) && e(v)(...m))
        }, [
          e(t).video.paused ? (u(), p("svg", Ye, et)) : (u(), p("svg", tt, st))
        ], 8, Qe),
        a("div", rt, [
          a("button", {
            class: "cvp-controller-button",
            title: e(t).video.muted ? "Unmute" : "Mute",
            onClick: d[1] || (d[1] = (...m) => e(s) && e(s)(...m))
          }, [
            e(t).video.muted ? (u(), p("svg", it, ut)) : (u(), p("svg", pt, gt))
          ], 8, lt),
          a("div", bt, [
            a("div", {
              class: "cvp-controller-volume-area",
              onMousedown: d[2] || (d[2] = he((m) => {
                e(t).container.mouseDown = !0, e(i)(m);
              }, ["self"])),
              onMousemove: d[3] || (d[3] = (...m) => e(i) && e(i)(...m)),
              onMouseup: d[4] || (d[4] = (m) => e(t).container.mouseDown = !1),
              onMouseleave: d[5] || (d[5] = (m) => e(t).container.mouseDown = !1)
            }, [
              a("div", {
                class: "cvp-controller-volume-bar",
                style: q({ height: `${e(t).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        a("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: d[6] || (d[6] = (m) => {
            e(t).container.mouseDown = !0, e(y)(!1);
          }),
          onMouseup: d[7] || (d[7] = (m) => {
            e(t).container.mouseDown = !1, e(y)(!1);
          })
        }, wt, 32),
        a("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: d[8] || (d[8] = (m) => {
            e(t).container.mouseDown = !0, e(y)(!0);
          }),
          onMouseup: d[9] || (d[9] = (m) => {
            e(t).container.mouseDown = !1, e(y)(!0);
          })
        }, xt, 32),
        Mt,
        a("div", Tt, [
          a("div", $t, "x" + $(((J = e(t).video.playbackRate) == null ? void 0 : J.toFixed(1)) || "1.0"), 1),
          a("ul", Et, [
            (u(!0), p($e, null, Ee([0.1, 0.5, 1, 1.5, 2, 5], (m) => (u(), p("li", Vt, [
              a("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (Q) => e(E)(m)
              }, $(m.toFixed(1)), 9, St)
            ]))), 256))
          ])
        ]),
        e(h) ? (u(), p("button", {
          key: 0,
          class: R(["cvp-controller-button", e(t).range.enabled && "cvp-controller-button-active"]),
          title: e(t).range.enabled ? "Reset range" : "Set range",
          onClick: j
        }, [
          e(t).range.enabled ? (u(), p("svg", Ft, zt)) : (u(), p("svg", Dt, Pt))
        ], 10, Ct)) : H("", !0),
        a("button", {
          class: R(["cvp-controller-button", e(t).video.loop && "cvp-controller-button-active"]),
          title: e(t).video.loop ? "Play once" : "Repeat play",
          onClick: d[10] || (d[10] = (...m) => e(_) && e(_)(...m))
        }, Ot, 10, Rt),
        e(C) && e(F) ? (u(), p("button", {
          key: 1,
          class: R(["cvp-controller-button", e(t).bbox.enabled && "cvp-controller-button-active"]),
          title: e(t).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: d[11] || (d[11] = (...m) => e(g) && e(g)(...m))
        }, Nt, 10, Lt)) : H("", !0),
        a("button", {
          class: "cvp-controller-button",
          title: e(t).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: d[12] || (d[12] = (...m) => e(f) && e(f)(...m))
        }, [
          e(t).container.fullScreen ? (u(), p("svg", At, Ut)) : (u(), p("svg", Gt, Jt))
        ], 8, jt)
      ]);
    };
  }
}, Yt = /* @__PURE__ */ O(Qt, [["__scopeId", "data-v-0dab554c"]]);
const Zt = {
  __name: "index",
  setup(l) {
    const { data: t, handleContainerMouseMove: v } = I();
    return (s, i) => (u(), p("div", {
      class: R(["cvp-footer", e(t).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: i[0] || (i[0] = (y) => e(t).container.mouseHold = !0),
      onMouseleave: i[1] || (i[1] = (y) => {
        e(t).container.mouseHold = !1, e(v)();
      })
    }, [
      W(Ke),
      W(Yt)
    ], 34));
  }
}, Xt = /* @__PURE__ */ O(Zt, [["__scopeId", "data-v-989de2c1"]]);
const eo = { class: "cvp-message" }, to = ["innerHTML"], oo = {
  __name: "Message",
  setup(l) {
    const { data: t } = I();
    return (v, s) => (u(), p("div", eo, [
      a("div", {
        class: R(["cvp-message-text", e(t).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: e(t).message.text
      }, null, 10, to)
    ]));
  }
}, no = /* @__PURE__ */ O(oo, [["__scopeId", "data-v-1ecb3b3a"]]);
const ao = ["data-dark-mode", "data-type"], so = {
  key: 0,
  class: "cvp-block"
}, ro = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    range: { type: Array, validator: (l) => !l.length || l.length === 2 && l.every((t) => typeof t == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(l) {
    const t = l, v = G(null), { data: s, setVideoRange: i, handleContainerMouseMove: y } = I();
    return Ve(() => t, ({ src: E, muted: T, loop: _, range: g, fps: f, bbox: h, type: C, messageTime: F, preview: j }) => {
      Object.assign(s.container, { type: C }), Object.assign(s.video, { src: E, muted: T, loop: _, fps: f }), Object.assign(s.preview, { enabled: j }), Object.assign(s.range, { start: g[0], end: g[1] }), Object.assign(s.bbox, { ...h }), Object.assign(s.message, { time: F }), s.range.start && s.range.end && i(!0), Object.keys(s.bbox.data).length && (s.bbox.enabled = !0);
    }, { deep: !0 }), pe(() => {
      Object.assign(s, { container: { ...s.container, element: v.value } }), s.container.type === "overlay" && s.container.element.addEventListener("mousemove", y);
    }), Se(() => {
      s.container.type === "overlay" && s.container.element.removeEventListener("mousemove", y);
    }), (E, T) => (u(), p("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": l.darkMode,
      "data-type": t.type
    }, [
      W(Ie),
      W(Ne, {
        src: t.src,
        muted: t.muted,
        autoplay: t.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      W(Xt),
      W(no),
      t.src.length ? H("", !0) : (u(), p("div", so, $(e(s).block.text), 1))
    ], 8, ao));
  }
}, io = /* @__PURE__ */ O(ro, [["__scopeId", "data-v-5281f359"]]);
export {
  io as default
};
