import { reactive as Me, computed as g, onMounted as ue, onUnmounted as $e, openBlock as u, createElementBlock as p, createElementVNode as a, unref as t, toDisplayString as F, createCommentVNode as P, pushScopeId as pe, popScopeId as fe, ref as G, withModifiers as me, normalizeStyle as q, Fragment as Te, renderList as Ee, createStaticVNode as K, createVNode as N, watch as Ve, onBeforeUnmount as Se } from "vue";
const U = (l) => {
  const e = parseInt(l), v = Math.floor(e / 3600), s = Math.floor(e % 3600 / 60), d = e % 60;
  return `${v < 10 ? "0" + v : v}:${s < 10 ? "0" + s : s}:${d < 10 ? "0" + d : d}`;
}, D = (l, e) => Math.round(l * e), ae = (l, e) => l / e, X = (l) => l === void 0 ? !1 : new Intl.NumberFormat().format(l), o = Me({
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
function I() {
  const l = g(() => o.range.start > 0 && o.range.end > 0), e = g(() => o.video.fps > 0), v = g(() => Object.keys(o.bbox.data).length > 0), s = () => {
    const {
      video: { element: n, canvas: r, width: i, height: _, duration: y, fps: E },
      range: { start: B }
    } = o, S = r.getContext("2d");
    r.width = i, r.height = _, n.loop = o.video.loop, l.value && (n.currentTime = B), n.paused && (o.video.paused = !0, n.pause());
    const A = () => {
      const {
        video: { loop: Q, src: W },
        range: { enabled: ge, start: oe, end: ne },
        bbox: { data: be, fillColor: ye, borderSize: O, borderColor: we, enabled: ke }
      } = o;
      if (!W) {
        S.clearRect(0, 0, i, _);
        return;
      }
      S.drawImage(n, 0, 0, i, _);
      let Y = o.video.currentTime = n.currentTime;
      if (l.value && ge ? (n.currentTime >= ne && (Q ? n.currentTime = oe : (n.currentTime = ne, n.pause(), o.video.paused = !0)), o.progress.seekWidth = (Y - oe) / (ne - oe) * 100, o.progress.bufferWidth = 100) : (n.ended && Q && (Y = 0), o.progress.seekWidth = Y / y * 100, n.buffered.length > 0 && (o.progress.bufferWidth = n.buffered.end(n.buffered.length - 1) / y * 100)), e.value && v.value && ke) {
        const xe = D(Y, E), z = be[xe];
        if (z && z.length === 4) {
          const ie = z[0], de = z[1], ce = z[2] - z[0], ve = z[3] - z[1];
          S.fillStyle = ye, S.fillRect(ie, de, ce, ve), O && (S.lineWidth = O, S.strokeStyle = we, S.strokeRect(ie - O / 2, de - O / 2, ce + O, ve + O));
        }
      }
      n.paused && Math.floor(o.progress.seekWidth) === 100 && (o.video.paused = !0), window.requestAnimationFrame(A);
    };
    A();
  }, d = (n) => {
    const {
      video: { element: r, duration: i, fps: _ },
      range: { enabled: y, start: E, end: B }
    } = o;
    r.currentTime = l.value && y ? Math.max(Math.min(n, B), E) : Math.max(Math.min(n, i), 0);
    const S = l.value && y ? Math.round((r.currentTime - E) / (B - E) * 100) : Math.round(r.currentTime / i * 100);
    C(`Seek ${U(r.currentTime)} ${e.value ? `[${X(D(r.currentTime, _))}]` : ""} (${S}%)`);
  }, b = ({ offsetX: n }) => {
    const {
      container: { mouseDown: r },
      video: { element: i, duration: _ },
      progress: { seekTotal: y },
      preview: { enabled: E, element: B },
      range: { enabled: S, start: A, end: Q }
    } = o;
    if (!i)
      return;
    const W = S ? n / y * (Q - A) + A : n / y * _;
    W === 1 / 0 || isNaN(W) || (r && d(W), B && E && (B.currentTime = W, o.preview.time = U(W), n < 65 ? o.preview.left = 65 : n > y - 65 ? o.preview.left = y - 65 : o.preview.left = n));
  };
  let V;
  const x = ({ detail: n }) => {
    if (n === 1) {
      const {
        video: { element: r, paused: i },
        range: { enabled: _, start: y, end: E }
      } = o;
      V = setTimeout(() => {
        i ? (l.value && _ && r.currentTime === E && (r.currentTime = y), r.play()) : r.pause(), C(i ? "Play" : "Pause"), o.video.paused = !i;
      }, 250);
    } else
      n === 2 && (clearTimeout(V), se());
  }, M = (n) => {
    const {
      video: { element: r }
    } = o, i = Math.max(Math.min(n, 1), 0);
    r.volume = o.video.volume = i, C(`Volume ${Math.floor(i * 100)}%`);
  }, $ = ({ offsetY: n }) => {
    const {
      container: { mouseDown: r }
    } = o;
    r && M((100 - n) / 100);
  }, f = () => {
    const {
      video: { element: n, muted: r }
    } = o;
    n.muted = o.video.muted = !r, C(r ? "Unmuted" : "Muted");
  }, m = () => {
    const {
      video: { element: n, fps: r },
      range: { end: i }
    } = o;
    if (e.value) {
      const _ = D(n.currentTime, r) + 1;
      D(i, r) === _ ? d(i) : d(ae(_, r));
    } else
      d(n.currentTime + 1);
  }, w = () => {
    const {
      video: { element: n, fps: r },
      range: { start: i }
    } = o;
    if (e.value) {
      const _ = D(n.currentTime, r) - 1;
      D(i, r) === _ ? d(i) : d(ae(_, r));
    } else
      d(n.currentTime - 1);
  };
  let T;
  const H = (n) => {
    const {
      container: { mouseDown: r }
    } = o;
    r ? T = setInterval(() => {
      n ? m() : w();
    }, 60) : clearInterval(T);
  }, j = (n) => {
    const {
      video: { element: r }
    } = o;
    r.playbackRate = o.video.playbackRate = n, C(`Playback Rate x${n.toFixed(1)}`);
  }, c = (n) => {
    const {
      video: { element: r, duration: i },
      progress: { seekTotal: _ },
      range: { start: y, end: E }
    } = o;
    o.range.enabled !== n && (o.range.enabled = n, C(n ? "Active range" : "Inactive range")), n ? (r.currentTime = y, o.range.left = 0, o.range.width = _, o.progress.seekWidth = 0) : (r.currentTime = 0, o.range.left = Math.floor(y / i * _), o.range.width = Math.ceil(E / i * _ - y / i * _) || 1);
  }, R = () => {
    const {
      video: { element: n, loop: r }
    } = o;
    n.loop = o.video.loop = !r, C(r ? "Play once" : "Repeat play");
  }, h = () => {
    const {
      bbox: { enabled: n }
    } = o;
    o.bbox.enabled = !n, C(n ? "Hide bounding box" : "Show bounding box");
  };
  let J;
  const C = (n) => {
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
      video: { element: _, paused: y, volume: E, fps: B }
    } = o;
    if (n && r) {
      if (i === "g" && e.value) {
        const S = window.prompt("Go to frame number", D(_.currentTime, B));
        y && _.pause(), _.currentTime = ae(S, B);
      }
      i === "ArrowUp" && M(E + 0.05), i === "ArrowDown" && M(E - 0.05), i === "ArrowLeft" && w(), i === "ArrowRight" && m();
    }
  }, le = () => {
    o.container.fullScreen = Boolean(document.fullscreenElement), C(`${o.container.fullScreen ? "Full" : "Normal"} screen`);
  }, he = () => {
    const {
      container: { element: n },
      range: { enabled: r },
      preview: { enabled: i }
    } = o;
    o.progress.seekTotal = n.offsetWidth, l.value && r && c(!0), i && (o.preview.left = 0);
  };
  let te;
  const _e = () => {
    te && clearTimeout(te), o.container.mouseMove = !0, !o.container.mouseHold && (te = setTimeout(() => {
      o.container.mouseMove = !1;
    }, 2e3));
  };
  return ue(() => {
    Z || (window.addEventListener("keydown", re), document.addEventListener("fullscreenchange", le), setTimeout(() => {
      o.container.resizeObserver = new ResizeObserver(he), o.container.resizeObserver.observe(o.container.element);
    }, 300), Z = !0);
  }), $e(() => {
    !Z || (o.container.resizeObserver.unobserve(o.container.element), window.removeEventListener("keydown", re), document.removeEventListener("fullscreenchange", le), Z = !1);
  }), {
    data: o,
    initialVideo: s,
    setVideoSeek: b,
    toggleVideoPlay: x,
    toggleVideoMute: f,
    changeVideoVolume: $,
    changeVideoFrame: H,
    setVideoPlaybackRate: j,
    setVideoRange: c,
    toggleVideoLoop: R,
    toggleVideoBbox: h,
    toggleFullScreen: se,
    setMessage: C,
    handleContainerMouseMove: _e
  };
}
const L = (l, e) => {
  const v = l.__vccOpts || l;
  for (const [s, d] of e)
    v[s] = d;
  return v;
}, ee = (l) => (pe("data-v-f43b31fa"), l = l(), fe(), l), Fe = { class: "cvp-header" }, Ce = ["data-active"], Be = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), De = { key: 0 }, He = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = ["data-active"], Pe = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = { key: 0 }, We = /* @__PURE__ */ ee(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = {
  __name: "Header",
  setup(l) {
    const { data: e } = I(), v = g(() => e.range.start > 0 && e.range.end > 0), s = g(() => e.video.fps > 0), d = g(() => U(e.video.src && e.video.currentTime || 0)), b = g(() => U(e.video.src && e.video.duration || 0)), V = g(() => U(e.video.src && e.range.end || 0)), x = g(() => X(D(e.video.src && e.video.currentTime || 0, e.video.fps))), M = g(() => X(D(e.video.src && e.video.duration || 0, e.video.fps))), $ = g(() => X(D(e.video.src && e.range.end || 0, e.video.fps)));
    return (f, m) => (u(), p("div", Fe, [
      a("div", {
        class: "cvp-information",
        "data-active": !t(e).range.enabled
      }, [
        a("span", null, F(t(d)), 1),
        Be,
        a("span", null, F(t(b)), 1),
        t(s) ? (u(), p("span", De, [
          a("span", null, " [ " + F(t(x)), 1),
          He,
          a("span", null, F(t(M)) + " ]", 1)
        ])) : P("", !0)
      ], 8, Ce),
      t(v) ? (u(), p("div", {
        key: 0,
        class: "cvp-information",
        "data-active": t(e).range.enabled
      }, [
        a("span", null, F(t(d)), 1),
        Pe,
        a("span", null, F(t(V)), 1),
        t(s) ? (u(), p("span", Re, [
          a("span", null, " [ " + F(t(x)), 1),
          We,
          a("span", null, F(t($)) + " ]", 1)
        ])) : P("", !0)
      ], 8, ze)) : P("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ L(Ie, [["__scopeId", "data-v-f43b31fa"]]);
const Oe = { class: "cvp-main" }, Ne = ["src", "muted", "autoplay"], je = {
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
  setup(l, { emit: e }) {
    const v = l, s = G(null), d = G(null), { data: b, initialVideo: V, toggleVideoPlay: x } = I(), M = ($) => {
      Object.assign(b, {
        video: {
          ...b.video,
          element: s.value,
          canvas: d.value,
          width: s.value.videoWidth,
          height: s.value.videoHeight,
          duration: s.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), V(), e("loadedmetadata", $);
    };
    return ($, f) => (u(), p("div", Oe, [
      a("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: s,
        src: l.src,
        muted: l.muted,
        autoplay: l.autoplay,
        onLoadedmetadata: f[0] || (f[0] = (m) => M(m)),
        onPlay: f[1] || (f[1] = (m) => e("play", m)),
        onPause: f[2] || (f[2] = (m) => e("pause", m)),
        onTimeupdate: f[3] || (f[3] = (m) => e("timeupdate", m)),
        onVolumechange: f[4] || (f[4] = (m) => e("volumechange", m)),
        onError: f[5] || (f[5] = (m) => e("error", m))
      }, null, 40, Ne),
      a("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: d,
        onClick: f[6] || (f[6] = (...m) => t(x) && t(x)(...m))
      }, null, 512)
    ]));
  }
}, Ae = /* @__PURE__ */ L(je, [["__scopeId", "data-v-352dd94f"]]);
const qe = { class: "cvp-progress" }, Ue = { class: "cvp-progress-drag" }, Ge = ["src"], Ke = { class: "cvp-progress-preview-time" }, Je = {
  __name: "Progress",
  setup(l) {
    const e = G(null), v = G(null), { data: s, setVideoSeek: d } = I(), b = g(() => s.range.start > 0 && s.range.end > 0), V = g(() => `${s.video.src && s.progress.bufferWidth || 0}%`), x = g(() => `${s.video.src && s.progress.seekWidth || 0}%`), M = g(() => `${s.video.src && s.range.left || 0}px`), $ = g(() => `${s.video.src && s.range.width || 0}px`), f = () => {
      setTimeout(() => {
        const {
          video: { width: m, height: w },
          preview: { enabled: T }
        } = s;
        if (!T)
          return;
        const H = v.value.getContext("2d"), j = m * 0.3, c = w * 0.3;
        v.value.width = j, v.value.height = c, Object.assign(s, {
          preview: {
            ...s.preview,
            element: e.value
          }
        });
        const R = () => {
          !e.value || (H.imageSmoothingEnabled = !0, H.drawImage(e.value, 0, 0, j, c), window.requestAnimationFrame(R));
        };
        R();
      }, 100);
    };
    return (m, w) => (u(), p("div", qe, [
      a("div", Ue, [
        a("div", {
          class: "cvp-progress-area",
          onMousedown: w[0] || (w[0] = me((T) => {
            t(s).container.mouseDown = !0, t(d)(T);
          }, ["self"])),
          onMousemove: w[1] || (w[1] = (...T) => t(d) && t(d)(...T)),
          onMouseup: w[2] || (w[2] = (T) => t(s).container.mouseDown = !1),
          onMouseleave: w[3] || (w[3] = (T) => t(s).container.mouseDown = !1)
        }, [
          a("div", {
            class: "cvp-progress-buffer",
            style: q({ width: t(V) })
          }, null, 4),
          a("div", {
            class: "cvp-progress-bar",
            style: q({ width: t(x) })
          }, null, 4),
          t(b) ? (u(), p("div", {
            key: 0,
            class: "cvp-progress-range",
            style: q({ left: t(M), width: t($) })
          }, null, 4)) : P("", !0)
        ], 32)
      ]),
      t(s).preview.enabled ? (u(), p("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: q({ left: `${t(s).preview.left}px` })
      }, [
        a("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: e,
          src: t(s).video.src,
          onLoadeddata: f
        }, null, 40, Ge),
        a("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        a("div", Ke, F(t(s).preview.time), 1)
      ], 4)) : P("", !0)
    ]));
  }
}, Qe = /* @__PURE__ */ L(Je, [["__scopeId", "data-v-c1f46be8"]]);
const k = (l) => (pe("data-v-f2163948"), l = l(), fe(), l), Ye = { class: "cvp-controller" }, Ze = ["title"], Xe = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, et = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), tt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M7 4v16l13 -8z" }, null, -1)), ot = [
  et,
  tt
], nt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, at = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), st = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), rt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), lt = [
  at,
  st,
  rt
], it = { class: "cvp-controller-volume" }, dt = ["title"], ct = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, vt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ut = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), pt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), ft = [
  vt,
  ut,
  pt
], mt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ht = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), _t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), gt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), bt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), yt = [
  ht,
  _t,
  gt,
  bt
], wt = { class: "cvp-controller-volume-drag" }, kt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), xt = [
  kt
], Mt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), $t = [
  Mt
], Tt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("div", { style: { flex: "1" } }, null, -1)), Et = { class: "cvp-controller-playback-rate" }, Vt = {
  class: "cvp-controller-playback-rate-text",
  title: "Playback rate"
}, St = { class: "cvp-controller-playback-rate-list" }, Ft = { class: "cvp-controller-playback-rate-item" }, Ct = ["onClick"], Bt = ["data-active", "title"], Dt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ht = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M9 6v-3h6v3" data-v-f2163948></path><path d="M9 18v3h6v-3" data-v-f2163948></path>', 5), zt = [
  Ht
], Pt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Rt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M3 6v-3h18v3" data-v-f2163948></path><path d="M3 18v3h18v-3" data-v-f2163948></path>', 5), Wt = [
  Rt
], It = ["data-active", "title"], Lt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
  Lt
], Nt = ["data-active", "title"], jt = /* @__PURE__ */ K('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-f2163948><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><circle cx="5" cy="5" r="2" data-v-f2163948></circle><circle cx="19" cy="5" r="2" data-v-f2163948></circle><circle cx="5" cy="19" r="2" data-v-f2163948></circle><circle cx="19" cy="19" r="2" data-v-f2163948></circle><line x1="5" y1="7" x2="5" y2="17" data-v-f2163948></line><line x1="7" y1="5" x2="17" y2="5" data-v-f2163948></line><line x1="7" y1="19" x2="17" y2="19" data-v-f2163948></line><line x1="19" y1="7" x2="19" y2="17" data-v-f2163948></line></svg>', 1), At = [
  jt
], qt = ["title"], Ut = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Gt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), Kt = [
  Gt
], Jt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Qt = /* @__PURE__ */ K('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), Yt = [
  Qt
], Zt = {
  __name: "Controller",
  setup(l) {
    const {
      data: e,
      toggleVideoPlay: v,
      toggleVideoMute: s,
      changeVideoVolume: d,
      changeVideoFrame: b,
      setVideoPlaybackRate: V,
      setVideoRange: x,
      toggleVideoLoop: M,
      toggleVideoBbox: $,
      toggleFullScreen: f
    } = I(), m = g(() => e.range.start > 0 && e.range.end > 0), w = g(() => e.video.fps > 0), T = g(() => Object.keys(e.bbox.data).length > 0), H = () => {
      x(!e.range.enabled);
    };
    return (j, c) => {
      var R;
      return u(), p("div", Ye, [
        a("button", {
          class: "cvp-controller-button",
          title: t(e).video.paused ? "Play" : "Pause",
          onClick: c[0] || (c[0] = (...h) => t(v) && t(v)(...h))
        }, [
          t(e).video.paused ? (u(), p("svg", Xe, ot)) : (u(), p("svg", nt, lt))
        ], 8, Ze),
        a("div", it, [
          a("button", {
            class: "cvp-controller-button",
            title: t(e).video.muted ? "Unmute" : "Mute",
            onClick: c[1] || (c[1] = (...h) => t(s) && t(s)(...h))
          }, [
            t(e).video.muted ? (u(), p("svg", ct, ft)) : (u(), p("svg", mt, yt))
          ], 8, dt),
          a("div", wt, [
            a("div", {
              class: "cvp-controller-volume-area",
              onMousedown: c[2] || (c[2] = me((h) => {
                t(e).container.mouseDown = !0, t(d)(h);
              }, ["self"])),
              onMousemove: c[3] || (c[3] = (...h) => t(d) && t(d)(...h)),
              onMouseup: c[4] || (c[4] = (h) => t(e).container.mouseDown = !1),
              onMouseleave: c[5] || (c[5] = (h) => t(e).container.mouseDown = !1)
            }, [
              a("div", {
                class: "cvp-controller-volume-bar",
                style: q({ height: `${t(e).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        a("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: c[6] || (c[6] = (h) => {
            t(e).container.mouseDown = !0, t(b)(!1);
          }),
          onMouseup: c[7] || (c[7] = (h) => {
            t(e).container.mouseDown = !1, t(b)(!1);
          })
        }, xt, 32),
        a("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: c[8] || (c[8] = (h) => {
            t(e).container.mouseDown = !0, t(b)(!0);
          }),
          onMouseup: c[9] || (c[9] = (h) => {
            t(e).container.mouseDown = !1, t(b)(!0);
          })
        }, $t, 32),
        Tt,
        a("div", Et, [
          a("div", Vt, "x" + F(((R = t(e).video.playbackRate) == null ? void 0 : R.toFixed(1)) || "1.0"), 1),
          a("ul", St, [
            (u(!0), p(Te, null, Ee([0.1, 0.5, 1, 1.5, 2, 5], (h) => (u(), p("li", Ft, [
              a("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (J) => t(V)(h)
              }, F(h.toFixed(1)), 9, Ct)
            ]))), 256))
          ])
        ]),
        t(m) ? (u(), p("button", {
          key: 0,
          class: "cvp-controller-button",
          "data-active": t(e).range.enabled,
          title: t(e).range.enabled ? "Reset range" : "Set range",
          onClick: H
        }, [
          t(e).range.enabled ? (u(), p("svg", Dt, zt)) : (u(), p("svg", Pt, Wt))
        ], 8, Bt)) : P("", !0),
        a("button", {
          class: "cvp-controller-button",
          "data-active": t(e).video.loop,
          title: t(e).video.loop ? "Play once" : "Repeat play",
          onClick: c[10] || (c[10] = (...h) => t(M) && t(M)(...h))
        }, Ot, 8, It),
        t(w) && t(T) ? (u(), p("button", {
          key: 1,
          class: "cvp-controller-button",
          "data-active": t(e).bbox.enabled,
          title: t(e).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: c[11] || (c[11] = (...h) => t($) && t($)(...h))
        }, At, 8, Nt)) : P("", !0),
        a("button", {
          class: "cvp-controller-button",
          title: t(e).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: c[12] || (c[12] = (...h) => t(f) && t(f)(...h))
        }, [
          t(e).container.fullScreen ? (u(), p("svg", Ut, Kt)) : (u(), p("svg", Jt, Yt))
        ], 8, qt)
      ]);
    };
  }
}, Xt = /* @__PURE__ */ L(Zt, [["__scopeId", "data-v-f2163948"]]);
const eo = ["data-active"], to = {
  __name: "index",
  setup(l) {
    const { data: e, handleContainerMouseMove: v } = I();
    return (s, d) => (u(), p("div", {
      class: "cvp-footer",
      "data-active": t(e).container.mouseMove,
      onMouseenter: d[0] || (d[0] = (b) => t(e).container.mouseHold = !0),
      onMouseleave: d[1] || (d[1] = (b) => {
        t(e).container.mouseHold = !1, t(v)();
      })
    }, [
      N(Qe),
      N(Xt)
    ], 40, eo));
  }
}, oo = /* @__PURE__ */ L(to, [["__scopeId", "data-v-33a4d776"]]);
const no = { class: "cvp-message" }, ao = ["data-visible", "innerHTML"], so = {
  __name: "Message",
  setup(l) {
    const { data: e } = I();
    return (v, s) => (u(), p("div", no, [
      a("div", {
        class: "cvp-message-text",
        "data-visible": t(e).message.visible,
        innerHTML: t(e).message.text
      }, null, 8, ao)
    ]));
  }
}, ro = /* @__PURE__ */ L(so, [["__scopeId", "data-v-8fa62035"]]);
const lo = ["data-dark-mode", "data-type"], io = {
  key: 0,
  class: "cvp-block"
}, co = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    range: { type: Array, validator: (l) => !l.length || l.length === 2 && l.every((e) => typeof e == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(l) {
    const e = l, v = G(null), { data: s, setVideoRange: d, handleContainerMouseMove: b } = I();
    return Ve(() => e, ({ src: V, muted: x, loop: M, range: $, fps: f, bbox: m, type: w, messageTime: T, preview: H }) => {
      Object.assign(s.container, { type: w }), Object.assign(s.video, { src: V, muted: x, loop: M, fps: f }), Object.assign(s.preview, { enabled: H }), Object.assign(s.range, { start: $[0], end: $[1] }), Object.assign(s.bbox, { ...m }), Object.assign(s.message, { time: T }), s.range.start && s.range.end && d(!0), Object.keys(s.bbox.data).length && (s.bbox.enabled = !0);
    }, { deep: !0 }), ue(() => {
      Object.assign(s, { container: { ...s.container, element: v.value } }), s.container.type === "overlay" && s.container.element.addEventListener("mousemove", b);
    }), Se(() => {
      s.container.type === "overlay" && s.container.element.removeEventListener("mousemove", b);
    }), (V, x) => (u(), p("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": l.darkMode,
      "data-type": e.type
    }, [
      N(Le),
      N(Ae, {
        src: e.src,
        muted: e.muted,
        autoplay: e.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      N(oo),
      N(ro),
      e.src.length ? P("", !0) : (u(), p("div", io, F(t(s).block.text), 1))
    ], 8, lo));
  }
}, uo = /* @__PURE__ */ L(co, [["__scopeId", "data-v-14f3040e"]]);
export {
  uo as default
};
