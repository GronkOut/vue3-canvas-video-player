import { reactive as $e, computed as F, onMounted as fe, onUnmounted as Ee, openBlock as p, createElementBlock as f, createElementVNode as n, normalizeClass as N, unref as t, toDisplayString as $, createCommentVNode as H, pushScopeId as me, popScopeId as he, ref as U, withModifiers as ge, normalizeStyle as j, Fragment as Ve, renderList as Se, createStaticVNode as G, createVNode as L, watch as pe, onBeforeUnmount as Ce } from "vue";
const W = (r) => {
  const e = parseInt(r), v = Math.floor(e / 3600), a = Math.floor(e % 3600 / 60), i = e % 60;
  return `${v < 10 ? "0" + v : v}:${a < 10 ? "0" + a : a}:${i < 10 ? "0" + i : i}`;
}, C = (r, e) => Math.round(r * e), te = (r, e) => r / e, q = (r) => r === void 0 ? !1 : new Intl.NumberFormat().format(r), s = $e({
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
    text: ""
  }
});
let Q = !1;
function P() {
  const r = F(() => s.range.start > 0 && s.range.end > 0), e = F(() => s.video.fps > 0), v = F(() => Object.keys(s.bbox.data).length > 0), a = () => {
    const {
      video: { element: o, canvas: l, width: c, height: y, duration: _, fps: k },
      range: { start: M, end: O },
      bbox: { data: K, fillColor: ee, borderSize: T, borderColor: we }
    } = s, I = l.getContext("2d");
    l.width = c, l.height = y, o.loop = s.video.loop, r.value && (o.currentTime = M);
    const ie = () => {
      const {
        video: { loop: xe },
        range: { enabled: ke },
        bbox: { enabled: Me }
      } = s;
      I.drawImage(o, 0, 0, c, y);
      let J = s.video.currentTime = o.currentTime;
      if (r.value && ke ? (A(), s.progress.seekWidth = ((J - M) / (O - M) * 100).toFixed(10), s.progress.bufferWidth = 100) : (o.ended && xe && (J = 0), s.progress.seekWidth = (J / _ * 100).toFixed(10), o.buffered.length > 0 && (s.progress.bufferWidth = o.buffered.end(o.buffered.length - 1) / _ * 100)), e.value && v.value && Me) {
        const Te = C(J, k), B = K[Te];
        if (B && B.length === 4) {
          const de = B[0], ce = B[1], ve = B[2] - B[0], ue = B[3] - B[1];
          I.fillStyle = ee, I.fillRect(de, ce, ve, ue), T && (I.lineWidth = T, I.strokeStyle = we, I.strokeRect(de - T / 2, ce - T / 2, ve + T, ue + T));
        }
      }
      o.paused && Math.floor(s.progress.seekWidth) === 100 && (s.video.paused = !0), window.requestAnimationFrame(ie);
    };
    ie();
  }, i = (o) => {
    const {
      video: { element: l, duration: c, fps: y },
      range: { enabled: _, start: k, end: M }
    } = s;
    l.currentTime = r.value && _ ? Math.max(Math.min(o, M), k) : Math.max(Math.min(o, c), 0), V(`Seek ${W(l.currentTime)} ${e.value ? `[${q(C(l.currentTime, y))}]` : ""} (${r.value && _ ? Math.round((l.currentTime - k) / (M - k) * 100) : Math.round(l.currentTime / c * 100)}%)`);
  }, g = ({ offsetX: o }) => {
    const {
      container: { mouseDown: l },
      video: { element: c, duration: y },
      progress: { seekTotal: _ },
      preview: { enabled: k, element: M },
      range: { enabled: O, start: K, end: ee }
    } = s;
    if (!c)
      return;
    const T = O ? o / _ * (ee - K) + K : o / _ * y;
    T === 1 / 0 || isNaN(T) || (l && i(T), M && k && (M.currentTime = T, s.preview.time = W(T), o < 65 ? s.preview.left = 65 : o > _ - 65 ? s.preview.left = _ - 65 : s.preview.left = o));
  };
  let S;
  const E = ({ detail: o }) => {
    if (o === 1) {
      const {
        video: { element: l, paused: c },
        range: { enabled: y, start: _, end: k }
      } = s;
      S = setTimeout(() => {
        c ? (r.value && y && l.currentTime === k && (l.currentTime = _), l.play()) : l.pause(), V(c ? "Play" : "Pause"), s.video.paused = !c;
      }, 250);
    } else
      o === 2 && (clearTimeout(S), ae());
  }, b = (o) => {
    const {
      video: { element: l }
    } = s, c = Math.max(Math.min(o, 1), 0);
    l.volume = s.video.volume = c, V(`Volume ${Math.floor(c * 100)}%`);
  }, x = ({ offsetY: o }) => {
    const {
      container: { mouseDown: l }
    } = s;
    l && b((100 - o) / 100);
  }, m = () => {
    const {
      video: { element: o, muted: l }
    } = s;
    o.muted = s.video.muted = !l, V(l ? "Unmuted" : "Muted");
  }, h = () => {
    const {
      video: { element: o, fps: l }
    } = s;
    e.value ? i(te(C(o.currentTime, l) + 1, l)) : i(o.currentTime + 1);
  }, D = () => {
    const {
      video: { element: o, fps: l }
    } = s;
    e.value ? i(te(C(o.currentTime, l) - 1, l)) : i(o.currentTime - 1);
  };
  let z;
  const oe = (o) => {
    const {
      container: { mouseDown: l }
    } = s;
    l ? z = setInterval(() => {
      o ? h() : D();
    }, 60) : clearInterval(z);
  }, d = (o) => {
    const {
      video: { element: l }
    } = s;
    l.playbackRate = s.video.playbackRate = o, V(`Playback Rate x${o.toFixed(1)}`);
  }, A = () => {
    const {
      video: { element: o, loop: l },
      range: { enabled: c, start: y, end: _ }
    } = s;
    !o || !(r.value && c) || (o.currentTime < y && (o.currentTime = y), o.currentTime > _ && (l ? o.currentTime = y : (o.currentTime = _, o.pause(), s.video.paused = !0)));
  }, u = () => {
    const {
      video: { element: o, duration: l },
      progress: { seekTotal: c },
      range: { enabled: y, start: _, end: k }
    } = s;
    !o || (A(), s.range.left = r.value && y ? 0 : _ / l * c, s.range.width = r.value && y ? c : k / l * c - _ / l * c);
  }, ne = () => {
    const {
      range: { enabled: o }
    } = s;
    s.range.enabled = !o, u(), V(o ? "Inactive range" : "Active range");
  }, _e = () => {
    const {
      video: { element: o, loop: l }
    } = s;
    o.loop = s.video.loop = !l, V(l ? "Play once" : "Repeat play");
  }, be = () => {
    const {
      bbox: { enabled: o }
    } = s;
    s.bbox.enabled = !o, V(o ? "Hide bounding box" : "Show bounding box");
  };
  let Z;
  const V = (o) => {
    const { message: l } = s, { time: c } = l;
    !c || (l.text = o, l.visible = !0, Z && clearTimeout(Z), Z = setTimeout(() => {
      l.visible = !1;
    }, c));
  }, ae = () => {
    const {
      container: { element: o }
    } = s;
    document.fullscreenElement ? document.exitFullscreen() : o.requestFullscreen();
  }, se = () => {
    const {
      container: { element: o },
      preview: { enabled: l }
    } = s;
    s.progress.seekTotal = o.offsetWidth, r.value && u(), l && (s.preview.left = 0);
  }, le = ({ altKey: o, ctrlKey: l, key: c }) => {
    const {
      video: { element: y, paused: _, volume: k, fps: M }
    } = s;
    if (o && l) {
      if (c === "g" && e.value) {
        const O = window.prompt("Go to frame number", C(y.currentTime, M));
        _ && y.pause(), y.currentTime = te(O, M);
      }
      c === "ArrowUp" && b(k + 0.05), c === "ArrowDown" && b(k - 0.05), c === "ArrowLeft" && D(), c === "ArrowRight" && h();
    }
  }, re = () => {
    s.container.fullScreen = Boolean(document.fullscreenElement), V(`${s.container.fullScreen ? "Full" : "Normal"} screen`);
  };
  let X;
  const ye = () => {
    X && clearTimeout(X), s.container.mouseMove = !0, !s.container.mouseHold && (X = setTimeout(() => {
      s.container.mouseMove = !1;
    }, 2e3));
  };
  return fe(() => {
    Q || (window.addEventListener("resize", se), window.addEventListener("keydown", le), document.addEventListener("fullscreenchange", re), setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300), Q = !0);
  }), Ee(() => {
    !Q || (window.removeEventListener("resize", se), window.removeEventListener("keydown", le), document.removeEventListener("fullscreenchange", re), Q = !1);
  }), {
    data: s,
    initialVideo: a,
    setVideoSeek: g,
    toggleVideoPlay: E,
    toggleVideoMute: m,
    changeVideoVolume: x,
    changeVideoFrame: oe,
    setVideoPlaybackRate: d,
    toggleVideoRange: ne,
    toggleVideoLoop: _e,
    toggleVideoBbox: be,
    toggleFullScreen: ae,
    setMessage: V,
    onContainerMouseMove: ye
  };
}
const R = (r, e) => {
  const v = r.__vccOpts || r;
  for (const [a, i] of e)
    v[a] = i;
  return v;
}, Y = (r) => (me("data-v-05360fd3"), r = r(), he(), r), Fe = { class: "cvp-header" }, Be = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), He = { key: 0 }, De = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Pe = { key: 0 }, Re = /* @__PURE__ */ Y(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = {
  __name: "Header",
  setup(r) {
    const { data: e } = P(), v = F(() => e.range.start > 0 && e.range.end > 0), a = F(() => e.video.fps > 0);
    return (i, g) => (p(), f("div", Fe, [
      n("div", {
        class: N(["cvp-information", !t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, $(t(W)(t(e).video.currentTime)), 1),
        Be,
        n("span", null, $(t(W)(t(e).video.duration)), 1),
        t(a) ? (p(), f("span", He, [
          n("span", null, " [ " + $(t(q)(t(C)(t(e).video.currentTime, t(e).video.fps))), 1),
          De,
          n("span", null, $(t(q)(t(C)(t(e).video.duration, t(e).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2),
      t(v) ? (p(), f("div", {
        key: 0,
        class: N(["cvp-information", t(e).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, $(t(W)(t(e).video.currentTime)), 1),
        ze,
        n("span", null, $(t(W)(t(e).range.end)), 1),
        t(a) ? (p(), f("span", Pe, [
          n("span", null, " [ " + $(t(q)(t(C)(t(e).video.currentTime, t(e).video.fps))), 1),
          Re,
          n("span", null, $(t(q)(t(C)(t(e).range.end, t(e).video.fps))) + " ]", 1)
        ])) : H("", !0)
      ], 2)) : H("", !0)
    ]));
  }
}, Le = /* @__PURE__ */ R(Ie, [["__scopeId", "data-v-05360fd3"]]);
const We = { class: "cvp-main" }, Ne = ["src", "muted", "autoplay"], Ae = {
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
    const v = r, a = U(null), i = U(null), { data: g, initialVideo: S, toggleVideoPlay: E } = P(), b = (x) => {
      Object.assign(g, {
        video: {
          ...g.video,
          element: a.value,
          canvas: i.value,
          width: a.value.videoWidth,
          height: a.value.videoHeight,
          duration: a.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), S(), e("loadedmetadata", x);
    };
    return (x, m) => (p(), f("div", We, [
      n("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: a,
        src: r.src,
        muted: r.muted,
        autoplay: r.autoplay,
        onLoadedmetadata: m[0] || (m[0] = (h) => b(h)),
        onPlay: m[1] || (m[1] = (h) => e("play", h)),
        onPause: m[2] || (m[2] = (h) => e("pause", h)),
        onTimeupdate: m[3] || (m[3] = (h) => e("timeupdate", h)),
        onVolumechange: m[4] || (m[4] = (h) => e("volumechange", h)),
        onError: m[5] || (m[5] = (h) => e("error", h))
      }, null, 40, Ne),
      n("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: i,
        onClick: m[6] || (m[6] = (...h) => t(E) && t(E)(...h))
      }, null, 512)
    ]));
  }
}, Oe = /* @__PURE__ */ R(Ae, [["__scopeId", "data-v-c9a7d0c6"]]);
const je = { class: "cvp-progress" }, qe = { class: "cvp-progress-drag" }, Ue = ["src"], Ge = { class: "cvp-progress-preview-time" }, Ke = {
  __name: "Progress",
  setup(r) {
    const e = U(null), v = U(null), { data: a, setVideoSeek: i } = P(), g = F(() => a.range.start > 0 && a.range.end > 0), S = () => {
      const {
        video: { width: E, height: b },
        preview: { enabled: x }
      } = a;
      if (!x)
        return;
      const m = v.value.getContext("2d"), h = E * 0.3, D = b * 0.3;
      v.value.width = h, v.value.height = D, Object.assign(a, {
        preview: {
          ...a.preview,
          element: e.value
        }
      });
      const z = () => {
        !e.value || (m.imageSmoothingEnabled = !0, m.drawImage(e.value, 0, 0, h, D), window.requestAnimationFrame(z));
      };
      z();
    };
    return (E, b) => (p(), f("div", je, [
      n("div", qe, [
        n("div", {
          class: "cvp-progress-area",
          onMousedown: b[0] || (b[0] = ge((x) => {
            t(a).container.mouseDown = !0, t(i)(x);
          }, ["self"])),
          onMousemove: b[1] || (b[1] = (...x) => t(i) && t(i)(...x)),
          onMouseup: b[2] || (b[2] = (x) => t(a).container.mouseDown = !1),
          onMouseleave: b[3] || (b[3] = (x) => t(a).container.mouseDown = !1)
        }, [
          n("div", {
            class: "cvp-progress-buffer",
            style: j({ width: `${t(a).progress.bufferWidth}%` })
          }, null, 4),
          n("div", {
            class: "cvp-progress-bar",
            style: j({ width: `${t(a).progress.seekWidth}%` })
          }, null, 4),
          t(g) ? (p(), f("div", {
            key: 0,
            class: "cvp-progress-range",
            style: j({ left: `${t(a).range.left}px`, width: `${t(a).range.width}px` })
          }, null, 4)) : H("", !0)
        ], 32)
      ]),
      t(a).preview.enabled ? (p(), f("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: j({ left: `${t(a).preview.left}px` })
      }, [
        n("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: e,
          src: t(a).video.src,
          onCanplaythrough: S
        }, null, 40, Ue),
        n("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        n("div", Ge, $(t(a).preview.time), 1)
      ], 4)) : H("", !0)
    ]));
  }
}, Je = /* @__PURE__ */ R(Ke, [["__scopeId", "data-v-2f28077b"]]);
const w = (r) => (me("data-v-09e1eca1"), r = r(), he(), r), Qe = { class: "cvp-controller" }, Ye = ["title"], Ze = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Xe = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), et = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M7 4v16l13 -8z" }, null, -1)), tt = [
  Xe,
  et
], ot = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, nt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), at = /* @__PURE__ */ w(() => /* @__PURE__ */ n("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), st = /* @__PURE__ */ w(() => /* @__PURE__ */ n("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), lt = [
  nt,
  at,
  st
], rt = { class: "cvp-controller-volume" }, it = ["title"], dt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ct = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), vt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), ut = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), pt = [
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
}, mt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ht = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), gt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), _t = /* @__PURE__ */ w(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), bt = [
  mt,
  ht,
  gt,
  _t
], yt = { class: "cvp-controller-volume-drag" }, wt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("svg", {
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
], -1)), xt = [
  wt
], kt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("svg", {
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
], -1)), Mt = [
  kt
], Tt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), $t = { class: "cvp-controller-playback-rate" }, Et = { class: "cvp-controller-playback-rate-text" }, Vt = { class: "cvp-controller-playback-rate-list" }, St = { class: "cvp-controller-playback-rate-item" }, Ct = ["onClick"], Ft = ["title"], Bt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ht = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M9 6v-3h6v3" data-v-09e1eca1></path><path d="M9 18v3h6v-3" data-v-09e1eca1></path>', 5), Dt = [
  Ht
], zt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Pt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M3 6v-3h18v3" data-v-09e1eca1></path><path d="M3 18v3h18v-3" data-v-09e1eca1></path>', 5), Rt = [
  Pt
], It = ["title"], Lt = /* @__PURE__ */ w(() => /* @__PURE__ */ n("svg", {
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
], -1)), Wt = [
  Lt
], Nt = ["title"], At = /* @__PURE__ */ G('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-09e1eca1><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><circle cx="5" cy="5" r="2" data-v-09e1eca1></circle><circle cx="19" cy="5" r="2" data-v-09e1eca1></circle><circle cx="5" cy="19" r="2" data-v-09e1eca1></circle><circle cx="19" cy="19" r="2" data-v-09e1eca1></circle><line x1="5" y1="7" x2="5" y2="17" data-v-09e1eca1></line><line x1="7" y1="5" x2="17" y2="5" data-v-09e1eca1></line><line x1="7" y1="19" x2="17" y2="19" data-v-09e1eca1></line><line x1="19" y1="7" x2="19" y2="17" data-v-09e1eca1></line></svg>', 1), Ot = [
  At
], jt = ["title"], qt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ut = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>', 5), Gt = [
  Ut
], Kt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Jt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>', 5), Qt = [
  Jt
], Yt = {
  __name: "Controller",
  setup(r) {
    const {
      data: e,
      toggleVideoPlay: v,
      toggleVideoMute: a,
      changeVideoVolume: i,
      changeVideoFrame: g,
      setVideoPlaybackRate: S,
      toggleVideoRange: E,
      toggleVideoLoop: b,
      toggleVideoBbox: x,
      toggleFullScreen: m
    } = P(), h = F(() => e.range.start > 0 && e.range.end > 0), D = F(() => e.video.fps > 0), z = F(() => Object.keys(e.bbox.data).length > 0);
    return (oe, d) => {
      var A;
      return p(), f("div", Qe, [
        n("button", {
          class: "cvp-controller-button",
          title: t(e).video.paused ? "Play" : "Pause",
          onClick: d[0] || (d[0] = (...u) => t(v) && t(v)(...u))
        }, [
          t(e).video.paused ? (p(), f("svg", Ze, tt)) : (p(), f("svg", ot, lt))
        ], 8, Ye),
        n("div", rt, [
          n("button", {
            class: "cvp-controller-button",
            title: t(e).video.muted ? "Unmute" : "Mute",
            onClick: d[1] || (d[1] = (...u) => t(a) && t(a)(...u))
          }, [
            t(e).video.muted ? (p(), f("svg", dt, pt)) : (p(), f("svg", ft, bt))
          ], 8, it),
          n("div", yt, [
            n("div", {
              class: "cvp-controller-volume-area",
              onMousedown: d[2] || (d[2] = ge((u) => {
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
            t(e).container.mouseDown = !0, t(g)(!1);
          }),
          onMouseup: d[7] || (d[7] = (u) => {
            t(e).container.mouseDown = !1, t(g)(!1);
          })
        }, xt, 32),
        n("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: d[8] || (d[8] = (u) => {
            t(e).container.mouseDown = !0, t(g)(!0);
          }),
          onMouseup: d[9] || (d[9] = (u) => {
            t(e).container.mouseDown = !1, t(g)(!0);
          })
        }, Mt, 32),
        Tt,
        n("div", $t, [
          n("div", Et, "x" + $(((A = t(e).video.playbackRate) == null ? void 0 : A.toFixed(1)) || "1.0"), 1),
          n("ul", Vt, [
            (p(!0), f(Ve, null, Se([0.1, 0.5, 1, 1.5, 2, 5], (u) => (p(), f("li", St, [
              n("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (ne) => t(S)(u)
              }, $(u.toFixed(1)), 9, Ct)
            ]))), 256))
          ])
        ]),
        t(h) ? (p(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          title: t(e).range.enabled ? "Reset range" : "Set range",
          onClick: d[10] || (d[10] = (...u) => t(E) && t(E)(...u))
        }, [
          t(e).range.enabled ? (p(), f("svg", Bt, Dt)) : (p(), f("svg", zt, Rt))
        ], 8, Ft)) : H("", !0),
        n("button", {
          class: N(["cvp-controller-button", t(e).video.loop && "cvp-controller-button-active"]),
          title: t(e).video.loop ? "Play once" : "Repeat play",
          onClick: d[11] || (d[11] = (...u) => t(b) && t(b)(...u))
        }, Wt, 10, It),
        t(D) && t(z) ? (p(), f("button", {
          key: 1,
          class: N(["cvp-controller-button", t(e).bbox.enabled && "cvp-controller-button-active"]),
          title: t(e).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: d[12] || (d[12] = (...u) => t(x) && t(x)(...u))
        }, Ot, 10, Nt)) : H("", !0),
        n("button", {
          class: "cvp-controller-button",
          title: t(e).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: d[13] || (d[13] = (...u) => t(m) && t(m)(...u))
        }, [
          t(e).container.fullScreen ? (p(), f("svg", qt, Gt)) : (p(), f("svg", Kt, Qt))
        ], 8, jt)
      ]);
    };
  }
}, Zt = /* @__PURE__ */ R(Yt, [["__scopeId", "data-v-09e1eca1"]]);
const Xt = {
  __name: "index",
  setup(r) {
    const { data: e, onContainerMouseMove: v } = P();
    return (a, i) => (p(), f("div", {
      class: N(["cvp-footer", t(e).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: i[0] || (i[0] = (g) => t(e).container.mouseHold = !0),
      onMouseleave: i[1] || (i[1] = (g) => {
        t(e).container.mouseHold = !1, t(v)();
      })
    }, [
      L(Je),
      L(Zt)
    ], 34));
  }
}, eo = /* @__PURE__ */ R(Xt, [["__scopeId", "data-v-52798f3a"]]);
const to = { class: "cvp-message" }, oo = ["innerHTML"], no = {
  __name: "Message",
  setup(r) {
    const { data: e } = P();
    return (v, a) => (p(), f("div", to, [
      n("div", {
        class: N(["cvp-message-text", t(e).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: t(e).message.text
      }, null, 10, oo)
    ]));
  }
}, ao = /* @__PURE__ */ R(no, [["__scopeId", "data-v-1ecb3b3a"]]);
const so = ["data-dark-mode", "data-type"], lo = {
  key: 0,
  class: "cvp-block"
}, ro = {
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
    const e = r, v = U(null), { data: a, onContainerMouseMove: i } = P();
    return pe(() => e.src, (g) => {
      a.video.src = g;
    }), pe(() => e.range, (g) => {
      a.range.start = g[0], a.range.end = g[1];
    }), fe(() => {
      Object.assign(a, {
        container: {
          ...a.container,
          element: v.value,
          type: e.type
        },
        video: {
          ...a.video,
          src: e.src,
          muted: e.muted,
          autoplay: e.autoplay,
          loop: e.loop,
          fps: e.fps
        },
        preview: {
          ...a.preview,
          enabled: e.preview
        },
        range: {
          ...a.range,
          start: e.range[0],
          end: e.range[1],
          enabled: e.range[0] > 0 && e.range[1] > 0
        },
        bbox: {
          ...a.bbox,
          ...e.bbox,
          enabled: Object.keys(e.bbox.data).length > 0
        },
        message: {
          ...a.message,
          time: e.messageTime
        },
        block: {
          ...a.block,
          text: "Video file has not been loaded"
        }
      }), a.container.type === "overlay" && a.container.element.addEventListener("mousemove", i);
    }), Ce(() => {
      a.container.type === "overlay" && a.container.element.removeEventListener("mousemove", i);
    }), (g, S) => (p(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": r.darkMode,
      "data-type": e.type
    }, [
      L(Le),
      L(Oe, {
        src: e.src,
        muted: e.muted,
        autoplay: e.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      L(eo),
      L(ao),
      e.src.length ? H("", !0) : (p(), f("div", lo, $(t(a).block.text), 1))
    ], 8, so));
  }
}, co = /* @__PURE__ */ R(ro, [["__scopeId", "data-v-e7689913"]]);
export {
  co as default
};
