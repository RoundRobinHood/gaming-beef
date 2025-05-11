precision highp float;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Simplex 2D noise from Ashima Arts
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute(
              permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));

  vec3 x = fract(p * C.w) * 2.0 - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  vec2 g0 = vec2(a0.x, h.x);
  vec2 g1 = vec2(a0.y, h.y);
  vec2 g2 = vec2(a0.z, h.z);

  vec3 w = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  vec3 w4 = w * w * w * w;
  vec3 g;
  g.x = dot(g0, x0);
  g.y = dot(g1, x12.xy);
  g.z = dot(g2, x12.zw);
  return dot(w4, g) * 70.0;
}

uniform vec3 colorA;
uniform vec3 colorB;
uniform float time;

varying vec2 vUV;

uniform vec2 resolution;

uniform float angle;
uniform vec2 origin;

void main() {
  vec2 gridded = floor(vUV * resolution) / resolution;

  float noiseAngle = hash(gridded) * 6.2831853;
  vec2 noiseDir = vec2(cos(noiseAngle), sin(noiseAngle));
  float n = snoise(gridded * 5.0 + noiseDir * time * 0.001);

  vec2 gradientDir = vec2(cos(angle), sin(angle));
  // float t = (gridded.x + gridded.y) / sqrt(2.0) + n * 0.2;
  float t = dot(gridded - origin, gradientDir) + n * 0.2;

  vec3 col = mix(colorA, colorB, t);
  gl_FragColor = vec4(col, 1.0);
}
