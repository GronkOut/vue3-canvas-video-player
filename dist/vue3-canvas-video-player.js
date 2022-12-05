import { computed as A, ref as S, reactive as xe, onMounted as ke, onUnmounted as Me, openBlock as d, createElementBlock as r, createElementVNode as o, normalizeClass as z, toDisplayString as f, unref as w, createCommentVNode as _, withModifiers as me, normalizeStyle as B, Fragment as Te, renderList as Ve, pushScopeId as Ce, popScopeId as Se, createStaticVNode as $ } from "vue";
const ze = (u, a) => {
  const c = u.__vccOpts || u;
  for (const [m, M] of a)
    c[m] = M;
  return c;
}, l = (u) => (Ce("data-v-846c9f11"), u = u(), Se(), u), $e = ["data-dark-mode", "data-type"], Re = { class: "header" }, Ee = /* @__PURE__ */ l(() => /* @__PURE__ */ o("span", { style: { opacity: "0.5" } }, " / ", -1)), Be = { key: 0 }, Fe = /* @__PURE__ */ l(() => /* @__PURE__ */ o("span", { style: { opacity: "0.5" } }, " / ", -1)), He = /* @__PURE__ */ l(() => /* @__PURE__ */ o("span", { style: { opacity: "0.5" } }, " / ", -1)), Le = { key: 0 }, Pe = /* @__PURE__ */ l(() => /* @__PURE__ */ o("span", { style: { opacity: "0.5" } }, " / ", -1)), Ie = { class: "main" }, Ne = ["src", "muted", "autoplay"], De = { class: "seek" }, We = { class: "drag" }, Ae = ["src"], Oe = { class: "time" }, Ue = { class: "controller" }, je = ["title"], qe = {
  key: 0,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ge = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Ke = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M7 4v16l13 -8z" }, null, -1)), Je = [
  Ge,
  Ke
], Qe = {
  key: 1,
  class: "icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ye = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), Ze = /* @__PURE__ */ l(() => /* @__PURE__ */ o("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}, null, -1)), Xe = /* @__PURE__ */ l(() => /* @__PURE__ */ o("rect", {
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
}, at = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), st = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), it = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M16 10l4 4m0 -4l-4 4" }, null, -1)), lt = [
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
}, rt = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1)), ct = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M15 8a5 5 0 0 1 0 8" }, null, -1)), ut = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M17.7 5a9 9 0 0 1 0 14" }, null, -1)), vt = /* @__PURE__ */ l(() => /* @__PURE__ */ o("path", { d: "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, null, -1)), ft = [
  rt,
  ct,
  ut,
  vt
], mt = { class: "drag" }, ht = /* @__PURE__ */ l(() => /* @__PURE__ */ o("svg", {
  class: "icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ o("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ o("path", { d: "M20 5v14l-12 -7z" }),
  /* @__PURE__ */ o("line", {
    x1: "4",
    y1: "5",
    x2: "4",
    y2: "19"
  })
], -1)), pt = [
  ht
], gt = /* @__PURE__ */ l(() => /* @__PURE__ */ o("svg", {
  class: "icon",
  viewBox: "-1 -1 26 26",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, [
  /* @__PURE__ */ o("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ o("path", { d: "M4 5v14l12 -7z" }),
  /* @__PURE__ */ o("line", {
    x1: "20",
    y1: "5",
    x2: "20",
    y2: "19"
  })
], -1)), bt = [
  gt
], wt = /* @__PURE__ */ l(() => /* @__PURE__ */ o("div", { style: { flex: "1" } }, null, -1)), _t = { class: "playback-rate" }, yt = { class: "text" }, xt = { class: "list" }, kt = { class: "item" }, Mt = ["onClick"], Tt = ["title"], Vt = {
  key: 0,
  class: "icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Ct = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-846c9f11></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-846c9f11></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-846c9f11></path><path d="M9 6v-3h6v3" data-v-846c9f11></path><path d="M9 18v3h6v-3" data-v-846c9f11></path>', 5), St = [
  Ct
], zt = {
  key: 1,
  class: "icon",
  viewBox: "-4 -4 32 32",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, $t = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-846c9f11></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-846c9f11></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-846c9f11></path><path d="M3 6v-3h18v3" data-v-846c9f11></path><path d="M3 18v3h18v-3" data-v-846c9f11></path>', 5), Rt = [
  $t
], Et = ["title"], Bt = /* @__PURE__ */ $('<svg class="icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-846c9f11><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-846c9f11></path><circle cx="5" cy="5" r="2" data-v-846c9f11></circle><circle cx="19" cy="5" r="2" data-v-846c9f11></circle><circle cx="5" cy="19" r="2" data-v-846c9f11></circle><circle cx="19" cy="19" r="2" data-v-846c9f11></circle><line x1="5" y1="7" x2="5" y2="17" data-v-846c9f11></line><line x1="7" y1="5" x2="17" y2="5" data-v-846c9f11></line><line x1="7" y1="19" x2="17" y2="19" data-v-846c9f11></line><line x1="19" y1="7" x2="19" y2="17" data-v-846c9f11></line></svg>', 1), Ft = [
  Bt
], Ht = ["title"], Lt = {
  key: 0,
  class: "icon",
  viewBox: "0 0 24 24",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Pt = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-846c9f11></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-846c9f11></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-846c9f11></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-846c9f11></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-846c9f11></path>', 5), It = [
  Pt
], Nt = {
  key: 1,
  class: "icon",
  viewBox: "-2 -2 28 28",
  "stroke-width": "1",
  stroke: "#ffffff",
  fill: "none"
}, Dt = /* @__PURE__ */ $('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-846c9f11></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-846c9f11></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-846c9f11></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-846c9f11></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-846c9f11></path>', 5), Wt = [
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
  setup(u) {
    const a = u, c = A(() => a.range[0] > 0 && a.range[1] > 0), m = A(() => a.fps > 0), M = A(() => {
      var t;
      return ((t = a.bbox) == null ? void 0 : t.data) && Object.keys(a.bbox.data).length > 0;
    }), y = S(null), T = S(null), F = S(null), R = S(null), H = S(null), e = xe({
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
    }), he = () => {
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
        seek: { ...e.seek, total: y.value.offsetWidth },
        range: { ...e.range, enabled: c.value },
        bbox: { ...e.bbox, ...a.bbox, enabled: M.value },
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
          video: t,
          canvas: n,
          context: s,
          width: i,
          height: v,
          duration: k
        },
        preview: { video: b, canvas: ne, context: oe }
      } = e, ae = i * 0.3, se = v * 0.3;
      n.width = i, n.height = v, a.preview && (ne.width = ae, ne.height = se), c.value && (t.currentTime = a.range[0]);
      const ie = () => {
        const {
          range: { enabled: _e }
        } = e;
        s.drawImage(t, 0, 0, i, v), a.preview && (oe.imageSmoothingEnabled = !0, oe.drawImage(b, 0, 0, ae, se));
        const W = e.main.currentTime = t.currentTime;
        if (Q(), c.value && _e ? e.seek.width = ((W - a.range[0]) / (a.range[1] - a.range[0]) * 100).toFixed(10) : e.seek.width = (W / k * 100).toFixed(10), t.paused && Math.floor(e.seek.width) === 100 && (e.main.paused = !0), m && M && e.bbox.enabled) {
          const ye = h(W), g = e.bbox.data[ye];
          if (g && g.length === 4) {
            const ce = g[0], ue = g[1], ve = g[2] - g[0], fe = g[3] - g[1];
            s.fillStyle = e.bbox.fillColor, s.fillRect(ce, ue, ve, fe), e.bbox.borderSize && (s.lineWidth = e.bbox.borderSize, s.strokeStyle = e.bbox.borderColor, s.strokeRect(ce - e.bbox.borderSize / 2, ue - e.bbox.borderSize / 2, ve + e.bbox.borderSize, fe + e.bbox.borderSize));
          }
        }
        window.requestAnimationFrame(ie);
      };
      ie(), window.dispatchEvent(new Event("resize"));
    }, x = (t) => {
      const n = parseInt(t), s = Math.floor(n / 3600), i = Math.floor(n % 3600 / 60), v = n % 60;
      return `${s < 10 ? "0" + s : s}:${i < 10 ? "0" + i : i}:${v < 10 ? "0" + v : v}`;
    }, h = (t) => Math.round(t * a.fps), L = (t) => t / a.fps, V = (t) => t === void 0 ? !1 : new Intl.NumberFormat().format(t);
    let P;
    const p = (t) => {
      if (!a.messageTime)
        return;
      const { message: n } = e;
      n.text = t, n.visible = !0, P && clearTimeout(P), P = setTimeout(() => {
        n.visible = !1;
      }, a.messageTime);
    }, O = ({ offsetX: t }) => {
      const {
        main: { duration: n },
        seek: { total: s },
        preview: { video: i },
        range: { enabled: v },
        mouse: { down: k }
      } = e, b = v ? t / s * (a.range[1] - a.range[0]) + a.range[0] : t / s * n;
      k && C(b), a.preview && (i.currentTime = b, e.preview.time = x(b), t < 65 ? e.preview.left = 65 : t > s - 65 ? e.preview.left = s - 65 : e.preview.left = t);
    };
    let U;
    const j = ({ detail: t }) => {
      if (t === 1) {
        const {
          main: { video: n, paused: s },
          range: { enabled: i }
        } = e;
        U = setTimeout(() => {
          s ? (c.value && i && n.currentTime === a.range[1] && (n.currentTime = a.range[0]), n.play()) : n.pause(), p(s ? "Play" : "Pause"), e.main.paused = !s;
        }, 250);
      } else
        t === 2 && (clearTimeout(U), Z());
    }, I = (t) => {
      const {
        main: { video: n }
      } = e, s = Math.max(Math.min(t, 1), 0);
      n.volume = e.main.volume = s, p(`Volume ${Math.floor(s * 100)}%`);
    }, q = ({ offsetY: t }) => {
      const {
        mouse: { down: n }
      } = e;
      n && I((100 - t) / 100);
    }, pe = () => {
      const {
        main: { video: t, muted: n }
      } = e;
      t.muted = e.main.muted = !n, p(n ? "Unmuted" : "Muted");
    }, C = (t) => {
      const {
        main: { video: n, duration: s },
        range: { enabled: i }
      } = e;
      n.currentTime = c.value && i ? Math.max(Math.min(t, a.range[1]), a.range[0]) : Math.max(Math.min(t, s), 0), p(`Seek ${x(n.currentTime)} ${m.value ? `[${V(h(n.currentTime))}]` : ""} (${c.value && i ? Math.round((n.currentTime - a.range[0]) / (a.range[1] - a.range[0]) * 100) : Math.round(n.currentTime / s * 100)}%)`);
    }, G = () => {
      const {
        main: { video: t }
      } = e;
      m.value ? C(L(h(t.currentTime) + 1)) : C(t.currentTime + 1);
    }, K = () => {
      const {
        main: { video: t }
      } = e;
      m.value ? C(L(h(t.currentTime) - 1)) : C(t.currentTime - 1);
    };
    let J;
    const E = (t) => {
      const {
        mouse: { down: n }
      } = e;
      n ? J = setInterval(() => {
        t ? G() : K();
      }, 60) : clearInterval(J);
    }, ge = (t) => {
      const {
        main: { video: n }
      } = e;
      n.playbackRate = e.main.playbackRate = t, p(`Playback Rate x${t.toFixed(1)}`);
    }, be = () => {
      const {
        bbox: { enabled: t }
      } = e;
      e.bbox.enabled = !t, p(t ? "Hide bounding box" : "Show bounding box");
    }, Q = () => {
      const {
        main: { video: t },
        range: { enabled: n }
      } = e;
      !(c.value && n) || (t.currentTime < a.range[0] && (t.currentTime = a.range[0]), t.currentTime > a.range[1] && (t.currentTime = a.range[1], t.pause(), e.main.paused = !0));
    }, Y = () => {
      const {
        main: { duration: t },
        seek: { total: n },
        range: { enabled: s }
      } = e;
      Q(), e.range.left = c.value && s ? 0 : a.range[0] / t * n, e.range.width = c.value && s ? n : a.range[1] / t * n - a.range[0] / t * n;
    }, we = () => {
      const {
        range: { enabled: t }
      } = e;
      e.range.enabled = !t, Y(), p(t ? "Inactive range" : "Active range");
    }, Z = () => {
      document.fullscreenElement ? document.exitFullscreen() : y.value.requestFullscreen();
    }, X = () => {
      e.seek.total = y.value.offsetWidth, c.value && Y(), a.preview && (e.preview.left = 0);
    }, ee = ({ altKey: t, ctrlKey: n, key: s }) => {
      const {
        main: { video: i, paused: v, volume: k }
      } = e;
      if (t && n) {
        if (s === "g" && m.value) {
          const b = window.prompt("Go to frame number", h(i.currentTime));
          v && i.pause(), i.currentTime = L(b);
        }
        s === "ArrowUp" && I(k + 0.05), s === "ArrowDown" && I(k - 0.05), s === "ArrowLeft" && K(), s === "ArrowRight" && G();
      }
    }, te = () => {
      e.main.fullScreen = Boolean(document.fullscreenElement), p(`${e.main.fullScreen ? "Full" : "Normal"} screen`);
    };
    let N;
    const D = () => {
      N && clearTimeout(N), e.mouse.move = !0, !e.mouse.hold && (N = setTimeout(() => {
        e.mouse.move = !1;
      }, 1e3));
    };
    return ke(() => {
      window.addEventListener("resize", X), window.addEventListener("keydown", ee), document.addEventListener("fullscreenchange", te), a.type === "overlay" && y.value.addEventListener("mousemove", D);
    }), Me(() => {
      var t;
      window.removeEventListener("resize", X), window.removeEventListener("keydown", ee), document.removeEventListener("fullscreenchange", te), a.type === "overlay" && ((t = y.value) == null || t.removeEventListener("mousemove", D));
    }), (t, n) => {
      var s;
      return d(), r("div", {
        id: "video-frame-canvas-player",
        ref_key: "containerRef",
        ref: y,
        "data-dark-mode": u.darkMode,
        "data-type": a.type
      }, [
        o("div", Re, [
          o("div", {
            class: z(["time", !e.range.enabled && "active"])
          }, [
            o("span", null, f(x(e.main.currentTime)), 1),
            Ee,
            o("span", null, f(x(e.main.duration)), 1),
            w(m) ? (d(), r("span", Be, [
              o("span", null, " [ " + f(V(h(e.main.currentTime))), 1),
              Fe,
              o("span", null, f(V(h(e.main.duration))) + " ]", 1)
            ])) : _("", !0)
          ], 2),
          w(c) ? (d(), r("div", {
            key: 0,
            class: z(["time", e.range.enabled && "active"])
          }, [
            o("span", null, f(x(e.main.currentTime)), 1),
            He,
            o("span", null, f(x(a.range[1])), 1),
            w(m) ? (d(), r("span", Le, [
              o("span", null, " [ " + f(V(h(e.main.currentTime))), 1),
              Pe,
              o("span", null, f(V(h(a.range[1]))) + " ]", 1)
            ])) : _("", !0)
          ], 2)) : _("", !0)
        ]),
        o("div", Ie, [
          o("video", {
            class: "video-hidden",
            ref_key: "mainVideoRef",
            ref: T,
            src: u.src,
            muted: u.muted,
            autoplay: u.autoplay,
            onLoadedmetadata: he
          }, null, 40, Ne),
          o("canvas", {
            class: "canvas",
            ref_key: "mainCanvasRef",
            ref: F,
            onClick: j
          }, null, 512)
        ]),
        o("div", {
          class: z(["footer", e.mouse.move && "active"]),
          onMouseenter: n[10] || (n[10] = (i) => e.mouse.hold = !0),
          onMouseleave: n[11] || (n[11] = (i) => {
            e.mouse.hold = !1, D();
          })
        }, [
          o("div", De, [
            o("div", We, [
              o("div", {
                class: "area",
                onMousedown: n[0] || (n[0] = me((i) => {
                  e.mouse.down = !0, O(i);
                }, ["self"])),
                onMousemove: O,
                onMouseup: n[1] || (n[1] = (i) => e.mouse.down = !1),
                onMouseleave: n[2] || (n[2] = (i) => e.mouse.down = !1)
              }, [
                o("div", {
                  class: "bar",
                  style: B({ width: `${e.seek.width}%` })
                }, null, 4),
                w(c) ? (d(), r("div", {
                  key: 0,
                  class: "range",
                  style: B({ left: `${e.range.left}px`, width: `${e.range.width}px` })
                }, null, 4)) : _("", !0)
              ], 32)
            ]),
            a.preview ? (d(), r("div", {
              key: 0,
              class: "preview",
              style: B({ left: `${e.preview.left}px` })
            }, [
              o("video", {
                class: "video-hidden",
                ref_key: "previewVideoRef",
                ref: R,
                src: u.src
              }, null, 8, Ae),
              o("canvas", {
                class: "canvas",
                ref_key: "previewCanvasRef",
                ref: H
              }, null, 512),
              o("div", Oe, f(e.preview.time), 1)
            ], 4)) : _("", !0)
          ]),
          o("div", Ue, [
            o("button", {
              class: "control-button",
              title: e.main.paused ? "Play" : "Pause",
              onClick: j
            }, [
              e.main.paused ? (d(), r("svg", qe, Je)) : (d(), r("svg", Qe, et))
            ], 8, je),
            o("div", tt, [
              o("button", {
                class: "control-button",
                title: e.main.muted ? "Unmute" : "Mute",
                onClick: pe
              }, [
                e.main.muted ? (d(), r("svg", ot, lt)) : (d(), r("svg", dt, ft))
              ], 8, nt),
              o("div", mt, [
                o("div", {
                  class: "area",
                  onMousedown: n[3] || (n[3] = me((i) => {
                    e.mouse.down = !0, q(i);
                  }, ["self"])),
                  onMousemove: q,
                  onMouseup: n[4] || (n[4] = (i) => e.mouse.down = !1),
                  onMouseleave: n[5] || (n[5] = (i) => e.mouse.down = !1)
                }, [
                  o("div", {
                    class: "bar",
                    style: B({ height: `${e.main.volume * 100}%` })
                  }, null, 4)
                ], 32)
              ])
            ]),
            o("button", {
              class: "control-button",
              title: "Backward",
              onMousedown: n[6] || (n[6] = (i) => {
                e.mouse.down = !0, E(!1);
              }),
              onMouseup: n[7] || (n[7] = (i) => {
                e.mouse.down = !1, E(!1);
              })
            }, pt, 32),
            o("button", {
              class: "control-button",
              title: "Forward",
              onMousedown: n[8] || (n[8] = (i) => {
                e.mouse.down = !0, E(!0);
              }),
              onMouseup: n[9] || (n[9] = (i) => {
                e.mouse.down = !1, E(!0);
              })
            }, bt, 32),
            wt,
            o("div", _t, [
              o("div", yt, "x" + f(((s = e.main.playbackRate) == null ? void 0 : s.toFixed(1)) || "1.0"), 1),
              o("ul", xt, [
                (d(!0), r(Te, null, Ve([0.1, 0.5, 1, 1.5, 2, 5], (i) => (d(), r("li", kt, [
                  o("button", {
                    class: "button",
                    onClick: (v) => ge(i)
                  }, f(i.toFixed(1)), 9, Mt)
                ]))), 256))
              ])
            ]),
            w(c) ? (d(), r("button", {
              key: 0,
              class: "control-button",
              title: e.range.enabled ? "Reset range" : "Set range",
              onClick: we
            }, [
              e.range.enabled ? (d(), r("svg", Vt, St)) : (d(), r("svg", zt, Rt))
            ], 8, Tt)) : _("", !0),
            w(m) && w(M) ? (d(), r("button", {
              key: 1,
              class: z(["control-button", e.bbox.enabled && "active"]),
              title: e.bbox.enabled ? "Hide bounding box" : "Show bounding box",
              onClick: be
            }, Ft, 10, Et)) : _("", !0),
            o("button", {
              class: "control-button",
              title: e.main.fullScreen ? "Normal screen" : "Full screen",
              onClick: Z
            }, [
              e.main.fullScreen ? (d(), r("svg", Lt, It)) : (d(), r("svg", Nt, Wt))
            ], 8, Ht)
          ])
        ], 34),
        o("div", At, [
          o("div", {
            class: z(["text", e.message.visible ? "show" : "hide"]),
            innerHTML: e.message.text
          }, null, 10, Ot)
        ])
      ], 8, $e);
    };
  }
}, qt = /* @__PURE__ */ ze(Ut, [["__scopeId", "data-v-846c9f11"]]);
export {
  qt as default
};
