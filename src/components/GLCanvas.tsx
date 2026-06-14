"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/* Circuit-trace fragment shader: a silicon-style routing maze (straight
   truchet tiles) with junction pads and signal pulses traveling along the
   traces — reads as a GPU die / PCB under load. Mouse proximity makes
   nearby traces glow, like a thermal probe over the board. */
const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_bg;
uniform vec3 u_line;
uniform float u_lineAlpha;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float hash1(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  vec2 m = u_mouse;
  m.x *= u_res.x / u_res.y;
  float mGlow = exp(-length(p - m) * 2.6);

  // Routing grid — very slow drift keeps the board alive without distracting
  float S = 9.0;
  vec2 g = p * S + vec2(u_time * 0.04, 0.0);
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  // Each cell carries one straight trace, horizontal or vertical
  float horiz = step(hash(id), 0.5);
  float dLine = mix(abs(f.x), abs(f.y), horiz);
  float along = mix(f.y, f.x, horiz);

  // Sparser board: only ~70% of cells are routed
  float present = step(0.3, hash(id + 13.7));

  float w = 0.035;
  float trace = smoothstep(w, w * 0.4, dLine) * present;

  // Junction pads where a trace meets the cell boundary
  float pad = smoothstep(0.1, 0.055, length(vec2(dLine, abs(along) - 0.5))) * present;

  // Signal pulse traveling along ~12% of the traces
  float speed = 0.06 + 0.07 * hash1(hash(id) * 31.0);
  float sp = fract(u_time * speed + hash(id + 3.1));
  float spark = exp(-pow((along - (sp - 0.5)) * 9.0, 2.0)) * exp(-pow(dLine * 22.0, 2.0));
  spark *= step(0.88, hash(id + 5.2)) * present;

  // Coarse die-floorplan grid behind the routing
  vec2 q = fract(p * 2.2);
  float blockEdge = min(min(q.x, 1.0 - q.x), min(q.y, 1.0 - q.y));
  float blocks = smoothstep(0.008, 0.0, blockEdge);

  float intensity = trace * 0.5 + pad * 0.45 + blocks * 0.2;
  intensity *= u_lineAlpha * (1.0 + mGlow * 1.4);
  float sparkI = spark * u_lineAlpha * 3.4 * (1.0 + mGlow * 0.6);

  // Film grain
  float grain = (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.018;

  // Vignette toward edges, very gentle
  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5)));

  vec3 col = u_bg + grain;
  col = mix(col, u_line, clamp((intensity + sparkI) * vig, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type Props = {
  background?: string;
  lineColor?: string;
  lineAlpha?: number;
  className?: string;
};

export default function GLCanvas({
  background = "#F7F7F4",
  lineColor = "#18181c",
  lineAlpha = 0.16,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uBg = gl.getUniformLocation(prog, "u_bg");
    const uLine = gl.getUniformLocation(prog, "u_line");
    const uLineAlpha = gl.getUniformLocation(prog, "u_lineAlpha");

    gl.uniform3fv(uBg, hexToRgb(background));
    gl.uniform3fv(uLine, hexToRgb(lineColor));
    gl.uniform1f(uLineAlpha, lineAlpha);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse with spring-like smoothing
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    // Pause when offscreen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        if (!reduced) raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      // Note: never call WEBGL_lose_context here — React StrictMode re-runs
      // the effect on the same canvas, and a lost context stays lost.
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [background, lineColor, lineAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
