import { reactive as Se, computed as b, onMounted as ge, onUnmounted as Ve, openBlock as u, createElementBlock as f, createElementVNode as a, unref as t, toDisplayString as C, createCommentVNode as W, pushScopeId as be, popScopeId as ye, ref as J, withModifiers as we, normalizeStyle as G, Fragment as Ce, renderList as Fe, createStaticVNode as Q, createVNode as q, watch as Be, onBeforeUnmount as De } from "vue";
const K = (l) => {
  const e = parseInt(l), v = Math.floor(e / 3600), s = Math.floor(e % 3600 / 60), d = e % 60;
  return `${v < 10 ? "0" + v : v}:${s < 10 ? "0" + s : s}:${d < 10 ? "0" + d : d}`;
}, z = (l, e) => Math.round(l * e), ue = (l, e) => l / e, re = (l) => l === void 0 ? !1 : new Intl.NumberFormat().format(l), o = Se({
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
    textColor: "#fff",
    fillColor: "rgba(0, 0, 255, 0.5)",
    borderSize: 1,
    borderColor: "rgba(255, 0, 0, 0.5)",
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
let se = !1;
function L() {
  const l = b(() => o.range.start > 0 && o.range.end > 0), e = b(() => o.video.fps > 0), v = b(() => Object.keys(o.bbox.data).length > 0), s = () => {
    const {
      video: { element: n, canvas: r, width: i, height: _, duration: w, fps: S },
      range: { start: D }
    } = o, g = r.getContext("2d"), Z = (H, ee) => {
      const te = "...", N = g.measureText(te).width + 10;
      let F = H, j = g.measureText(F).width;
      if (j <= ee || j <= N)
        return F;
      {
        let oe = F.length;
        for (; j >= ee - N && oe-- > 0; )
          F = F.substr(0, oe), j = g.measureText(F).width;
        return F + te;
      }
    };
    r.width = i, r.height = _, n.loop = o.video.loop, l.value && (n.currentTime = D), n.paused && (o.video.paused = !0, n.pause());
    const X = () => {
      const {
        video: { loop: H, src: ee },
        range: { enabled: te, start: N, end: F },
        bbox: { data: j, textColor: oe, fillColor: Me, borderSize: A, borderColor: Te, enabled: $e }
      } = o;
      if (!ee) {
        g.clearRect(0, 0, i, _);
        return;
      }
      g.drawImage(n, 0, 0, i, _);
      let ne = o.video.currentTime = n.currentTime;
      if (l.value && te ? (n.currentTime >= F && (H ? n.currentTime = N : (n.currentTime = F, n.pause(), o.video.paused = !0)), o.progress.seekWidth = (ne - N) / (F - N) * 100, o.progress.bufferWidth = 100) : (n.ended && H && (ne = 0), o.progress.seekWidth = ne / w * 100, n.buffered.length > 0 && (o.progress.bufferWidth = n.buffered.end(n.buffered.length - 1) / w * 100)), e.value && v.value && $e) {
        const Ee = z(ne, S), ae = j[Ee];
        ae != null && ae.length && ae.forEach(({ label: he, xywh: R }) => {
          if (R && R.length === 4) {
            const de = R[0], ce = R[1], ve = R[2] - R[0], _e = R[3] - R[1];
            g.fillStyle = Me, g.fillRect(de, ce, ve, _e), he && (g.font = "14px Roboto", g.fillStyle = oe, g.fillText(Z(he, ve), de + 5, ce + 15)), A && (g.lineWidth = A, g.strokeStyle = Te, g.strokeRect(de - A / 2, ce - A / 2, ve + A, _e + A));
          }
        });
      }
      n.paused && Math.floor(o.progress.seekWidth) === 100 && (o.video.paused = !0), window.requestAnimationFrame(X);
    };
    X();
  }, d = (n) => {
    const {
      video: { element: r, duration: i, fps: _ },
      range: { enabled: w, start: S, end: D }
    } = o;
    r.currentTime = l.value && w ? Math.max(Math.min(n, D), S) : Math.max(Math.min(n, i), 0);
    const g = l.value && w ? Math.round((r.currentTime - S) / (D - S) * 100) : Math.round(r.currentTime / i * 100);
    B(`Seek ${K(r.currentTime)} ${e.value ? `[${re(z(r.currentTime, _))}]` : ""} (${g}%)`);
  }, y = ({ offsetX: n }) => {
    const {
      container: { mouseDown: r },
      video: { element: i, duration: _ },
      progress: { seekTotal: w },
      preview: { enabled: S, element: D },
      range: { enabled: g, start: Z, end: X }
    } = o;
    if (!i)
      return;
    const H = g ? n / w * (X - Z) + Z : n / w * _;
    H === 1 / 0 || isNaN(H) || (r && d(H), D && S && (D.currentTime = H, o.preview.time = K(H), n < 65 ? o.preview.left = 65 : n > w - 65 ? o.preview.left = w - 65 : o.preview.left = n));
  };
  let V;
  const M = ({ detail: n }) => {
    if (n === 1) {
      const {
        video: { element: r, paused: i },
        range: { enabled: _, start: w, end: S }
      } = o;
      V = setTimeout(() => {
        i ? (l.value && _ && r.currentTime === S && (r.currentTime = w), r.play()) : r.pause(), B(i ? "Play" : "Pause"), o.video.paused = !i;
      }, 250);
    } else
      n === 2 && (clearTimeout(V), fe());
  }, T = (n) => {
    const {
      video: { element: r }
    } = o, i = Math.max(Math.min(n, 1), 0);
    r.volume = o.video.volume = i, B(`Volume ${Math.floor(i * 100)}%`);
  }, $ = ({ offsetY: n }) => {
    const {
      container: { mouseDown: r }
    } = o;
    r && T((100 - n) / 100);
  }, p = () => {
    const {
      video: { element: n, muted: r }
    } = o;
    n.muted = o.video.muted = !r, B(r ? "Unmuted" : "Muted");
  }, m = () => {
    const {
      video: { element: n, fps: r },
      range: { end: i }
    } = o;
    if (e.value) {
      const _ = z(n.currentTime, r) + 1;
      z(i, r) === _ ? d(i) : d(ue(_, r));
    } else
      d(n.currentTime + 1);
  }, x = () => {
    const {
      video: { element: n, fps: r },
      range: { start: i }
    } = o;
    if (e.value) {
      const _ = z(n.currentTime, r) - 1;
      z(i, r) === _ ? d(i) : d(ue(_, r));
    } else
      d(n.currentTime - 1);
  };
  let E;
  const P = (n) => {
    const {
      container: { mouseDown: r }
    } = o;
    r ? E = setInterval(() => {
      n ? m() : x();
    }, 60) : clearInterval(E);
  }, U = (n) => {
    const {
      video: { element: r }
    } = o;
    r.playbackRate = o.video.playbackRate = n, B(`Playback Rate x${n.toFixed(1)}`);
  }, c = (n) => {
    const {
      video: { element: r, duration: i },
      progress: { seekTotal: _ },
      range: { start: w, end: S }
    } = o;
    o.range.enabled !== n && (o.range.enabled = n, B(n ? "Active range" : "Inactive range")), n ? (r.currentTime = w, o.range.left = 0, o.range.width = _, o.progress.seekWidth = 0) : (r.currentTime = 0, o.range.left = Math.floor(w / i * _), o.range.width = Math.ceil(S / i * _ - w / i * _) || 1);
  }, I = () => {
    const {
      video: { element: n, loop: r }
    } = o;
    n.loop = o.video.loop = !r, B(r ? "Play once" : "Repeat play");
  }, h = () => {
    const {
      bbox: { enabled: n }
    } = o;
    o.bbox.enabled = !n, B(n ? "Hide bounding box" : "Show bounding box");
  };
  let Y;
  const B = (n) => {
    const { message: r } = o, { time: i } = r;
    !i || (r.text = n, r.visible = !0, Y && clearTimeout(Y), Y = setTimeout(() => {
      r.visible = !1;
    }, i));
  }, fe = () => {
    const {
      container: { element: n }
    } = o;
    document.fullscreenElement ? document.exitFullscreen() : n.requestFullscreen();
  }, pe = ({ altKey: n, ctrlKey: r, key: i }) => {
    const {
      video: { element: _, paused: w, volume: S, fps: D }
    } = o;
    if (n && r) {
      if (i === "g" && e.value) {
        const g = window.prompt("Go to frame number", z(_.currentTime, D));
        w && _.pause(), _.currentTime = ue(g, D);
      }
      i === "ArrowUp" && T(S + 0.05), i === "ArrowDown" && T(S - 0.05), i === "ArrowLeft" && x(), i === "ArrowRight" && m();
    }
  }, me = () => {
    o.container.fullScreen = Boolean(document.fullscreenElement), B(`${o.container.fullScreen ? "Full" : "Normal"} screen`);
  }, xe = () => {
    const {
      container: { element: n },
      range: { enabled: r },
      preview: { enabled: i }
    } = o;
    o.progress.seekTotal = n.offsetWidth, l.value && r && c(!0), i && (o.preview.left = 0);
  };
  let ie;
  const ke = () => {
    ie && clearTimeout(ie), o.container.mouseMove = !0, !o.container.mouseHold && (ie = setTimeout(() => {
      o.container.mouseMove = !1;
    }, 2e3));
  };
  return ge(() => {
    se || (window.addEventListener("keydown", pe), document.addEventListener("fullscreenchange", me), setTimeout(() => {
      o.container.resizeObserver = new ResizeObserver(xe), o.container.resizeObserver.observe(o.container.element);
    }, 300), se = !0);
  }), Ve(() => {
    !se || (o.container.resizeObserver.unobserve(o.container.element), window.removeEventListener("keydown", pe), document.removeEventListener("fullscreenchange", me), se = !1);
  }), {
    data: o,
    initialVideo: s,
    setVideoSeek: y,
    toggleVideoPlay: M,
    toggleVideoMute: p,
    changeVideoVolume: $,
    changeVideoFrame: P,
    setVideoPlaybackRate: U,
    setVideoRange: c,
    toggleVideoLoop: I,
    toggleVideoBbox: h,
    toggleFullScreen: fe,
    setMessage: B,
    handleContainerMouseMove: ke
  };
}
const O = (l, e) => {
  const v = l.__vccOpts || l;
  for (const [s, d] of e)
    v[s] = d;
  return v;
}, le = (l) => (be("data-v-f43b31fa"), l = l(), ye(), l), He = { class: "cvp-header" }, ze = ["data-active"], Pe = /* @__PURE__ */ le(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Re = { key: 0 }, We = /* @__PURE__ */ le(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = ["data-active"], Le = /* @__PURE__ */ le(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), Oe = { key: 0 }, Ne = /* @__PURE__ */ le(() => /* @__PURE__ */ a("span", { style: { opacity: "0.5" } }, " / ", -1)), je = {
  __name: "Header",
  setup(l) {
    const { data: e } = L(), v = b(() => e.range.start > 0 && e.range.end > 0), s = b(() => e.video.fps > 0), d = b(() => K(e.video.src && e.video.currentTime || 0)), y = b(() => K(e.video.src && e.video.duration || 0)), V = b(() => K(e.video.src && e.range.end || 0)), M = b(() => re(z(e.video.src && e.video.currentTime || 0, e.video.fps))), T = b(() => re(z(e.video.src && e.video.duration || 0, e.video.fps))), $ = b(() => re(z(e.video.src && e.range.end || 0, e.video.fps)));
    return (p, m) => (u(), f("div", He, [
      a("div", {
        class: "cvp-information",
        "data-active": !t(e).range.enabled
      }, [
        a("span", null, C(t(d)), 1),
        Pe,
        a("span", null, C(t(y)), 1),
        t(s) ? (u(), f("span", Re, [
          a("span", null, " [ " + C(t(M)), 1),
          We,
          a("span", null, C(t(T)) + " ]", 1)
        ])) : W("", !0)
      ], 8, ze),
      t(v) ? (u(), f("div", {
        key: 0,
        class: "cvp-information",
        "data-active": t(e).range.enabled
      }, [
        a("span", null, C(t(d)), 1),
        Le,
        a("span", null, C(t(V)), 1),
        t(s) ? (u(), f("span", Oe, [
          a("span", null, " [ " + C(t(M)), 1),
          Ne,
          a("span", null, C(t($)) + " ]", 1)
        ])) : W("", !0)
      ], 8, Ie)) : W("", !0)
    ]));
  }
}, Ae = /* @__PURE__ */ O(je, [["__scopeId", "data-v-f43b31fa"]]);
const qe = { class: "cvp-main" }, Ue = ["src", "muted", "autoplay"], Ge = {
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
    const v = l, s = J(null), d = J(null), { data: y, initialVideo: V, toggleVideoPlay: M } = L(), T = ($) => {
      Object.assign(y, {
        video: {
          ...y.video,
          element: s.value,
          canvas: d.value,
          width: s.value.videoWidth,
          height: s.value.videoHeight,
          duration: s.value.duration,
          paused: !(v.muted === !0 && v.autoplay === !0)
        }
      }), V(), e("loadedmetadata", $);
    };
    return ($, p) => (u(), f("div", qe, [
      a("video", {
        class: "cvp-video",
        ref_key: "video",
        ref: s,
        src: l.src,
        muted: l.muted,
        autoplay: l.autoplay,
        onLoadedmetadata: p[0] || (p[0] = (m) => T(m)),
        onPlay: p[1] || (p[1] = (m) => e("play", m)),
        onPause: p[2] || (p[2] = (m) => e("pause", m)),
        onTimeupdate: p[3] || (p[3] = (m) => e("timeupdate", m)),
        onVolumechange: p[4] || (p[4] = (m) => e("volumechange", m)),
        onError: p[5] || (p[5] = (m) => e("error", m))
      }, null, 40, Ue),
      a("canvas", {
        class: "cvp-canvas",
        ref_key: "canvas",
        ref: d,
        onClick: p[6] || (p[6] = (...m) => t(M) && t(M)(...m))
      }, null, 512)
    ]));
  }
}, Ke = /* @__PURE__ */ O(Ge, [["__scopeId", "data-v-352dd94f"]]);
const Je = { class: "cvp-progress" }, Qe = { class: "cvp-progress-drag" }, Ye = ["src"], Ze = { class: "cvp-progress-preview-time" }, Xe = {
  __name: "Progress",
  setup(l) {
    const e = J(null), v = J(null), { data: s, setVideoSeek: d } = L(), y = b(() => s.range.start > 0 && s.range.end > 0), V = b(() => `${s.video.src && s.progress.bufferWidth || 0}%`), M = b(() => `${s.video.src && s.progress.seekWidth || 0}%`), T = b(() => `${s.video.src && s.range.left || 0}px`), $ = b(() => `${s.video.src && s.range.width || 0}px`), p = () => {
      setTimeout(() => {
        const {
          video: { width: m, height: x },
          preview: { enabled: E }
        } = s;
        if (!E)
          return;
        const P = v.value.getContext("2d"), U = m * 0.3, c = x * 0.3;
        v.value.width = U, v.value.height = c, Object.assign(s, {
          preview: {
            ...s.preview,
            element: e.value
          }
        });
        const I = () => {
          !e.value || (P.imageSmoothingEnabled = !0, P.drawImage(e.value, 0, 0, U, c), window.requestAnimationFrame(I));
        };
        I();
      }, 100);
    };
    return (m, x) => (u(), f("div", Je, [
      a("div", Qe, [
        a("div", {
          class: "cvp-progress-area",
          onMousedown: x[0] || (x[0] = we((E) => {
            t(s).container.mouseDown = !0, t(d)(E);
          }, ["self"])),
          onMousemove: x[1] || (x[1] = (...E) => t(d) && t(d)(...E)),
          onMouseup: x[2] || (x[2] = (E) => t(s).container.mouseDown = !1),
          onMouseleave: x[3] || (x[3] = (E) => t(s).container.mouseDown = !1)
        }, [
          a("div", {
            class: "cvp-progress-buffer",
            style: G({ width: t(V) })
          }, null, 4),
          a("div", {
            class: "cvp-progress-bar",
            style: G({ width: t(M) })
          }, null, 4),
          t(y) ? (u(), f("div", {
            key: 0,
            class: "cvp-progress-range",
            style: G({ left: t(T), width: t($) })
          }, null, 4)) : W("", !0)
        ], 32)
      ]),
      t(s).preview.enabled ? (u(), f("div", {
        key: 0,
        class: "cvp-progress-preview",
        style: G({ left: `${t(s).preview.left}px` })
      }, [
        a("video", {
          class: "cvp-progress-preview-video",
          ref_key: "video",
          ref: e,
          src: t(s).video.src,
          onLoadeddata: p
        }, null, 40, Ye),
        a("canvas", {
          class: "cvp-progress-preview-canvas",
          ref_key: "canvas",
          ref: v
        }, null, 512),
        a("div", Ze, C(t(s).preview.time), 1)
      ], 4)) : W("", !0)
    ]));
  }
}, et = /* @__PURE__ */ O(Xe, [["__scopeId", "data-v-c1f46be8"]]);
const k = (l) => (be("data-v-f2163948"), l = l(), ye(), l), tt = { class: "cvp-controller" }, ot = ["title"], nt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, at = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), st = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M7 4v16l13 -8z" }, null, -1)), rt = [
  at,
  st
], lt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, it = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), dt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), ct = /* @__PURE__ */ k(() => /* @__PURE__ */ a("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), vt = [
  it,
  dt,
  ct
], ut = { class: "cvp-controller-volume" }, ft = ["title"], pt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, mt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ht = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), _t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), gt = [
  mt,
  ht,
  _t
], bt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, yt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), wt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), xt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), kt = /* @__PURE__ */ k(() => /* @__PURE__ */ a("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), Mt = [
  yt,
  wt,
  xt,
  kt
], Tt = { class: "cvp-controller-volume-drag" }, $t = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), Et = [
  $t
], St = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), Vt = [
  St
], Ct = /* @__PURE__ */ k(() => /* @__PURE__ */ a("div", { style: { flex: "1" } }, null, -1)), Ft = { class: "cvp-controller-playback-rate" }, Bt = {
  class: "cvp-controller-playback-rate-text",
  title: "Playback rate"
}, Dt = { class: "cvp-controller-playback-rate-list" }, Ht = { class: "cvp-controller-playback-rate-item" }, zt = ["onClick"], Pt = ["data-active", "title"], Rt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Wt = /* @__PURE__ */ Q('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M9 6v-3h6v3" data-v-f2163948></path><path d="M9 18v3h6v-3" data-v-f2163948></path>', 5), It = [
  Wt
], Lt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ot = /* @__PURE__ */ Q('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-f2163948></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-f2163948></path><path d="M3 6v-3h18v3" data-v-f2163948></path><path d="M3 18v3h18v-3" data-v-f2163948></path>', 5), Nt = [
  Ot
], jt = ["data-active", "title"], At = /* @__PURE__ */ k(() => /* @__PURE__ */ a("svg", {
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
], -1)), qt = [
  At
], Ut = ["data-active", "title"], Gt = /* @__PURE__ */ Q('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-f2163948><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><circle cx="5" cy="5" r="2" data-v-f2163948></circle><circle cx="19" cy="5" r="2" data-v-f2163948></circle><circle cx="5" cy="19" r="2" data-v-f2163948></circle><circle cx="19" cy="19" r="2" data-v-f2163948></circle><line x1="5" y1="7" x2="5" y2="17" data-v-f2163948></line><line x1="7" y1="5" x2="17" y2="5" data-v-f2163948></line><line x1="7" y1="19" x2="17" y2="19" data-v-f2163948></line><line x1="19" y1="7" x2="19" y2="17" data-v-f2163948></line></svg>', 1), Kt = [
  Gt
], Jt = ["title"], Qt = {
  key: 0,
  class: "cvp-controller-icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Yt = /* @__PURE__ */ Q('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), Zt = [
  Yt
], Xt = {
  key: 1,
  class: "cvp-controller-icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, eo = /* @__PURE__ */ Q('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-f2163948></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-f2163948></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-f2163948></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-f2163948></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-f2163948></path>', 5), to = [
  eo
], oo = {
  __name: "Controller",
  setup(l) {
    const {
      data: e,
      toggleVideoPlay: v,
      toggleVideoMute: s,
      changeVideoVolume: d,
      changeVideoFrame: y,
      setVideoPlaybackRate: V,
      setVideoRange: M,
      toggleVideoLoop: T,
      toggleVideoBbox: $,
      toggleFullScreen: p
    } = L(), m = b(() => e.range.start > 0 && e.range.end > 0), x = b(() => e.video.fps > 0), E = b(() => Object.keys(e.bbox.data).length > 0), P = () => {
      M(!e.range.enabled);
    };
    return (U, c) => {
      var I;
      return u(), f("div", tt, [
        a("button", {
          class: "cvp-controller-button",
          title: t(e).video.paused ? "Play" : "Pause",
          onClick: c[0] || (c[0] = (...h) => t(v) && t(v)(...h))
        }, [
          t(e).video.paused ? (u(), f("svg", nt, rt)) : (u(), f("svg", lt, vt))
        ], 8, ot),
        a("div", ut, [
          a("button", {
            class: "cvp-controller-button",
            title: t(e).video.muted ? "Unmute" : "Mute",
            onClick: c[1] || (c[1] = (...h) => t(s) && t(s)(...h))
          }, [
            t(e).video.muted ? (u(), f("svg", pt, gt)) : (u(), f("svg", bt, Mt))
          ], 8, ft),
          a("div", Tt, [
            a("div", {
              class: "cvp-controller-volume-area",
              onMousedown: c[2] || (c[2] = we((h) => {
                t(e).container.mouseDown = !0, t(d)(h);
              }, ["self"])),
              onMousemove: c[3] || (c[3] = (...h) => t(d) && t(d)(...h)),
              onMouseup: c[4] || (c[4] = (h) => t(e).container.mouseDown = !1),
              onMouseleave: c[5] || (c[5] = (h) => t(e).container.mouseDown = !1)
            }, [
              a("div", {
                class: "cvp-controller-volume-bar",
                style: G({ height: `${t(e).video.volume * 100}%` })
              }, null, 4)
            ], 32)
          ])
        ]),
        a("button", {
          class: "cvp-controller-button",
          title: "Backward",
          onMousedown: c[6] || (c[6] = (h) => {
            t(e).container.mouseDown = !0, t(y)(!1);
          }),
          onMouseup: c[7] || (c[7] = (h) => {
            t(e).container.mouseDown = !1, t(y)(!1);
          })
        }, Et, 32),
        a("button", {
          class: "cvp-controller-button",
          title: "Forward",
          onMousedown: c[8] || (c[8] = (h) => {
            t(e).container.mouseDown = !0, t(y)(!0);
          }),
          onMouseup: c[9] || (c[9] = (h) => {
            t(e).container.mouseDown = !1, t(y)(!0);
          })
        }, Vt, 32),
        Ct,
        a("div", Ft, [
          a("div", Bt, "x" + C(((I = t(e).video.playbackRate) == null ? void 0 : I.toFixed(1)) || "1.0"), 1),
          a("ul", Dt, [
            (u(!0), f(Ce, null, Fe([0.1, 0.5, 1, 1.5, 2, 5], (h) => (u(), f("li", Ht, [
              a("button", {
                class: "cvp-controller-playback-rate-button",
                onClick: (Y) => t(V)(h)
              }, C(h.toFixed(1)), 9, zt)
            ]))), 256))
          ])
        ]),
        t(m) ? (u(), f("button", {
          key: 0,
          class: "cvp-controller-button",
          "data-active": t(e).range.enabled,
          title: t(e).range.enabled ? "Reset range" : "Set range",
          onClick: P
        }, [
          t(e).range.enabled ? (u(), f("svg", Rt, It)) : (u(), f("svg", Lt, Nt))
        ], 8, Pt)) : W("", !0),
        a("button", {
          class: "cvp-controller-button",
          "data-active": t(e).video.loop,
          title: t(e).video.loop ? "Play once" : "Repeat play",
          onClick: c[10] || (c[10] = (...h) => t(T) && t(T)(...h))
        }, qt, 8, jt),
        t(x) && t(E) ? (u(), f("button", {
          key: 1,
          class: "cvp-controller-button",
          "data-active": t(e).bbox.enabled,
          title: t(e).bbox.enabled ? "Hide bounding box" : "Show bounding box",
          onClick: c[11] || (c[11] = (...h) => t($) && t($)(...h))
        }, Kt, 8, Ut)) : W("", !0),
        a("button", {
          class: "cvp-controller-button",
          title: t(e).container.fullScreen ? "Normal screen" : "Full screen",
          onClick: c[12] || (c[12] = (...h) => t(p) && t(p)(...h))
        }, [
          t(e).container.fullScreen ? (u(), f("svg", Qt, Zt)) : (u(), f("svg", Xt, to))
        ], 8, Jt)
      ]);
    };
  }
}, no = /* @__PURE__ */ O(oo, [["__scopeId", "data-v-f2163948"]]);
const ao = ["data-active"], so = {
  __name: "index",
  setup(l) {
    const { data: e, handleContainerMouseMove: v } = L();
    return (s, d) => (u(), f("div", {
      class: "cvp-footer",
      "data-active": t(e).container.mouseMove,
      onMouseenter: d[0] || (d[0] = (y) => t(e).container.mouseHold = !0),
      onMouseleave: d[1] || (d[1] = (y) => {
        t(e).container.mouseHold = !1, t(v)();
      })
    }, [
      q(et),
      q(no)
    ], 40, ao));
  }
}, ro = /* @__PURE__ */ O(so, [["__scopeId", "data-v-33a4d776"]]);
const lo = { class: "cvp-message" }, io = ["data-visible", "innerHTML"], co = {
  __name: "Message",
  setup(l) {
    const { data: e } = L();
    return (v, s) => (u(), f("div", lo, [
      a("div", {
        class: "cvp-message-text",
        "data-visible": t(e).message.visible,
        innerHTML: t(e).message.text
      }, null, 8, io)
    ]));
  }
}, vo = /* @__PURE__ */ O(co, [["__scopeId", "data-v-8fa62035"]]);
const uo = ["data-dark-mode", "data-type"], fo = {
  key: 0,
  class: "cvp-block"
}, po = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    range: { type: Array, validator: (l) => !l.length || l.length === 2 && l.every((e) => typeof e == "number"), default: () => [0, 0] },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default: () => ({ data: {}, textColor: "#fff", fillColor: "rgba(0, 0, 255, 0.5)", borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)" }) },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(l) {
    const e = l, v = J(null), { data: s, setVideoRange: d, handleContainerMouseMove: y } = L();
    return Be(() => e, ({ src: V, muted: M, loop: T, range: $, fps: p, bbox: m, type: x, messageTime: E, preview: P }) => {
      Object.assign(s.container, { type: x }), Object.assign(s.video, { src: V, muted: M, loop: T, fps: p }), Object.assign(s.preview, { enabled: P }), Object.assign(s.range, { start: $[0], end: $[1] }), Object.assign(s.bbox, { ...m }), Object.assign(s.message, { time: E }), s.range.start && s.range.end && d(!0), Object.keys(s.bbox.data).length && (s.bbox.enabled = !0);
    }, { deep: !0 }), ge(() => {
      Object.assign(s, { container: { ...s.container, element: v.value } }), s.container.type === "overlay" && s.container.element.addEventListener("mousemove", y);
    }), De(() => {
      s.container.type === "overlay" && s.container.element.removeEventListener("mousemove", y);
    }), (V, M) => (u(), f("div", {
      id: "vue3-canvas-video-player",
      ref_key: "container",
      ref: v,
      "data-dark-mode": l.darkMode,
      "data-type": e.type
    }, [
      q(Ae),
      q(Ke, {
        src: e.src,
        muted: e.muted,
        autoplay: e.autoplay
      }, null, 8, ["src", "muted", "autoplay"]),
      q(ro),
      q(vo),
      e.src.length ? W("", !0) : (u(), f("div", fo, C(t(s).block.text), 1))
    ], 8, uo));
  }
}, ho = /* @__PURE__ */ O(po, [["__scopeId", "data-v-bd75ab9b"]]);
export {
  ho as default
};
