import { computed as W, ref as C, reactive as xe, onMounted as ke, onUnmounted as Me, openBlock as u, createElementBlock as v, createElementVNode as n, normalizeClass as S, toDisplayString as h, unref as r, createCommentVNode as y, withModifiers as he, normalizeStyle as B, Fragment as Te, renderList as Ve, pushScopeId as Ce, popScopeId as Se, createStaticVNode as $ } from "vue";
const M = (l) => {
  const a = parseInt(l), d = Math.floor(a / 3600), m = Math.floor(a % 3600 / 60), f = a % 60;
  return `${d < 10 ? "0" + d : d}:${m < 10 ? "0" + m : m}:${f < 10 ? "0" + f : f}`;
}, p = (l) => Math.round(l * props.fps), A = (l) => l / props.fps, z = (l) => l === void 0 ? !1 : new Intl.NumberFormat().format(l);
const ze = (l, a) => {
  const d = l.__vccOpts || l;
  for (const [m, f] of a)
    d[m] = f;
  return d;
}, c = (l) => (Ce("data-v-2625e36c"), l = l(), Se(), l), $e = ["data-dark-mode", "data-type"], Re = { class: "header" }, Ee = /* @__PURE__ */ c(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, Fe = /* @__PURE__ */ c(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), He = /* @__PURE__ */ c(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Le = { key: 0 }, Pe = /* @__PURE__ */ c(() => /* @__PURE__ */ n("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = { class: "main" }, Ne = ["src", "muted", "autoplay"], De = { class: "seek" }, We = { class: "drag" }, Ae = ["src"], Oe = { class: "time" }, Ue = { class: "controller" }, je = ["title"], qe = {
  key: 0,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ge = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Ke = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M7 4v16l13 -8z" }, null, -1)), Je = [
  Ge,
  Ke
], Qe = {
  key: 1,
  class: "icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ye = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Ze = /* @__PURE__ */ c(() => /* @__PURE__ */ n("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), Xe = /* @__PURE__ */ c(() => /* @__PURE__ */ n("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), et = [
  Ye,
  Ze,
  Xe
], tt = { class: "volume" }, nt = ["title"], ot = {
  key: 0,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, at = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), st = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), it = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), lt = [
  at,
  st,
  it
], dt = {
  key: 1,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, rt = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ct = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ut = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), vt = /* @__PURE__ */ c(() => /* @__PURE__ */ n("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), mt = [
  rt,
  ct,
  ut,
  vt
], ht = { class: "drag" }, ft = /* @__PURE__ */ c(() => /* @__PURE__ */ n("svg", {
  class: "icon",
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
], -1)), pt = [
  ft
], gt = /* @__PURE__ */ c(() => /* @__PURE__ */ n("svg", {
  class: "icon",
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
], -1)), bt = [
  gt
], wt = /* @__PURE__ */ c(() => /* @__PURE__ */ n("div", { style: { flex: "1" } }, null, -1)), _t = { class: "playback-rate" }, yt = { class: "text" }, xt = { class: "list" }, kt = { class: "item" }, Mt = ["onClick"], Tt = ["title"], Vt = {
  key: 0,
  class: "icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ct = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-2625e36c></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-2625e36c></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-2625e36c></path><path d="M9 6v-3h6v3" data-v-2625e36c></path><path d="M9 18v3h6v-3" data-v-2625e36c></path>', 5), St = [
  Ct
], zt = {
  key: 1,
  class: "icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, $t = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-2625e36c></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-2625e36c></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-2625e36c></path><path d="M3 6v-3h18v3" data-v-2625e36c></path><path d="M3 18v3h18v-3" data-v-2625e36c></path>', 5), Rt = [
  $t
], Et = ["title"], Bt = /* @__PURE__ */ $('<svg class="icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-2625e36c><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-2625e36c></path><circle cx="5" cy="5" r="2" data-v-2625e36c></circle><circle cx="19" cy="5" r="2" data-v-2625e36c></circle><circle cx="5" cy="19" r="2" data-v-2625e36c></circle><circle cx="19" cy="19" r="2" data-v-2625e36c></circle><line x1="5" y1="7" x2="5" y2="17" data-v-2625e36c></line><line x1="7" y1="5" x2="17" y2="5" data-v-2625e36c></line><line x1="7" y1="19" x2="17" y2="19" data-v-2625e36c></line><line x1="19" y1="7" x2="19" y2="17" data-v-2625e36c></line></svg>', 1), Ft = [
  Bt
], Ht = ["title"], Lt = {
  key: 0,
  class: "icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Pt = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-2625e36c></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-2625e36c></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-2625e36c></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-2625e36c></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-2625e36c></path>', 5), It = [
  Pt
], Nt = {
  key: 1,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Dt = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-2625e36c></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-2625e36c></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-2625e36c></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-2625e36c></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-2625e36c></path>', 5), Wt = [
  Dt
], At = { class: "message" }, Ot = ["innerHTML"], Ut = {
  __name: "Vue3CanvasVideoPlayer",
  props: {
    src: { type: String, default: "", required: !0 },
    muted: { type: Boolean, default: !1 },
    autoplay: { type: Boolean, default: !1 },
    range: { type: Array, default() {
      return [];
    } },
    fps: { type: Number, default: 0 },
    bbox: { type: Object, default() {
      return {};
    } },
    type: { type: String, default: "overlay" },
    messageTime: { type: Number, default: 1e3 },
    preview: { type: Boolean, default: !1 },
    darkMode: { type: Boolean, default: !0 }
  },
  setup(l) {
    const a = l, d = W(() => a.range[0] > 0 && a.range[1] > 0), m = W(() => a.fps > 0), f = W(() => {
      var o;
      return ((o = a.bbox) == null ? void 0 : o.data) && Object.keys(a.bbox.data).length > 0;
    }), x = C(null), T = C(null), F = C(null), R = C(null), H = C(null), e = xe({
      main: {
        video: null,
        canvas: null,
        context: null,
        width: 0,
        height: 0,
        paused: !0,
        muted: !1,
        volume: 1,
        playbackRate: 1,
        fullScreen: !1,
        currentTime: 0,
        duration: 0,
        ended: !1
      },
      seek: { width: 0, total: 0 },
      range: { enabled: !1, left: 0, width: 0 },
      bbox: { enabled: !1, data: {}, borderSize: 1, borderColor: "rgba(255, 0, 0, 0.5)", fillColor: "rgba(0, 0, 255, 0.5)" },
      message: { visible: !1, text: "" },
      preview: { element: null, context: null, left: 0, time: "00:00:00" },
      mouse: { down: !1, move: !1, hold: !1 }
    }), fe = () => {
      var le, de, re;
      Object.assign(e, {
        main: {
          ...e.main,
          video: T.value,
          canvas: F.value,
          context: F.value.getContext("2d"),
          width: T.value.videoWidth,
          height: T.value.videoHeight,
          paused: !(a.muted === !0 && a.autoplay === !0),
          muted: a.muted,
          duration: T.value.duration
        },
        seek: { ...e.seek, total: x.value.offsetWidth },
        range: { ...e.range, enabled: d.value },
        bbox: { ...e.bbox, ...a.bbox, enabled: f.value },
        preview: {
          ...e.preview,
          video: R.value,
          canvas: H.value,
          context: (le = H.value) == null ? void 0 : le.getContext("2d"),
          width: (de = R.value) == null ? void 0 : de.videoWidth,
          height: (re = R.value) == null ? void 0 : re.videoHeight
        }
      });
      const {
        main: {
          video: o,
          canvas: t,
          context: s,
          width: i,
          height: b,
          duration: k
        },
        preview: { video: _, canvas: ne, context: oe }
      } = e, ae = i * 0.3, se = b * 0.3;
      t.width = i, t.height = b, a.preview && (ne.width = ae, ne.height = se), d.value && (o.currentTime = a.range[0]);
      const ie = () => {
        const {
          range: { enabled: _e }
        } = e;
        s.drawImage(o, 0, 0, i, b), a.preview && (oe.imageSmoothingEnabled = !0, oe.drawImage(_, 0, 0, ae, se));
        const D = e.main.currentTime = o.currentTime;
        if (Q(), d.value && _e ? e.seek.width = ((D - a.range[0]) / (a.range[1] - a.range[0]) * 100).toFixed(10) : e.seek.width = (D / k * 100).toFixed(10), o.paused && Math.floor(e.seek.width) === 100 && (e.main.paused = !0), m && f && e.bbox.enabled) {
          const ye = p(D), w = e.bbox.data[ye];
          if (w && w.length === 4) {
            const ce = w[0], ue = w[1], ve = w[2] - w[0], me = w[3] - w[1];
            s.fillStyle = e.bbox.fillColor, s.fillRect(ce, ue, ve, me), e.bbox.borderSize && (s.lineWidth = e.bbox.borderSize, s.strokeStyle = e.bbox.borderColor, s.strokeRect(ce - e.bbox.borderSize / 2, ue - e.bbox.borderSize / 2, ve + e.bbox.borderSize, me + e.bbox.borderSize));
          }
        }
        window.requestAnimationFrame(ie);
      };
      ie(), window.dispatchEvent(new Event("resize"));
    };
    let L;
    const g = (o) => {
      if (!a.messageTime)
        return;
      const { message: t } = e;
      t.text = o, t.visible = !0, L && clearTimeout(L), L = setTimeout(() => {
        t.visible = !1;
      }, a.messageTime);
    }, O = ({ offsetX: o }) => {
      const {
        main: { duration: t },
        seek: { total: s },
        preview: { video: i },
        range: { enabled: b },
        mouse: { down: k }
      } = e, _ = b ? o / s * (a.range[1] - a.range[0]) + a.range[0] : o / s * t;
      k && V(_), a.preview && (i.currentTime = _, e.preview.time = M(_), o < 65 ? e.preview.left = 65 : o > s - 65 ? e.preview.left = s - 65 : e.preview.left = o);
    };
    let U;
    const j = ({ detail: o }) => {
      if (o === 1) {
        const {
          main: { video: t, paused: s },
          range: { enabled: i }
        } = e;
        U = setTimeout(() => {
          s ? (d.value && i && t.currentTime === a.range[1] && (t.currentTime = a.range[0]), t.play()) : t.pause(), g(s ? "Play" : "Pause"), e.main.paused = !s;
        }, 250);
      } else
        o === 2 && (clearTimeout(U), Z());
    }, P = (o) => {
      const {
        main: { video: t }
      } = e, s = Math.max(Math.min(o, 1), 0);
      t.volume = e.main.volume = s, g(`Volume ${Math.floor(s * 100)}%`);
    }, q = ({ offsetY: o }) => {
      const {
        mouse: { down: t }
      } = e;
      t && P((100 - o) / 100);
    }, pe = () => {
      const {
        main: { video: o, muted: t }
      } = e;
      o.muted = e.main.muted = !t, g(t ? "Unmuted" : "Muted");
    }, V = (o) => {
      const {
        main: { video: t, duration: s },
        range: { enabled: i }
      } = e;
      t.currentTime = d.value && i ? Math.max(Math.min(o, a.range[1]), a.range[0]) : Math.max(Math.min(o, s), 0), g(`Seek ${M(t.currentTime)} ${m.value ? `[${z(p(t.currentTime))}]` : ""} (${d.value && i ? Math.round((t.currentTime - a.range[0]) / (a.range[1] - a.range[0]) * 100) : Math.round(t.currentTime / s * 100)}%)`);
    }, G = () => {
      const {
        main: { video: o }
      } = e;
      m.value ? V(A(p(o.currentTime) + 1)) : V(o.currentTime + 1);
    }, K = () => {
      const {
        main: { video: o }
      } = e;
      m.value ? V(A(p(o.currentTime) - 1)) : V(o.currentTime - 1);
    };
    let J;
    const E = (o) => {
      const {
        mouse: { down: t }
      } = e;
      t ? J = setInterval(() => {
        o ? G() : K();
      }, 60) : clearInterval(J);
    }, ge = (o) => {
      const {
        main: { video: t }
      } = e;
      t.playbackRate = e.main.playbackRate = o, g(`Playback Rate x${o.toFixed(1)}`);
    }, be = () => {
      const {
        bbox: { enabled: o }
      } = e;
      e.bbox.enabled = !o, g(o ? "Hide bounding box" : "Show bounding box");
    }, Q = () => {
      const {
        main: { video: o },
        range: { enabled: t }
      } = e;
      !(d.value && t) || (o.currentTime < a.range[0] && (o.currentTime = a.range[0]), o.currentTime > a.range[1] && (o.currentTime = a.range[1], o.pause(), e.main.paused = !0));
    }, Y = () => {
      const {
        main: { duration: o },
        seek: { total: t },
        range: { enabled: s }
      } = e;
      Q(), e.range.left = d.value && s ? 0 : a.range[0] / o * t, e.range.width = d.value && s ? t : a.range[1] / o * t - a.range[0] / o * t;
    }, we = () => {
      const {
        range: { enabled: o }
      } = e;
      e.range.enabled = !o, Y(), g(o ? "Inactive range" : "Active range");
    }, Z = () => {
      document.fullscreenElement ? document.exitFullscreen() : x.value.requestFullscreen();
    }, X = () => {
      e.seek.total = x.value.offsetWidth, d.value && Y(), a.preview && (e.preview.left = 0);
    }, ee = ({ altKey: o, ctrlKey: t, key: s }) => {
      const {
        main: { video: i, paused: b, volume: k }
      } = e;
      if (o && t) {
        if (s === "g" && m.value) {
          const _ = window.prompt("Go to frame number", p(i.currentTime));
          b && i.pause(), i.currentTime = A(_);
        }
        s === "ArrowUp" && P(k + 0.05), s === "ArrowDown" && P(k - 0.05), s === "ArrowLeft" && K(), s === "ArrowRight" && G();
      }
    }, te = () => {
      e.main.fullScreen = Boolean(document.fullscreenElement), g(`${e.main.fullScreen ? "Full" : "Normal"} screen`);
    };
    let I;
    const N = () => {
      I && clearTimeout(I), e.mouse.move = !0, !e.mouse.hold && (I = setTimeout(() => {
        e.mouse.move = !1;
      }, 1e3));
    };
    return ke(() => {
      window.addEventListener("resize", X), window.addEventListener("keydown", ee), document.addEventListener("fullscreenchange", te), a.type === "overlay" && x.value.addEventListener("mousemove", N);
    }), Me(() => {
      var o;
      window.removeEventListener("resize", X), window.removeEventListener("keydown", ee), document.removeEventListener("fullscreenchange", te), a.type === "overlay" && ((o = x.value) == null || o.removeEventListener("mousemove", N));
    }), (o, t) => {
      var s;
      return u(), v("div", {
        id: "vue3-canvas-video-player",
        ref_key: "containerRef",
        ref: x,
        "data-dark-mode": l.darkMode,
        "data-type": a.type
      }, [
        n("div", Re, [
          n("div", {
            class: S(["time", !e.range.enabled && "active"])
          }, [
            n("span", null, h(r(M)(e.main.currentTime)), 1),
            Ee,
            n("span", null, h(r(M)(e.main.duration)), 1),
            r(m) ? (u(), v("span", Be, [
              n("span", null, " [ " + h(r(z)(r(p)(e.main.currentTime))), 1),
              Fe,
              n("span", null, h(r(z)(r(p)(e.main.duration))) + " ]", 1)
            ])) : y("", !0)
          ], 2),
          r(d) ? (u(), v("div", {
            key: 0,
            class: S(["time", e.range.enabled && "active"])
          }, [
            n("span", null, h(r(M)(e.main.currentTime)), 1),
            He,
            n("span", null, h(r(M)(a.range[1])), 1),
            r(m) ? (u(), v("span", Le, [
              n("span", null, " [ " + h(r(z)(r(p)(e.main.currentTime))), 1),
              Pe,
              n("span", null, h(r(z)(r(p)(a.range[1]))) + " ]", 1)
            ])) : y("", !0)
          ], 2)) : y("", !0)
        ]),
        n("div", Ie, [
          n("video", {
            class: "video-hidden",
            ref_key: "mainVideoRef",
            ref: T,
            src: l.src,
            muted: l.muted,
            autoplay: l.autoplay,
            onLoadedmetadata: fe
          }, null, 40, Ne),
          n("canvas", {
            class: "canvas",
            ref_key: "mainCanvasRef",
            ref: F,
            onClick: j
          }, null, 512)
        ]),
        n("div", {
          class: S(["footer", e.mouse.move && "active"]),
          onMouseenter: t[10] || (t[10] = (i) => e.mouse.hold = !0),
          onMouseleave: t[11] || (t[11] = (i) => {
            e.mouse.hold = !1, N();
          })
        }, [
          n("div", De, [
            n("div", We, [
              n("div", {
                class: "area",
                onMousedown: t[0] || (t[0] = he((i) => {
                  e.mouse.down = !0, O(i);
                }, ["self"])),
                onMousemove: O,
                onMouseup: t[1] || (t[1] = (i) => e.mouse.down = !1),
                onMouseleave: t[2] || (t[2] = (i) => e.mouse.down = !1)
              }, [
                n("div", {
                  class: "bar",
                  style: B({ width: `${e.seek.width}%` })
                }, null, 4),
                r(d) ? (u(), v("div", {
                  key: 0,
                  class: "range",
                  style: B({ left: `${e.range.left}px`, width: `${e.range.width}px` })
                }, null, 4)) : y("", !0)
              ], 32)
            ]),
            a.preview ? (u(), v("div", {
              key: 0,
              class: "preview",
              style: B({ left: `${e.preview.left}px` })
            }, [
              n("video", {
                class: "video-hidden",
                ref_key: "previewVideoRef",
                ref: R,
                src: l.src
              }, null, 8, Ae),
              n("canvas", {
                class: "canvas",
                ref_key: "previewCanvasRef",
                ref: H
              }, null, 512),
              n("div", Oe, h(e.preview.time), 1)
            ], 4)) : y("", !0)
          ]),
          n("div", Ue, [
            n("button", {
              class: "control-button",
              title: e.main.paused ? "Play" : "Pause",
              onClick: j
            }, [
              e.main.paused ? (u(), v("svg", qe, Je)) : (u(), v("svg", Qe, et))
            ], 8, je),
            n("div", tt, [
              n("button", {
                class: "control-button",
                title: e.main.muted ? "Unmute" : "Mute",
                onClick: pe
              }, [
                e.main.muted ? (u(), v("svg", ot, lt)) : (u(), v("svg", dt, mt))
              ], 8, nt),
              n("div", ht, [
                n("div", {
                  class: "area",
                  onMousedown: t[3] || (t[3] = he((i) => {
                    e.mouse.down = !0, q(i);
                  }, ["self"])),
                  onMousemove: q,
                  onMouseup: t[4] || (t[4] = (i) => e.mouse.down = !1),
                  onMouseleave: t[5] || (t[5] = (i) => e.mouse.down = !1)
                }, [
                  n("div", {
                    class: "bar",
                    style: B({ height: `${e.main.volume * 100}%` })
                  }, null, 4)
                ], 32)
              ])
            ]),
            n("button", {
              class: "control-button",
              title: "Backward",
              onMousedown: t[6] || (t[6] = (i) => {
                e.mouse.down = !0, E(!1);
              }),
              onMouseup: t[7] || (t[7] = (i) => {
                e.mouse.down = !1, E(!1);
              })
            }, pt, 32),
            n("button", {
              class: "control-button",
              title: "Forward",
              onMousedown: t[8] || (t[8] = (i) => {
                e.mouse.down = !0, E(!0);
              }),
              onMouseup: t[9] || (t[9] = (i) => {
                e.mouse.down = !1, E(!0);
              })
            }, bt, 32),
            wt,
            n("div", _t, [
              n("div", yt, "x" + h(((s = e.main.playbackRate) == null ? void 0 : s.toFixed(1)) || "1.0"), 1),
              n("ul", xt, [
                (u(!0), v(Te, null, Ve([0.1, 0.5, 1, 1.5, 2, 5], (i) => (u(), v("li", kt, [
                  n("button", {
                    class: "button",
                    onClick: (b) => ge(i)
                  }, h(i.toFixed(1)), 9, Mt)
                ]))), 256))
              ])
            ]),
            r(d) ? (u(), v("button", {
              key: 0,
              class: "control-button",
              title: e.range.enabled ? "Reset range" : "Set range",
              onClick: we
            }, [
              e.range.enabled ? (u(), v("svg", Vt, St)) : (u(), v("svg", zt, Rt))
            ], 8, Tt)) : y("", !0),
            r(m) && r(f) ? (u(), v("button", {
              key: 1,
              class: S(["control-button", e.bbox.enabled && "active"]),
              title: e.bbox.enabled ? "Hide bounding box" : "Show bounding box",
              onClick: be
            }, Ft, 10, Et)) : y("", !0),
            n("button", {
              class: "control-button",
              title: e.main.fullScreen ? "Normal screen" : "Full screen",
              onClick: Z
            }, [
              e.main.fullScreen ? (u(), v("svg", Lt, It)) : (u(), v("svg", Nt, Wt))
            ], 8, Ht)
          ])
        ], 34),
        n("div", At, [
          n("div", {
            class: S(["text", e.message.visible ? "show" : "hide"]),
            innerHTML: e.message.text
          }, null, 10, Ot)
        ])
      ], 8, $e);
    };
  }
}, qt = /* @__PURE__ */ ze(Ut, [["__scopeId", "data-v-2625e36c"]]);
export {
  qt as default
};
