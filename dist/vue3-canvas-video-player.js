import { reactive as xe, computed as S, onMounted as ue, onUnmounted as Me, openBlock as p, createElementBlock as f, createElementVNode as n, normalizeClass as q, unref as e, toDisplayString as x, createCommentVNode as D, pushScopeId as pe, popScopeId as fe, ref as U, withModifiers as me, normalizeStyle as O, Fragment as $e, renderList as Te, createStaticVNode as G, createVNode as N, onBeforeUnmount as Ee } from "vue";
const W = (i) => {
  const t = parseInt(i), d = Math.floor(t / 3600), l = Math.floor(t % 3600 / 60), r = t % 60;
  return `${d < 10 ? "0" + d : d}:${l < 10 ? "0" + l : l}:${r < 10 ? "0" + r : r}`;
}, E = (i, t) => Math.round(i * t), oe = (i, t) => i / t, j = (i) => i === void 0 ? !1 : new Intl.NumberFormat().format(i), a = xe({
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
    playbackRate: 1,
    paused: !0,
    fps: 0
  },
  seek: {
    width: 0,
    total: 0,
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
let J = !1;
function H() {
  const i = S(() => a.range.start > 0 && a.range.end > 0), t = S(() => a.video.fps > 0), d = S(() => Object.keys(a.bbox.data).length > 0), l = () => {
    const {
      video: { element: o, canvas: s, width: c, height: m, duration: y, fps: w },
      range: { start: k, end: I },
      bbox: { data: ee, fillColor: A, borderSize: P, borderColor: be }
    } = a, L = s.getContext("2d");
    s.width = c, s.height = m, i.value && (o.currentTime = k);
    const ie = () => {
      const {
        range: { enabled: ye },
        bbox: { enabled: we }
      } = a;
      L.drawImage(o, 0, 0, c, m);
      const te = a.video.currentTime = o.currentTime;
      if (u(), i.value && ye ? a.seek.width = ((te - k) / (I - k) * 100).toFixed(10) : (a.seek.width = (te / y * 100).toFixed(10), o.buffered.length > 0 && (a.seek.bufferWidth = o.buffered.end(o.buffered.length - 1) / y * 100)), t.value && d.value && we) {
        const ke = E(te, w), C = ee[ke];
        if (C && C.length === 4) {
          const re = C[0], de = C[1], ce = C[2] - C[0], ve = C[3] - C[1];
          L.fillStyle = A, L.fillRect(re, de, ce, ve), P && (L.lineWidth = P, L.strokeStyle = be, L.strokeRect(re - P / 2, de - P / 2, ce + P, ve + P));
        }
      }
      o.paused && Math.floor(a.seek.width) === 100 && (a.video.paused = !0), window.requestAnimationFrame(ie);
    };
    ie(), window.dispatchEvent(new Event("resize"));
  }, r = (o) => {
    const {
      video: { element: s, duration: c, fps: m },
      range: { enabled: y, start: w, end: k }
    } = a;
    s.currentTime = i.value && y ? Math.max(Math.min(o, k), w) : Math.max(Math.min(o, c), 0), T(`Seek ${W(s.currentTime)} ${t.value ? `[${j(E(s.currentTime, m))}]` : ""} (${i.value && y ? Math.round((s.currentTime - w) / (k - w) * 100) : Math.round(s.currentTime / c * 100)}%)`);
  }, b = ({ offsetX: o }) => {
    const {
      container: { mouseDown: s },
      video: { duration: c },
      seek: { total: m },
      preview: { enabled: y, element: w },
      range: { enabled: k, start: I, end: ee }
    } = a, A = k ? o / m * (ee - I) + I : o / m * c;
    s && r(A), y && (w.currentTime = A, a.preview.time = W(A), o < 65 ? a.preview.left = 65 : o > m - 65 ? a.preview.left = m - 65 : a.preview.left = o);
  };
  let M;
  const $ = ({ detail: o }) => {
    if (o === 1) {
      const {
        video: { element: s, paused: c },
        range: { enabled: m, start: y, end: w }
      } = a;
      M = setTimeout(() => {
        c ? (i.value && m && s.currentTime === w && (s.currentTime = y), s.play()) : s.pause(), T(c ? "Play" : "Pause"), a.video.paused = !c;
      }, 250);
    } else
      o === 2 && (clearTimeout(M), ne());
  }, h = (o) => {
    const {
      video: { element: s }
    } = a, c = Math.max(Math.min(o, 1), 0);
    s.volume = a.video.volume = c, T(`Volume ${Math.floor(c * 100)}%`);
  }, _ = ({ offsetY: o }) => {
    const {
      container: { mouseDown: s }
    } = a;
    s && h((100 - o) / 100);
  }, V = () => {
    const {
      video: { element: o, muted: s }
    } = a;
    o.muted = a.video.muted = !s, T(s ? "Unmuted" : "Muted");
  }, F = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    t.value ? r(oe(E(o.currentTime, s) + 1, s)) : r(o.currentTime + 1);
  }, B = () => {
    const {
      video: { element: o, fps: s }
    } = a;
    t.value ? r(oe(E(o.currentTime, s) - 1, s)) : r(o.currentTime - 1);
  };
  let R;
  const v = (o) => {
    const {
      container: { mouseDown: s }
    } = a;
    s ? R = setInterval(() => {
      o ? F() : B();
    }, 60) : clearInterval(R);
  }, K = (o) => {
    const {
      video: { element: s }
    } = a;
    s.playbackRate = a.video.playbackRate = o, T(`Playback Rate x${o.toFixed(1)}`);
  }, u = () => {
    const {
      video: { element: o },
      range: { enabled: s, start: c, end: m }
    } = a;
    !(i.value && s) || (o.currentTime < c && (o.currentTime = c), o.currentTime > m && (o.currentTime = m, o.pause(), a.video.paused = !0));
  }, Y = () => {
    const {
      video: { duration: o },
      seek: { total: s },
      range: { enabled: c, start: m, end: y }
    } = a;
    u(), a.range.left = i.value && c ? 0 : m / o * s, a.range.width = i.value && c ? s : y / o * s - m / o * s;
  }, he = () => {
    const {
      range: { enabled: o }
    } = a;
    a.range.enabled = !o, Y(), T(o ? "Inactive range" : "Active range");
  }, _e = () => {
    const {
      bbox: { enabled: o }
    } = a;
    a.bbox.enabled = !o, T(o ? "Hide bounding box" : "Show bounding box");
  };
  let Z;
  const T = (o) => {
    const { message: s } = a, { time: c } = s;
    !c || (s.text = o, s.visible = !0, Z && clearTimeout(Z), Z = setTimeout(() => {
      s.visible = !1;
    }, c));
  }, ne = () => {
    const {
      container: { element: o }
    } = a;
    document.fullscreenElement ? document.exitFullscreen() : o.requestFullscreen();
  }, ae = () => {
    const {
      container: { element: o },
      preview: { enabled: s }
    } = a;
    a.seek.total = o.offsetWidth, i.value && Y(), s && (a.preview.left = 0);
  }, se = ({ altKey: o, ctrlKey: s, key: c }) => {
    const {
      video: { element: m, paused: y, volume: w, fps: k }
    } = a;
    if (o && s) {
      if (c === "g" && t.value) {
        const I = window.prompt("Go to frame number", E(m.currentTime, k));
        y && m.pause(), m.currentTime = oe(I, k);
      }
      c === "ArrowUp" && h(w + 0.05), c === "ArrowDown" && h(w - 0.05), c === "ArrowLeft" && B(), c === "ArrowRight" && F();
    }
  }, le = () => {
    a.container.fullScreen = Boolean(document.fullscreenElement), T(`${a.container.fullScreen ? "Full" : "Normal"} screen`);
  };
  let X;
  const ge = () => {
    X && clearTimeout(X), a.container.mouseMove = !0, !a.container.mouseHold && (X = setTimeout(() => {
      a.container.mouseMove = !1;
    }, 1e3));
  };
  return ue(() => {
    J || (window.addEventListener("resize", ae), window.addEventListener("keydown", se), document.addEventListener("fullscreenchange", le), J = !0);
  }), Me(() => {
    !J || (window.removeEventListener("resize", ae), window.removeEventListener("keydown", se), document.removeEventListener("fullscreenchange", le), J = !1);
  }), {
    data: a,
    initialVideo: l,
    setVideoSeek: b,
    toggleVideoPlay: $,
    toggleVideoMute: V,
    changeVideoVolume: _,
    changeVideoFrame: v,
    setVideoPlaybackRate: K,
    toggleVideoRange: he,
    toggleVideoBbox: _e,
    toggleFullScreen: ne,
    setMessage: T,
    onContainerMouseMove: ge
  };
}
const z = (i, t) => {
  const d = i.__vccOpts || i;
  for (const [l, r] of t)
    d[l] = r;
  return d;
}, Q = (i) => (pe("data-v-05360fd3"), i = i(), fe(), i), Se = { class: "cvp-header" }, Ve = /* @__PURE__ */ Q(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Ce = { key: 0 }, Fe = /* @__PURE__ */ Q(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = /* @__PURE__ */ Q(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), De = { key: 0 }, He = /* @__PURE__ */ Q(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), ze = {
  __name: "Header",
  setup(i) {
    const { data: t } = H(), d = S(() => t.range.start > 0 && t.range.end > 0), l = S(() => t.video.fps > 0);
    return (r, b) => (p(), f("div", Se, [
      n("div", {
        class: q(["cvp-information", !e(t).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, x(e(W)(e(t).video.currentTime)), 1),
        Ve,
        n("span", null, x(e(W)(e(t).video.duration)), 1),
        e(l) ? (p(), f("span", Ce, [
          n("span", null, " [ " + x(e(j)(e(E)(e(t).video.currentTime, e(t).video.fps))), 1),
          Fe,
          n("span", null, x(e(j)(e(E)(e(t).video.duration, e(t).video.fps))) + " ]", 1)
        ])) : D("", !0)
      ], 2),
      e(d) ? (p(), f("div", {
        key: 0,
        class: q(["cvp-information", e(t).range.enabled && "cvp-information-active"])
      }, [
        n("span", null, x(e(W)(e(t).video.currentTime)), 1),
        Be,
        n("span", null, x(e(W)(e(t).range.end)), 1),
        e(l) ? (p(), f("span", De, [
          n("span", null, " [ " + x(e(j)(e(E)(e(t).video.currentTime, e(t).video.fps))), 1),
          He,
          n("span", null, x(e(j)(e(E)(e(t).range.end, e(t).video.fps))) + " ]", 1)
        ])) : D("", !0)
      ], 2)) : D("", !0)
    ]));
  }
}, Re = /* @__PURE__ */ z(ze, [["__scopeId", "data-v-05360fd3"]]);
const Ie = { class: "cvp-main" }, Pe = ["src", "muted", "autoplay"], Le = {
  __name: "Main",
  props: {
    src: { type: String, default: !1, required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 }
  },
  setup(i) {
    const t = i, d = U(null), l = U(null), { data: r, initialVideo: b, toggleVideoPlay: M } = H(), $ = () => {
      Object.assign(r, {
        video: {
          ...r.video,
          element: d.value,
          canvas: l.value,
          width: d.value.videoWidth,
          height: d.value.videoHeight,
          duration: d.value.duration,
          paused: !(t.muted === !0 && t.autoplay === !0)
        }
      }), b();
    };
    return (h, _) => (p(), f("div", Ie, [
      n("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: d,
        src: i.src,
        muted: i.muted,
        autoplay: i.autoplay,
        onLoadedmetadata: $
      }, null, 40, Pe),
      n("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: l,
        onClick: _[0] || (_[0] = (...V) => e(M) && e(M)(...V))
      }, null, 512)
    ]));
  }
}, Ne = /* @__PURE__ */ z(Le, [["__scopeId", "data-v-760255dc"]]);
const We = { class: "cvp-seek" }, Ae = { class: "cvp-seek-drag" }, Oe = ["src"], je = { class: "cvp-seek-preview-time" }, qe = {
  __name: "Seek",
  setup(i) {
    const t = U(null), d = U(null), { data: l, setVideoSeek: r } = H(), b = S(() => l.range.start > 0 && l.range.end > 0), M = () => {
      const {
        video: { width: $, height: h },
        preview: { enabled: _ }
      } = l;
      if (!_)
        return;
      const V = d.value.getContext("2d"), F = $ * 0.3, B = h * 0.3;
      d.value.width = F, d.value.height = B, Object.assign(l, {
        preview: {
          ...l.preview,
          element: t.value
        }
      });
      const R = () => {
        !t.value || (V.imageSmoothingEnabled = !0, V.drawImage(t.value, 0, 0, F, B), window.requestAnimationFrame(R));
      };
      R();
    };
    return ($, h) => (p(), f("div", We, [
      n("div", Ae, [
        n("div", {
          class: "cvp-seek-area",
          onMousedown: h[0] || (h[0] = me((_) => {
            e(l).container.mouseDown = !0, e(r)(_);
          }, ["self"])),
          onMousemove: h[1] || (h[1] = (..._) => e(r) && e(r)(..._)),
          onMouseup: h[2] || (h[2] = (_) => e(l).container.mouseDown = !1),
          onMouseleave: h[3] || (h[3] = (_) => e(l).container.mouseDown = !1)
        }, [
          n("div", {
            class: "cvp-seek-buffer",
            style: O({ width: `${e(l).seek.bufferWidth}%` })
          }, null, 4),
          n("div", {
            class: "cvp-seek-bar",
            style: O({ width: `${e(l).seek.width}%` })
          }, null, 4),
          e(b) ? (p(), f("div", {
            key: 0,
            class: "cvp-seek-range",
            style: O({ left: `${e(l).range.left}px`, width: `${e(l).range.width}px` })
          }, null, 4)) : D("", !0)
        ], 32)
      ]),
      e(l).preview.enabled ? (p(), f("div", {
        key: 0,
        class: "cvp-seek-preview",
        style: O({ left: `${e(l).preview.left}px` })
      }, [
        n("video", {
          class: "cvp-seek-preview-video",
          ref_key: "video",
          ref: t,
          src: e(l).video.src,
          onLoadedmetadata: M
        }, null, 40, Oe),
        n("canvas", {
          class: "cvp-seek-preview-canvas",
          ref_key: "canvas",
          ref: d
        }, null, 512),
        n("div", je, x(e(l).preview.time), 1)
      ], 4)) : D("", !0)
    ]));
  }
}, Ue = /* @__PURE__ */ z(qe, [["__scopeId", "data-v-ff68ff65"]]);
const g = (i) => (pe("data-v-98c973d0"), i = i(), fe(), i), Ge = { class: "cvp-controller" }, Ke = ["title"], Je = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Qe = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Ye = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M7 4v16l13 -8z" }, null, -1)), Ze = [
  Qe,
  Ye
], Xe = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, et = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), tt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), ot = /* @__PURE__ */ g(() => /* @__PURE__ */ n("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), nt = [
  et,
  tt,
  ot
], at = { class: "cvp-controller-volume" }, st = ["title"], lt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, it = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), rt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), dt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), ct = [
  it,
  rt,
  dt
], vt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, ut = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), pt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ft = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), mt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), ht = [
  ut,
  pt,
  ft,
  mt
], _t = { class: "cvp-controller-volume-drag" }, gt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("svg", {
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
], -1)), bt = [
  gt
], yt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("svg", {
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
], -1)), wt = [
  yt
], kt = /* @__PURE__ */ g(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), xt = { class: "cvp-controller-playback-rate" }, Mt = { class: "cvp-controller-playback-rate-text" }, $t = { class: "cvp-controller-playback-rate-list" }, Tt = { class: "cvp-controller-playback-rate-item" }, Et = ["onClick"], St = ["title"], Vt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ct = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-98c973d0></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-98c973d0></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-98c973d0></path><path d="M9 6v-3h6v3" data-v-98c973d0></path><path d="M9 18v3h6v-3" data-v-98c973d0></path>', 5), Ft = [
  Ct
], Bt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Dt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-98c973d0></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-98c973d0></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-98c973d0></path><path d="M3 6v-3h18v3" data-v-98c973d0></path><path d="M3 18v3h18v-3" data-v-98c973d0></path>', 5), Ht = [
  Dt
], zt = ["title"], Rt = /* @__PURE__ */ G('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-98c973d0><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-98c973d0></path><circle cx="5" cy="5" r="2" data-v-98c973d0></circle><circle cx="19" cy="5" r="2" data-v-98c973d0></circle><circle cx="5" cy="19" r="2" data-v-98c973d0></circle><circle cx="19" cy="19" r="2" data-v-98c973d0></circle><line x1="5" y1="7" x2="5" y2="17" data-v-98c973d0></line><line x1="7" y1="5" x2="17" y2="5" data-v-98c973d0></line><line x1="7" y1="19" x2="17" y2="19" data-v-98c973d0></line><line x1="19" y1="7" x2="19" y2="17" data-v-98c973d0></line></svg>', 1), It = [
  Rt
], Pt = ["title"], Lt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Nt = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-98c973d0></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-98c973d0></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-98c973d0></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-98c973d0></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-98c973d0></path>', 5), Wt = [
  Nt
], At = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ot = /* @__PURE__ */ G('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-98c973d0></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-98c973d0></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-98c973d0></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-98c973d0></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-98c973d0></path>', 5), jt = [
  Ot
], qt = {
  __name: "Controller",
  setup(i) {
    const {
      data: t,
      toggleVideoPlay: d,
      toggleVideoMute: l,
      changeVideoVolume: r,
      changeVideoFrame: b,
      setVideoPlaybackRate: M,
      toggleVideoRange: $,
      toggleVideoBbox: h,
      toggleFullScreen: _
    } = H(), V = S(() => t.range.start > 0 && t.range.end > 0), F = S(() => t.video.fps > 0), B = S(() => Object.keys(t.bbox.data).length > 0);
    return (R, v) => {
      var K;
      return p(), f("div", Ge, [
        n("button", {
          class: "cvp-controller-button",
          title: e(t).video.paused ? "Play" : "Pause",
          onClick: v[0] || (v[0] = (...u) => e(d) && e(d)(...u))
        }, [
          e(t).video.paused ? (p(), f("svg", Je, Ze)) : (p(), f("svg", Xe, nt))
        ], 8, Ke),
        n("div", at, [
          n("button", {
            class: "cvp-controller-button",
            title: e(t).video.muted ? "Unmute" : "Mute",
            onClick: v[1] || (v[1] = (...u) => e(l) && e(l)(...u))
          }, [
            e(t).video.muted ? (p(), f("svg", lt, ct)) : (p(), f("svg", vt, ht))
          ], 8, st),
          n("div", _t, [
            n("div", {
              class: "cvp-controller-volume-area",
              onMousedown: v[2] || (v[2] = me((u) => {
                e(t).container.mouseDown = !0, e(r)(u);
              }, ["self"])),
              onMousemove: v[3] || (v[3] = (...u) => e(r) && e(r)(...u)),
              onMouseup: v[4] || (v[4] = (u) => e(t).container.mouseDown = !1),
              onMouseleave: v[5] || (v[5] = (u) => e(t).container.mouseDown = !1)
            }, [
              n("div", {
                class: "cvp-controller-volume-bar",
                style: O({ height: `${e(t).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        n("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: v[6] || (v[6] = (u) => {
            e(t).container.mouseDown = !0, e(b)(!1);
          }),
          onMouseup: v[7] || (v[7] = (u) => {
            e(t).container.mouseDown = !1, e(b)(!1);
          })
        }, bt, 32),
        n("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: v[8] || (v[8] = (u) => {
            e(t).container.mouseDown = !0, e(b)(!0);
          }),
          onMouseup: v[9] || (v[9] = (u) => {
            e(t).container.mouseDown = !1, e(b)(!0);
          })
        }, wt, 32),
        kt,
        n("div", xt, [
          n("div", Mt, "x" + x(((K = e(t).video.playbackRate) == null ? void 0 : K.toFixed(1)) || "1.0"), 1),
          n("ul", $t, [
            (p(!0), f($e, null, Te([0.1, 0.5, 1, 1.5, 2, 5], (u) => (p(), f("li", Tt, [
              n("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (Y) => e(M)(u)
              }, x(u.toFixed(1)), 9, Et)
            ]))), 256))
          ])
        ]),
        e(V) ? (p(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          title: e(t).range.enabled ? "Reset range" : "Set range",
          onClick: v[10] || (v[10] = (...u) => e($) && e($)(...u))
        }, [
          e(t).range.enabled ? (p(), f("svg", Vt, Ft)) : (p(), f("svg", Bt, Ht))
        ], 8, St)) : D("", !0),
        e(F) && e(B) ? (p(), f("button", {
          key: 1,
          class: q(["cvp-controller-button", e(t).bbox.enabled && "cvp-controller-button-active"]),
          title: e(t).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: v[11] || (v[11] = (...u) => e(h) && e(h)(...u))
        }, It, 10, zt)) : D("", !0),
        n("button", {
          class: "cvp-controller-button",
          title: e(t).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: v[12] || (v[12] = (...u) => e(_) && e(_)(...u))
        }, [
          e(t).container.fullScreen ? (p(), f("svg", Lt, Wt)) : (p(), f("svg", At, jt))
        ], 8, Pt)
      ]);
    };
  }
}, Ut = /* @__PURE__ */ z(qt, [["__scopeId", "data-v-98c973d0"]]);
const Gt = {
  __name: "index",
  setup(i) {
    const { data: t, onContainerMouseMove: d } = H();
    return (l, r) => (p(), f("div", {
      class: q(["cvp-footer", e(t).container.mouseMove && "cvp-footer-active"]),
      onMouseenter: r[0] || (r[0] = (b) => e(t).container.mouseHold = !0),
      onMouseleave: r[1] || (r[1] = (b) => {
        e(t).container.mouseHold = !1, e(d)();
      })
    }, [
      N(Ue),
      N(Ut)
    ], 34));
  }
}, Kt = /* @__PURE__ */ z(Gt, [["__scopeId", "data-v-627ed2ba"]]);
const Jt = { class: "cvp-message" }, Qt = ["innerHTML"], Yt = {
  __name: "Message",
  setup(i) {
    const { data: t } = H();
    return (d, l) => (p(), f("div", Jt, [
      n("div", {
        class: q(["cvp-message-text", e(t).message.visible ? "cvp-message-text-show" : "cvp-message-text-hide"]),
        innerHTML: e(t).message.text
      }, null, 10, Qt)
    ]));
  }
}, Zt = /* @__PURE__ */ z(Yt, [["__scopeId", "data-v-1ecb3b3a"]]);
const Xt = ["data-dark-mode", "data-type"], eo = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    range: { type: Array, validator: (i) => !i.length || i.length === 2 && i.every((t) => typeof t == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(i) {
    const t = i, d = U(null), { data: l, onContainerMouseMove: r } = H();
    return ue(() => {
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
      }), l.container.type === "overlay" && l.container.element.addEventListener("mousemove", r);
    }), Ee(() => {
      l.container.type === "overlay" && l.container.element.removeEventListener("mousemove", r);
    }), (b, M) => (p(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: d,
      "data-dark-mode": i.darkMode,
      "data-type": t.type
    }, [
      N(Re),
      N(Ne, {
        src: t.src,
        muted: t.muted,
        autoplay: t.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      N(Kt),
      N(Zt)
    ], 8, Xt));
  }
}, oo = /* @__PURE__ */ z(eo, [["__scopeId", "data-v-cfdbdca7"]]);
export {
  oo as default
};
