import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js";

const host = document.querySelector(".site-cube-scene");
const canvases = Array.from(host?.querySelectorAll("canvas") || []);

if (host && canvases.length) {
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const clock = new THREE.Clock();
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry, 25);

  const palettes = {
    lime: {
      color: "#a3e635",
      edge: "#a3e635",
    },
    indigo: {
      color: "#4f46e5",
      edge: "#4f46e5",
    },
  };

  const layerConfigs = {
    back: {
      cameraZ: 11,
      scale: 0.76,
      scrollFactor: 0.52,
      pointerFactor: 0.18,
      spinFactor: 0.42,
      cubes: [
        ["indigo", 1.46, 0.82, -7.8, 0.42, 0.58],
        ["lime", 0.9, 1.7, -8.1, 0.72, 0.24],
        ["indigo", -0.68, 2.42, -7.2, 0.54, 0.82],
        ["lime", 0.72, 3.18, -8.4, 0.62, 0.42],
        ["indigo", -0.88, 4.08, -7.7, 0.5, 0.1],
        ["lime", 0.18, 4.84, -8.1, 0.66, 0.7],
        ["indigo", 0.84, 5.62, -7.5, 0.52, 0.34],
      ],
    },
    middle: {
      cameraZ: 9.2,
      scale: 1,
      scrollFactor: 0.86,
      pointerFactor: 0.34,
      spinFactor: 0.78,
      cubes: [
        ["lime", 0.73, 0.08, -4.2, 0.92, 0.14],
        ["indigo", -0.76, 0.88, -4.8, 0.78, 0.68],
        ["lime", 0.54, 1.52, -4.1, 1.08, 0.34],
        ["indigo", -0.42, 2.16, -5.1, 0.64, 0.92],
        ["lime", -0.83, 2.92, -4.3, 0.88, 0.2],
        ["indigo", 0.82, 3.58, -4.8, 0.76, 0.74],
        ["lime", -0.16, 4.28, -4.2, 0.98, 0.48],
        ["indigo", -0.78, 5.12, -5.1, 0.68, 0.04],
        ["indigo", -0.28, 4.82, -4.7, 0.78, 0.26],
      ],
    },
    front: {
      cameraZ: 7.2,
      scale: 1.28,
      scrollFactor: 1.22,
      pointerFactor: 0.56,
      spinFactor: 1.05,
      cubes: [
        ["lime", 1.06, 0.46, -2.5, 1.38, 0.28],
        ["indigo", -1.28, 1.34, -2.6, 1.08, 0.78],
        ["lime", 1.12, 2.46, -2.3, 1.52, 0.08],
        ["indigo", -1.14, 3.42, -2.8, 1.28, 0.54],
        ["lime", 1.04, 4.44, -2.4, 1.42, 0.9],
        ["indigo", -1.02, 5.38, -2.7, 1.16, 0.38],
        ["lime", 1.22, 8, -2.35, 0.95, 0.72],
        ["indigo", -0.42, 7.08, -2.6, 0.72, 0.16],
      ],
    },
    overlay: {
      cameraZ: 8.4,
      scale: 0.66,
      scrollFactor: 1,
      pointerFactor: 0.42,
      spinFactor: 0.72,
      cubes: [
        ["lime", 0.9, 0.42, -3.25, 0.4, 0.11],
        ["indigo", -1.12, 1.28, -3.45, 0.34, 0.44],
        ["lime", 1.16, 2.3, -3.35, 0.36, 0.7],
        ["indigo", -1.18, 3.36, -3.2, 0.36, 0.22],
        ["lime", 1.18, 4.48, -3.3, 0.32, 0.86],
        ["indigo", 0.86, 6.16, -3.25, 0.34, 0.52],
      ],
    },
  };

  const layers = canvases
    .map((canvas) => {
      const name = canvas.dataset.cubeLayer;
      const config = layerConfigs[name];

      if (!config) {
        return null;
      }

      let renderer;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return null;
      }

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0xffffff, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      const group = new THREE.Group();

      scene.add(group);
      scene.add(new THREE.AmbientLight(0xffffff, 1.6));

      const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
      keyLight.position.set(-4.5, 6.5, 7);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xbaff25, 1.2);
      rimLight.position.set(5, -2, 4);
      scene.add(rimLight);

      const cubes = config.cubes.map((spec, index) =>
        createCube({
          paletteName: spec[0],
          xRatio: spec[1],
          pageY: spec[2],
          z: spec[3],
          size: spec[4],
          phase: spec[5],
          index,
        })
      );

      cubes.forEach((cube) => group.add(cube));

      return {
        name,
        canvas,
        renderer,
        scene,
        camera,
        group,
        cubes,
        config,
        world: { width: 1, height: 1 },
      };
    })
    .filter(Boolean);

  let viewportWidth = 1;
  let viewportHeight = 1;
  let scrollY = window.scrollY;
  let animationFrameId = null;

  if (!layers.length) {
    host.hidden = true;
  } else {
    resize();
    updateScroll();
    animate();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", render);
    } else {
      reducedMotionQuery.addListener(render);
    }

    window.addEventListener(
      "pagehide",
      () => {
        window.cancelAnimationFrame(animationFrameId);
      },
      { once: true }
    );
  }

  function cubeMaterial(paletteName) {
    const palette = palettes[paletteName];

    return new THREE.MeshStandardMaterial({
      color: palette.color,
      roughness: 0.34,
      metalness: 0.08,
    });
  }

  function createCube({ paletteName, xRatio, pageY, z, size, phase, index }) {
    const palette = palettes[paletteName];
    const cube = new THREE.Group();
    const body = new THREE.Mesh(cubeGeometry, cubeMaterial(paletteName));
    const edges = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({ color: palette.edge })
    );

    cube.add(body, edges);
    cube.scale.setScalar(size);
    cube.rotation.set(
      -0.24 + phase * 0.46,
      0.42 + phase * 0.62,
      -0.16 + phase * 0.34
    );
    cube.userData = {
      xRatio,
      pageY,
      z,
      size,
      phase,
      spinX: (0.0012 + index * 0.00018) * (index % 2 ? -1 : 1),
      spinY: (0.0016 + index * 0.00016) * (index % 3 ? 1 : -1),
    };

    return cube;
  }

  function resize() {
    viewportWidth = Math.max(window.innerWidth, 1);
    viewportHeight = Math.max(window.innerHeight, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.7);
    const mobileScale =
      viewportWidth < 700 ? 0.34 : viewportWidth < 1100 ? 0.88 : 1;

    layers.forEach((layer) => {
      layer.renderer.setPixelRatio(pixelRatio);
      layer.renderer.setSize(viewportWidth, viewportHeight, false);

      layer.camera.aspect = viewportWidth / viewportHeight;
      layer.camera.position.set(0, 0, layer.config.cameraZ);
      layer.camera.updateProjectionMatrix();

      layer.world.height =
        2 *
        Math.tan(THREE.MathUtils.degToRad(layer.camera.fov / 2)) *
        layer.camera.position.z;
      layer.world.width = layer.world.height * layer.camera.aspect;
      layer.group.scale.setScalar(layer.config.scale * mobileScale);
    });

    render();
  }

  function updateScroll() {
    scrollY = window.scrollY;
  }

  function updatePointer(event) {
    pointer.targetX = (event.clientX / viewportWidth - 0.5) * 2;
    pointer.targetY = (event.clientY / viewportHeight - 0.5) * 2;
  }

  function animate() {
    animationFrameId = window.requestAnimationFrame(animate);
    render();
  }

  function render() {
    const elapsed = clock.getElapsedTime();
    const reduceMotion = reducedMotionQuery.matches;
    const easing = reduceMotion ? 1 : 0.08;
    const scrollScreens = scrollY / viewportHeight;

    pointer.x += (pointer.targetX - pointer.x) * easing;
    pointer.y += (pointer.targetY - pointer.y) * easing;

    layers.forEach((layer) => {
      const { camera, renderer, scene, cubes, config, world } = layer;
      const scrollCameraShift = scrollScreens * config.scrollFactor * 0.28;

      camera.position.x = pointer.x * config.pointerFactor;
      camera.position.y = -pointer.y * config.pointerFactor * 0.38;
      camera.lookAt(0, scrollCameraShift, -3);

      cubes.forEach((cube) => {
        const { xRatio, pageY, z, phase, spinX, spinY } = cube.userData;
        const pushedXRatio =
          viewportWidth < 700
            ? Math.sign(xRatio || 1) *
              Math.min(Math.abs(xRatio) + 2.15, 3.4)
            : xRatio;
        const mobileHeroLift =
          viewportWidth < 700 && scrollScreens < 0.75 && pageY < 0.7
            ? 1.25
            : 0;
        const parallaxY =
          (pageY - scrollScreens * config.scrollFactor) * world.height;
        const drift = reduceMotion
          ? 0
          : Math.sin(elapsed * 0.5 + phase * 7) * 0.18;

        cube.position.x =
          pushedXRatio * world.width * 0.5 +
          pointer.x * config.pointerFactor * (2.2 + Math.abs(z) * 0.12);
        cube.position.y =
          parallaxY +
          drift +
          mobileHeroLift -
          pointer.y * config.pointerFactor;
        cube.position.z = z;

        if (!reduceMotion) {
          cube.rotation.x += spinX * config.spinFactor;
          cube.rotation.y += spinY * config.spinFactor;
        }
      });

      renderer.render(scene, camera);
    });
  }

}
