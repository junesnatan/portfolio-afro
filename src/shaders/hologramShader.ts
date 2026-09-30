import * as THREE from 'three';

// Custom Holographic Shader Material with scanlines, Fresnel glow, and time oscillation
export const createHologramMaterial = (color: string = '#00f0ff', opacity: number = 0.75) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        // Fresnel rim effect
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);

        // Scanline bands oscillating with time
        float scanline = sin(vPosition.y * 35.0 - uTime * 6.0) * 0.5 + 0.5;
        scanline = pow(scanline, 2.0) * 0.4 + 0.6;

        // Subtle horizontal noise bar
        float glitch = step(0.97, sin(vPosition.y * 5.0 + uTime * 2.0));
        
        vec3 finalColor = uColor * (0.8 + fresnel * 1.5 + glitch * 0.5);
        float alpha = (fresnel * 0.7 + scanline * 0.3 + 0.1) * uOpacity;

        gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
};
