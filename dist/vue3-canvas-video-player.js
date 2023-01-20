import { reactive as xe, computed as D, onMounted as ue, onUnmounted as Me, openBlock as u, createElementBlock as p, createElementVNode as a, unref as e, toDisplayString as T, createCommentVNode as z, pushScopeId as pe, popScopeId as fe, ref as U, withModifiers as me, normalizeStyle as A, Fragment as $e, renderList as Te, createStaticVNode as G, createVNode as L, watch as Ee, onBeforeUnmount as Ve } from "vue";
const W = (l) => {
  const t = parseInt(l), v = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), d = t % 60;
  return `${v < 10 ? "0" + v : v}:${s < 10 ? "0" + s : s}:${d < 10 ? "0" + d : d}`;
}, V = (l, t) => Math.round(l * t), ne = (l, t) => l / t, q = (l) => l === void 0 ? !1 : new Intl.NumberFormat().format(l), o = xe({
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
let Z = !1;
function R() {
  const l = D(() => o.range.start > 0 && o.range.end > 0), t = D(() => o.video.fps > 0), v = D(() => Object.keys(o.bbox.data).length > 0), s = () => {
    const {
      video: { element: n, canvas: r, width: i, height: _, duration: y, fps: x },
      range: { start: C }
    } = o, $ = r.getContext("2d");
    r.width = i, r.height = _, n.loop = o.video.loop, l.value && (n.currentTime = C), n.paused && (o.video.paused = !0, n.pause());
    const j = () => {
      const {
        video: { loop: Q },
        range: { enabled: P, start: te, end: oe },
        bbox: { data: ge, fillColor: be, borderSize: O, borderColor: ye, enabled: we }
      } = o;
      $.drawImage(n, 0, 0, i, _);
      let Y = o.video.currentTime = n.currentTime;
      if (l.value && P ? (n.currentTime >= oe && (Q ? n.currentTime = te : (n.currentTime = oe, n.pause(), o.video.paused = !0)), o.progress.seekWidth = (Y - te) / (oe - te) * 100, o.progress.bufferWidth = 100) : (n.ended && Q && (Y = 0), o.progress.seekWidth = Y / y * 100, n.buffered.length > 0 && (o.progress.bufferWidth = n.buffered.end(n.buffered.length - 1) / y * 100)), t.value && v.value && we) {
        const ke = V(Y, x), H = ge[ke];
        if (H && H.length === 4) {
          const ie = H[0], de = H[1], ce = H[2] - H[0], ve = H[3] - H[1];
          $.fillStyle = be, $.fillRect(ie, de, ce, ve), O && ($.lineWidth = O, $.strokeStyle = ye, $.strokeRect(ie - O / 2, de - O / 2, ce + O, ve + O));
        }
      }
      n.paused && Math.floor(o.progress.seekWidth) === 100 && (o.video.paused = !0), window.requestAnimationFrame(j);
    };
    j();
  }, d = (n) => {
    const {
      video: { element: r, duration: i, fps: _ },
      range: { enabled: y, start: x, end: C }
    } = o;
    r.currentTime = l.value && y ? Math.max(Math.min(n, C), x) : Math.max(Math.min(n, i), 0);
    const $ = l.value && y ? Math.round((r.currentTime - x) / (C - x) * 100) : Math.round(r.currentTime / i * 100);
    S(`Seek ${W(r.currentTime)} ${t.value ? `[${q(V(r.currentTime, _))}]` : ""} (${$}%)`);
  }, w = ({ offsetX: n }) => {
    const {
      container: { mouseDown: r },
      video: { element: i, duration: _ },
      progress: { seekTotal: y },
      preview: { enabled: x, element: C },
      range: { enabled: $, start: j, end: Q }
    } = o;
    if (!i)
      return;
    const P = $ ? n / y * (Q - j) + j : n / y * _;
    P === 1 / 0 || isNaN(P) || (r && d(P), C && x && (C.currentTime = P, o.preview.time = W(P), n < 65 ? o.preview.left = 65 : n > y - 65 ? o.preview.left = y - 65 : o.preview.left = n));
  };
  let E;
  const M = ({ detail: n }) => {
    if (n === 1) {
      const {
        video: { element: r, paused: i },
        range: { enabled: _, start: y, end: x }
      } = o;
      E = setTimeout(() => {
        i ? (l.value && _ && r.currentTime === x && (r.currentTime = y), r.play()) : r.pause(), S(i ? "Play" : "Pause"), o.video.paused = !i;
      }, 250);
    } else
      n === 2 && (clearTimeout(E), se());
  }, g = (n) => {
    const {
      video: { element: r }
    } = o, i = Math.max(Math.min(n, 1), 0);
    r.volume = o.video.volume = i, S(`Volume ${Math.floor(i * 100)}%`);
  }, b = ({ offsetY: n }) => {
    const {
      container: { mouseDown: r }
    } = o;
    r && g((100 - n) / 100);
  }, f = () => {
    const {
      video: { element: n, muted: r }
    } = o;
    n.muted = o.video.muted = !r, S(r ? "Unmuted" : "Muted");
  }, h = () => {
    const {
      video: { element: n, fps: r },
      range: { end: i }
    } = o;
    if (t.value) {
      const _ = V(n.currentTime, r) + 1;
      V(i, r) === _ ? d(i) : d(ne(_, r));
    } else
      d(n.currentTime + 1);
  }, F = () => {
    const {
      video: { element: n, fps: r },
      range: { start: i }
    } = o;
    if (t.value) {
      const _ = V(n.currentTime, r) - 1;
      V(i, r) === _ ? d(i) : d(ne(_, r));
    } else
      d(n.currentTime - 1);
  };
  let B;
  const N = (n) => {
    const {
      container: { mouseDown: r }
    } = o;
    r ? B = setInterval(() => {
      n ? h() : F();
    }, 60) : clearInterval(B);
  }, ae = (n) => {
    const {
      video: { element: r }
    } = o;
    r.playbackRate = o.video.playbackRate = n, S(`Playback Rate x${n.toFixed(1)}`);
  }, c = (n) => {
    const {
      video: { element: r, duration: i },
      progress: { seekTotal: _ },
      range: { start: y, end: x }
    } = o;
    o.range.enabled !== n && (o.range.enabled = n, S(n ? "Active range" : "Inactive range")), n ? (r.currentTime = y, o.range.left = 0, o.range.width = _, o.progress.seekWidth = 0) : (r.currentTime = 0, o.range.left = Math.floor(y / i * _), o.range.width = Math.ceil(x / i * _ - y / i * _) || 1);
  }, K = () => {
    const {
      video: { element: n, loop: r }
    } = o;
    n.loop = o.video.loop = !r, S(r ? "Play once" : "Repeat play");
  }, m = () => {
    const {
      bbox: { enabled: n }
    } = o;
    o.bbox.enabled = !n, S(n ? "Hide bounding box" : "Show bounding box");
  };
  let J;
  const S = (n) => {
    const { message: r } = o, { time: i } = r;
    !i || (r.text = n, r.visible = !0, J && clearTimeout(J), J = setTimeout(() => {
      r.visible = !1;
    }, i));
  }, se = () => {
    const {
      container: { element: n }
    } = o;
    document.fullscreenElement ? document.exitFullscreen() : n.requestFullscreen();
  }, re = ({ altKey: n, ctrlKey: r, key: i }) => {
    const {
      video: { element: _, paused: y, volume: x, fps: C }
    } = o;
    if (n && r) {
      if (i === "g" && t.value) {
        const $ = window.prompt("Go to frame number", V(_.currentTime, C));
        y && _.pause(), _.currentTime = ne($, C);
      }
      i === "ArrowUp" && g(x + 0.05), i === "ArrowDown" && g(x - 0.05), i === "ArrowLeft" && F(), i === "ArrowRight" && h();
    }
  }, le = () => {
    o.container.fullScreen = Boolean(document.fullscreenElement), S(`${o.container.fullScreen ? "Full" : "Normal"} screen`);
  }, he = () => {
    const {
      container: { element: n },
      range: { enabled: r },
      preview: { enabled: i }
    } = o;
    o.progress.seekTotal = n.offsetWidth, l.value && r && c(!0), i && (o.preview.left = 0);
  };
  let ee;
  const _e = () => {
    ee && clearTimeout(ee), o.container.mouseMove = !0, !o.container.mouseHold && (ee = setTimeout(() => {
      o.container.mouseMove = !1;
    }, 2e3));
  };
  return ue(() => {
    Z || (window.addEventListener("keydown", re), document.addEventListener("fullscreenchange", le), setTimeout(() => {
      o.container.resizeObserver = new ResizeObserver(he), o.container.resizeObserver.observe(o.container.element);
    }, 300), Z = !0);
  }), Me(() => {
    !Z || (o.container.resizeObserver.unobserve(o.container.element), window.removeEventListener("keydown", re), document.removeEventListener("fullscreenchange", le), Z = !1);
  }), {
    data: o,
    initialVideo: s,
    setVideoSeek: w,
    toggleVideoPlay: M,
    toggleVideoMute: f,
    changeVideoVolume: b,
    changeVideoFrame: N,
    setVideoPlaybackRate: ae,
    setVideoRange: c,
    toggleVideoLoop: K,
    toggleVideoBbox: m,
    toggleFullScreen: se,
    setMessage: S,
    handleContainerMouseMove: _e
  };
}
const I = (l, t) => {
  const v = l.__vccOpts || l;
  for (const [s, d] of t)
    v[s] = d;
  return v;
}, X = (l) => (pe("data-v-80935bed"), l = l(), fe(), l), Se = { class: "cvp-header" }, Ce = ["data-active"], Fe = /* @__PURE__ */ X(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, De = /* @__PURE__ */ X(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), He = ["data-active"], ze = /* @__PURE__ */ X(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Pe = { key: 0 }, Re = /* @__PURE__ */ X(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = {
  __name: "Header",
  setup(l) {
    const { data: t } = R(), v = D(() => t.range.start > 0 && t.range.end > 0), s = D(() => t.video.fps > 0);
    return (d, w) => (u(), p("div", Se, [
      a("div", {
        class: "cvp-information",
        "data-active": !e(t).range.enabled
      }, [
        a("span", null, T(e(W)(e(t).video.currentTime)), 1),
        Fe,
        a("span", null, T(e(W)(e(t).video.duration)), 1),
        e(s) ? (u(), p("span", Be, [
          a("span", null, " [ " + T(e(q)(e(V)(e(t).video.currentTime, e(t).video.fps))), 1),
          De,
          a("span", null, T(e(q)(e(V)(e(t).video.duration, e(t).video.fps))) + " ]", 1)
        ])) : z("", !0)
      ], 8, Ce),
      e(v) ? (u(), p("div", {
        key: 0,
        class: "cvp-information",
        "data-active": e(t).range.enabled
      }, [
        a("span", null, T(e(W)(e(t).video.currentTime)), 1),
        ze,
        a("span", null, T(e(W)(e(t).range.end)), 1),
        e(s) ? (u(), p("span", Pe, [
          a("span", null, " [ " + T(e(q)(e(V)(e(t).video.currentTime, e(t).video.fps))), 1),
          Re,
          a("span", null, T(e(q)(e(V)(e(t).range.end, e(t).video.fps))) + " ]", 1)
        ])) : z("", !0)
      ], 8, He)) : z("", !0)
    ]));
  }
}, Oe = /* @__PURE__ */ I(Ie, [["__scopeId", "data-v-80935bed"]]);
const Le = { class: "cvp-main" }, We = ["src", "muted", "autoplay"], Ne = {
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
    const v = l, s = U(null), d = U(null), { data: w, initialVideo: E, toggleVideoPlay: M } = R(), g = (b) => {
      Object.assign(w, {
        video: {
          ...w.video,
          element: s.value,
          canvas: d.value,
          width: s.value.videoWidth,
          height: s.value.videoHeight,
          duration: s.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), E(), t("loadedmetadata", b);
    };
    return (b, f) => (u(), p("div", Le, [
      a("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: s,
        src: l.src,
        muted: l.muted,
        autoplay: l.autoplay,
        onLoadedmetadata: f[0] || (f[0] = (h) => g(h)),
        onPlay: f[1] || (f[1] = (h) => t("play", h)),
        onPause: f[2] || (f[2] = (h) => t("pause", h)),
        onTimeupdate: f[3] || (f[3] = (h) => t("timeupdate", h)),
        onVolumechange: f[4] || (f[4] = (h) => t("volumechange", h)),
        onError: f[5] || (f[5] = (h) => t("error", h))
      }, null, 40, We),
      a("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: d,
        onClick: f[6] || (f[6] = (...h) => e(M) && e(M)(...h))
      }, null, 512)
    ]));
  }
}, je = /* @__PURE__ */ I(Ne, [["__scopeId", "data-v-352dd94f"]]);
const Ae = { class: "cvp-progress" }, qe = { class: "cvp-progress-drag" }, Ue = ["src"], Ge = { class: "cvp-progress-preview-time" }, Ke = {
  __name: "Progress",
  setup(l) {
    const t = U(null), v = U(null), { data: s, setVideoSeek: d } = R(), w = D(() => s.range.start > 0 && s.range.end > 0), E = () => {
      setTimeout(() => {
        const {
          video: { width: M, height: g },
          preview: { enabled: b }
        } = s;
        if (!b)
          return;
        const f = v.value.getContext("2d"), h = M * 0.3, F = g * 0.3;
        v.value.width = h, v.value.height = F, Object.assign(s, {
          preview: {
            ...s.preview,
            element: t.value
          }
        });
        const B = () => {
          !t.value || (f.imageSmoothingEnabled = !0, f.drawImage(t.value, 0, 0, h, F), window.requestAnimationFrame(B));
        };
        B();
      }, 100);
    };
    return (M, g) => (u(), p("div", Ae, [
      a("div", qe, [
        a("div", {
          class: "cvp-progress-area",
          onMousedown: g[0] || (g[0] = me((b) => {
            e(s).container.mouseDown = !0, e(d)(b);
          }, ["self"])),
          onMousemove: g[1] || (g[1] = (...b) => e(d) && e(d)(...b)),
          onMouseup: g[2] || (g[2] = (b) => e(s).container.mouseDown = !1),
          onMouseleave: g[3] || (g[3] = (b) => e(s).container.mouseDown = !1)
        }, [
          a("div", {
            class: "cvp-progress-buffer",
            style: A({ width: `${e(s).progress.bufferWidth}%` })
          }, null, 4),
          a("div", {
            class: "cvp-progress-bar",
            style: A({ width: `${e(s).progress.seekWidth}%` })
          }, null, 4),
          e(w) ? (u(), p("div", {
            key: 0,
            class: "cvp-progress-range",
            style: A({ left: `${e(s).range.left}px`, width: `${e(s).range.width}px` })
          }, null, 4)) : z("", !0)
        ], 32)
      ]),
      e(s).preview.enabled ? (u(), p("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: A({ left: `${e(s).preview.left}px` })
      }, [
        a("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: t,
          src: e(s).video.src,
          onLoadeddata: E
        }, null, 40, Ue),
        a("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        a("div", Ge, T(e(s).preview.time), 1)
      ], 4)) : z("", !0)
    ]));
  }
}, Je = /* @__PURE__ */ I(Ke, [["__scopeId", "data-v-072f246c"]]);
const k = (l) => (pe("data-v-f2163948"), l = l(), fe(), l), Qe = { class: "cvp-controller" }, Ye = ["title"], Ze = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Xe = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), et = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M7 4v16l13 -8z" }, null, -1)), tt = [
  Xe,
  et
], ot = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, nt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), at = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), st = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), rt = [
  nt,
  at,
  st
], lt = { class: "cvp-controller-volume" }, it = ["title"], dt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ct = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), vt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), ut = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), pt = [
  ct,
  vt,
  ut
], ft = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, mt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ht = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), _t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), gt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), bt = [
  mt,
  ht,
  _t,
  gt
], yt = { class: "cvp-controller-volume-drag" }, wt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), kt = [
  wt
], xt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), Mt = [
  xt
], $t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("div", { style: { flex: "1" } }, null, -1)), Tt = { class: "cvp-controller-playback-rate" }, Et = {
  class: "cvp-controller-playback-rate-text",
  title: "Playback rate"
}, Vt = { class: "cvp-controller-playback-rate-list" }, St = { class: "cvp-controller-playback-rate-item" }, Ct = ["onClick"], Ft = ["data-active", "title"], Bt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Dt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M9 6v-3h6v3" data-v-f2163948></path><path d="M9 18v3h6v-3" data-v-f2163948></path>', 5), Ht = [
  Dt
], zt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Pt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M3 6v-3h18v3" data-v-f2163948></path><path d="M3 18v3h18v-3" data-v-f2163948></path>', 5), Rt = [
  Pt
], It = ["data-active", "title"], Ot = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), Lt = [
  Ot
], Wt = ["data-active", "title"], Nt = /* @__PURE__ */ G('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-f2163948><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><circle cx="5" cy="5" r="2" data-v-f2163948></circle><circle cx="19" cy="5" r="2" data-v-f2163948></circle><circle cx="5" cy="19" r="2" data-v-f2163948></circle><circle cx="19" cy="19" r="2" data-v-f2163948></circle><line x1="5" y1="7" x2="5" y2="17" data-v-f2163948></line><line x1="7" y1="5" x2="17" y2="5" data-v-f2163948></line><line x1="7" y1="19" x2="17" y2="19" data-v-f2163948></line><line x1="19" y1="7" x2="19" y2="17" data-v-f2163948></line></svg>', 1), jt = [
  Nt
], At = ["title"], qt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ut = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), Gt = [
  Ut
], Kt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Jt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), Qt = [
  Jt
], Yt = {
  __name: "Controller",
  setup(l) {
    const {
      data: t,
      toggleVideoPlay: v,
      toggleVideoMute: s,
      changeVideoVolume: d,
      changeVideoFrame: w,
      setVideoPlaybackRate: E,
      setVideoRange: M,
      toggleVideoLoop: g,
      toggleVideoBbox: b,
      toggleFullScreen: f
    } = R(), h = D(() => t.range.start > 0 && t.range.end > 0), F = D(() => t.video.fps > 0), B = D(() => Object.keys(t.bbox.data).length > 0), N = () => {
      M(!t.range.enabled);
    };
    return (ae, c) => {
      var K;
      return u(), p("div", Qe, [
        a("button", {
          class: "cvp-controller-button",
          title: e(t).video.paused ? "Play" : "Pause",
          onClick: c[0] || (c[0] = (...m) => e(v) && e(v)(...m))
        }, [
          e(t).video.paused ? (u(), p("svg", Ze, tt)) : (u(), p("svg", ot, rt))
        ], 8, Ye),
        a("div", lt, [
          a("button", {
            class: "cvp-controller-button",
            title: e(t).video.muted ? "Unmute" : "Mute",
            onClick: c[1] || (c[1] = (...m) => e(s) && e(s)(...m))
          }, [
            e(t).video.muted ? (u(), p("svg", dt, pt)) : (u(), p("svg", ft, bt))
          ], 8, it),
          a("div", yt, [
            a("div", {
              class: "cvp-controller-volume-area",
              onMousedown: c[2] || (c[2] = me((m) => {
                e(t).container.mouseDown = !0, e(d)(m);
              }, ["self"])),
              onMousemove: c[3] || (c[3] = (...m) => e(d) && e(d)(...m)),
              onMouseup: c[4] || (c[4] = (m) => e(t).container.mouseDown = !1),
              onMouseleave: c[5] || (c[5] = (m) => e(t).container.mouseDown = !1)
            }, [
              a("div", {
                class: "cvp-controller-volume-bar",
                style: A({ height: `${e(t).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        a("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: c[6] || (c[6] = (m) => {
            e(t).container.mouseDown = !0, e(w)(!1);
          }),
          onMouseup: c[7] || (c[7] = (m) => {
            e(t).container.mouseDown = !1, e(w)(!1);
          })
        }, kt, 32),
        a("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: c[8] || (c[8] = (m) => {
            e(t).container.mouseDown = !0, e(w)(!0);
          }),
          onMouseup: c[9] || (c[9] = (m) => {
            e(t).container.mouseDown = !1, e(w)(!0);
          })
        }, Mt, 32),
        $t,
        a("div", Tt, [
          a("div", Et, "x" + T(((K = e(t).video.playbackRate) == null ? void 0 : K.toFixed(1)) || "1.0"), 1),
          a("ul", Vt, [
            (u(!0), p($e, null, Te([0.1, 0.5, 1, 1.5, 2, 5], (m) => (u(), p("li", St, [
              a("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (J) => e(E)(m)
              }, T(m.toFixed(1)), 9, Ct)
            ]))), 256))
          ])
        ]),
        e(h) ? (u(), p("button", {
          key: 0,
          class: "cvp-controller-button",
          "data-active": e(t).range.enabled,
          title: e(t).range.enabled ? "Reset range" : "Set range",
          onClick: N
        }, [
          e(t).range.enabled ? (u(), p("svg", Bt, Ht)) : (u(), p("svg", zt, Rt))
        ], 8, Ft)) : z("", !0),
        a("button", {
          class: "cvp-controller-button",
          "data-active": e(t).video.loop,
          title: e(t).video.loop ? "Play once" : "Repeat play",
          onClick: c[10] || (c[10] = (...m) => e(g) && e(g)(...m))
        }, Lt, 8, It),
        e(F) && e(B) ? (u(), p("button", {
          key: 1,
          class: "cvp-controller-button",
          "data-active": e(t).bbox.enabled,
          title: e(t).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: c[11] || (c[11] = (...m) => e(b) && e(b)(...m))
        }, jt, 8, Wt)) : z("", !0),
        a("button", {
          class: "cvp-controller-button",
          title: e(t).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: c[12] || (c[12] = (...m) => e(f) && e(f)(...m))
        }, [
          e(t).container.fullScreen ? (u(), p("svg", qt, Gt)) : (u(), p("svg", Kt, Qt))
        ], 8, At)
      ]);
    };
  }
}, Zt = /* @__PURE__ */ I(Yt, [["__scopeId", "data-v-f2163948"]]);
const Xt = ["data-active"], eo = {
  __name: "index",
  setup(l) {
    const { data: t, handleContainerMouseMove: v } = R();
    return (s, d) => (u(), p("div", {
      class: "cvp-footer",
      "data-active": e(t).container.mouseMove,
      onMouseenter: d[0] || (d[0] = (w) => e(t).container.mouseHold = !0),
      onMouseleave: d[1] || (d[1] = (w) => {
        e(t).container.mouseHold = !1, e(v)();
      })
    }, [
      L(Je),
      L(Zt)
    ], 40, Xt));
  }
}, to = /* @__PURE__ */ I(eo, [["__scopeId", "data-v-33a4d776"]]);
const oo = { class: "cvp-message" }, no = ["data-visible", "innerHTML"], ao = {
  __name: "Message",
  setup(l) {
    const { data: t } = R();
    return (v, s) => (u(), p("div", oo, [
      a("div", {
        class: "cvp-message-text",
        "data-visible": e(t).message.visible,
        innerHTML: e(t).message.text
      }, null, 8, no)
    ]));
  }
}, so = /* @__PURE__ */ I(ao, [["__scopeId", "data-v-8fa62035"]]);
const ro = ["data-dark-mode", "data-type"], lo = {
  key: 0,
  class: "cvp-block"
}, io = {
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
    const t = l, v = U(null), { data: s, setVideoRange: d, handleContainerMouseMove: w } = R();
    return Ee(() => t, ({ src: E, muted: M, loop: g, range: b, fps: f, bbox: h, type: F, messageTime: B, preview: N }) => {
      Object.assign(s.container, { type: F }), Object.assign(s.video, { src: E, muted: M, loop: g, fps: f }), Object.assign(s.preview, { enabled: N }), Object.assign(s.range, { start: b[0], end: b[1] }), Object.assign(s.bbox, { ...h }), Object.assign(s.message, { time: B }), s.range.start && s.range.end && d(!0), Object.keys(s.bbox.data).length && (s.bbox.enabled = !0);
    }, { deep: !0 }), ue(() => {
      Object.assign(s, { container: { ...s.container, element: v.value } }), s.container.type === "overlay" && s.container.element.addEventListener("mousemove", w);
    }), Ve(() => {
      s.container.type === "overlay" && s.container.element.removeEventListener("mousemove", w);
    }), (E, M) => (u(), p("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": l.darkMode,
      "data-type": t.type
    }, [
      L(Oe),
      L(je, {
        src: t.src,
        muted: t.muted,
        autoplay: t.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      L(to),
      L(so),
      t.src.length ? z("", !0) : (u(), p("div", lo, T(e(s).block.text), 1))
    ], 8, ro));
  }
}, vo = /* @__PURE__ */ I(io, [["__scopeId", "data-v-14f3040e"]]);
export {
  vo as default
};
