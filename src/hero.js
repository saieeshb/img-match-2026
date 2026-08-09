/* ============================================================
   Hero particle field.

   One particle per consented applicant in the report: 4,429 who
   matched and 4,541 who did not. The field breathes between a single
   mixed cloud and two separated masses, which is the argument the
   page goes on to make in numbers.
   ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("heroCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  var N_MATCHED = 4429, N_UNMATCHED = 4541, N = N_MATCHED + N_UNMATCHED;

  /* Cohort colours come from the theme rather than being baked in, so the field
     flips with the page. Light needs more opacity: the same alpha that reads as
     a dot on near-black washes out to nothing on cream. */
  function isLight() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }
  function cohortColors() {
    var cs = getComputedStyle(document.documentElement);
    var m = (cs.getPropertyValue("--matched") || "").trim() || "#5c9dff";
    var u = (cs.getPropertyValue("--unmatched") || "").trim() || "#f0a92e";
    return [new THREE.Color(m), new THREE.Color(u)];
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true });
  } catch (e) {
    canvas.style.display = "none";      /* no WebGL: the hero still reads fine */
    return;
  }
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.z = 17.5;

  /* Fibonacci sphere: even coverage without the pole clustering of naive
     lat/long sampling. */
  function fib(i, n, radius, out, o) {
    var y = 1 - (i / (n - 1)) * 2;
    var r = Math.sqrt(Math.max(0, 1 - y * y));
    var th = i * 2.399963229728653;                 /* golden angle */
    out[o]     = Math.cos(th) * r * radius;
    out[o + 1] = y * radius;
    out[o + 2] = Math.sin(th) * r * radius;
  }

  /* cohort flags, shuffled so the mixed state really is mixed */
  var flags = new Uint8Array(N);
  for (var i = 0; i < N_MATCHED; i++) flags[i] = 1;
  for (var i = N - 1; i > 0; i--) {
    var j = (Math.random() * (i + 1)) | 0;
    var t = flags[i]; flags[i] = flags[j]; flags[j] = t;
  }

  var posA   = new Float32Array(N * 3);
  var posB   = new Float32Array(N * 3);
  var colors = new Float32Array(N * 3);
  var sizes  = new Float32Array(N);
  var phase  = new Float32Array(N);

  var SPLIT = 6.4, R_ONE = 7.8, R_TWO = 4.9;
  var mi = 0, ui = 0;

  for (var i = 0; i < N; i++) {
    var o = i * 3;
    fib(i, N, R_ONE, posA, o);

    var isMatched = flags[i] === 1;
    if (isMatched) { fib(mi++, N_MATCHED,   R_TWO, posB, o); posB[o] -= SPLIT; }
    else           { fib(ui++, N_UNMATCHED, R_TWO, posB, o); posB[o] += SPLIT; }

    sizes[i] = 0.7 + Math.random() * 1.25;
    phase[i] = Math.random() * Math.PI * 2;
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(posA, 3));
  geo.setAttribute("posB",     new THREE.BufferAttribute(posB, 3));
  geo.setAttribute("aColor",   new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aPhase",   new THREE.BufferAttribute(phase, 1));

  var uniforms = {
    uMix:   { value: 0 },
    uTime:  { value: 0 },
    uDpr:   { value: 1 },
    uFade:  { value: 1 },
    uAlpha: { value: 1 }
  };

  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    vertexShader: [
      "attribute vec3 posB;",
      "attribute vec3 aColor;",
      "attribute float aSize;",
      "attribute float aPhase;",
      "uniform float uMix; uniform float uTime; uniform float uDpr;",
      "varying vec3 vColor; varying float vDepth;",
      "void main(){",
      "  vec3 p = mix(position, posB, uMix);",
      "  p.x += sin(uTime * 0.45 + aPhase) * 0.11;",
      "  p.y += cos(uTime * 0.38 + aPhase * 1.7) * 0.11;",
      "  p.z += sin(uTime * 0.32 + aPhase * 0.9) * 0.11;",
      "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
      "  gl_Position = projectionMatrix * mv;",
      "  gl_PointSize = aSize * uDpr * (118.0 / max(0.001, -mv.z));",
      "  vColor = aColor;",
      "  vDepth = clamp((-mv.z - 6.0) / 22.0, 0.0, 1.0);",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform float uFade; uniform float uAlpha;",
      "varying vec3 vColor; varying float vDepth;",
      "void main(){",
      "  vec2 c = gl_PointCoord - vec2(0.5);",
      "  float d = length(c);",
      "  if (d > 0.5) discard;",
      "  float a = smoothstep(0.5, 0.30, d);",
      "  a *= mix(0.58, 0.13, vDepth) * uFade * uAlpha;",
      "  gl_FragColor = vec4(vColor, a);",
      "}"
    ].join("\n")
  });

  /* Fills the colour buffer from the active theme. Exposed so the theme toggle
     can recolour the field in place instead of rebuilding the geometry. */
  function paintCohorts() {
    var c = cohortColors();
    for (var k = 0; k < N; k++) {
      var col = flags[k] === 1 ? c[0] : c[1];
      var q = k * 3;
      colors[q] = col.r; colors[q + 1] = col.g; colors[q + 2] = col.b;
    }
    geo.attributes.aColor.needsUpdate = true;
    /* saturated dots on cream already read strongly; denser would fight the text */
    uniforms.uAlpha.value = isLight() ? 0.92 : 1;
  }
  paintCohorts();
  window.__heroRepaint = paintCohorts;

  var points = new THREE.Points(geo, mat);
  scene.add(points);

  /* ---------- sizing ---------- */
  function resize() {
    var w = canvas.clientWidth || canvas.parentNode.offsetWidth;
    var h = canvas.clientHeight || canvas.parentNode.offsetHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    /* pull back on narrow screens so the field still fits the frame */
    camera.position.z = w < 700 ? 24.0 : 17.5;
    camera.updateProjectionMatrix();
    uniforms.uDpr.value = dpr;
  }
  window.addEventListener("resize", resize);
  /* A page that loads in a background tab lays out at zero width, where resize()
     bails. These two catch the moment it actually gains a size. */
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) resize();
  });
  resize();

  /* ---------- interaction ---------- */
  var targetX = 0, targetY = 0, curX = 0, curY = 0, pointerSeen = false;

  function aim(cx, cy) {
    var r = canvas.getBoundingClientRect();
    targetX = ((cx - r.left) / r.width - 0.5) * 2;
    targetY = ((cy - r.top) / r.height - 0.5) * 2;
    pointerSeen = true;
  }
  window.addEventListener("mousemove", function (e) { aim(e.clientX, e.clientY); });
  canvas.addEventListener("touchmove", function (e) {
    if (e.touches[0]) aim(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  /* clicking commits to the split, so the separation is reachable on demand */
  var held = null;
  var hero = canvas.parentNode;
  hero.addEventListener("click", function (e) {
    if (e.target.closest("a,button,input,select")) return;
    held = held === null ? 1 : null;
  });

  /* stop drawing when the hero is off screen */
  var visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; },
      { threshold: 0 }).observe(canvas);
  }

  /* ---------- loop ---------- */
  var t0 = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;

    var t = (now - t0) / 1000;
    uniforms.uTime.value = reduceMotion ? 0 : t;

    /* 0 = one mixed cloud, 1 = two separated masses */
    var target;
    if (held !== null) target = held;
    else if (reduceMotion) target = 0.55;
    else target = 0.5 - 0.5 * Math.cos(t * 0.30);          /* ~21s round trip */
    uniforms.uMix.value += (target - uniforms.uMix.value) * 0.035;

    curX += (targetX - curX) * 0.045;
    curY += (targetY - curY) * 0.045;
    points.rotation.y = (reduceMotion ? 0 : Math.sin(t * 0.11) * 0.42) + curX * 0.55;
    points.rotation.x = curY * 0.32;

    /* idle drift keeps it alive before the pointer ever moves */
    if (!pointerSeen && !reduceMotion) points.rotation.x += Math.sin(t * 0.22) * 0.05;

    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.classList.add("ready"); }
  }
  var shown = false;
  requestAnimationFrame(frame);
})();
