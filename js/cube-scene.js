import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js";

const host = document.querySelector(".site-cube-scene");
const canvases = Array.from(host?.querySelectorAll("canvas") || []);

if (host && canvases.length) {
  const BREAKPOINTS = {
    mobile: 768,
    tablet: 1100,
  };
  const THEME_COLORS = {
    lime: "#a3e635",
    indigo: "#4f46e5",
  };
  const cubeSpec = (paletteName, xRatio, pageY, z, size, phase) => ({
    paletteName,
    xRatio,
    pageY,
    z,
    size,
    phase,
  });
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const clock = new THREE.Clock();
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry, 25);

  const palettes = {
    lime: {
      color: THEME_COLORS.lime,
      edge: THEME_COLORS.lime,
    },
    indigo: {
      color: THEME_COLORS.indigo,
      edge: THEME_COLORS.indigo,
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
        cubeSpec("lime", 0.92, 1.4, -8.1, 0.88, 0.24),
        cubeSpec("indigo", -0.72, 2.9, -7.4, 0.64, 0.82),
        cubeSpec("lime", 0.7, 4.4, -8.2, 0.76, 0.42),
        cubeSpec("indigo", 0.88, 6, -7.6, 0.62, 0.34),
      ],
    },
    middle: {
      cameraZ: 9.2,
      scale: 1,
      scrollFactor: 0.86,
      pointerFactor: 0.34,
      spinFactor: 0.78,
      cubes: [
        cubeSpec("lime", 0.78, 0.18, -4.2, 1.12, 0.14),
        cubeSpec("indigo", -0.92, 0.62, -4.6, 0.82, 0.56),
        cubeSpec("indigo", -0.82, 1.7, -4.8, 0.96, 0.68),
        cubeSpec("lime", -0.88, 3.2, -4.4, 1.08, 0.2),
        cubeSpec("indigo", 0.86, 4.65, -4.8, 0.92, 0.74),
        cubeSpec("lime", -0.34, 5.95, -4.4, 1.02, 0.48),
      ],
    },
    front: {
      cameraZ: 7.2,
      scale: 1.28,
      scrollFactor: 1.22,
      pointerFactor: 0.56,
      spinFactor: 1.05,
      cubes: [
        cubeSpec("lime", 1.14, 0.52, -2.5, 1.58, 0.28),
        cubeSpec("indigo", -1.26, 2.35, -2.6, 1.34, 0.78),
        cubeSpec("lime", 1.18, 4.45, -2.35, 1.62, 0.9),
        cubeSpec("indigo", -1.04, 5.85, -2.7, 1.38, 0.38),
        cubeSpec("lime", 1.24, 8, -2.35, 1.18, 0.72),
      ],
    },
    overlay: {
      cameraZ: 8.4,
      scale: 0.66,
      scrollFactor: 1,
      pointerFactor: 0.42,
      spinFactor: 0.72,
      cubes: [
        cubeSpec("lime", 0.94, 0.42, -3.25, 0.48, 0.11),
        cubeSpec("indigo", -1.18, 3.36, -3.2, 0.44, 0.22),
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
        createCube({ ...spec, index })
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
        isVisible: true,
        world: { width: 1, height: 1 },
      };
    })
    .filter(Boolean);

  let viewportWidth = 1;
  let viewportHeight = 1;
  let scrollY = window.scrollY;
  let animationFrameId = null;
  let isPageVisible = !document.hidden;

  if (!layers.length) {
    host.hidden = true;
  } else {
    resize();
    updateScroll();
    animate();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });

    if (finePointerQuery.matches) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
    }

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", render);
    } else {
      reducedMotionQuery.addListener(render);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener(
      "pagehide",
      () => {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
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
      paletteName,
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
    const responsiveScale = getResponsiveScale(viewportWidth);

    layers.forEach((layer) => {
      layer.isVisible =
        window.getComputedStyle(layer.canvas).display !== "none";
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
      layer.group.scale.setScalar(layer.config.scale * responsiveScale);
    });

    render();
  }

  function getResponsiveScale(width) {
    if (width < BREAKPOINTS.mobile) {
      return THREE.MathUtils.clamp(width / BREAKPOINTS.mobile, 0.44, 0.64);
    }

    if (width < BREAKPOINTS.tablet) {
      return 0.88;
    }

    return 1;
  }

  function updateScroll() {
    scrollY = window.scrollY;
  }

  function updatePointer(event) {
    pointer.targetX = (event.clientX / viewportWidth - 0.5) * 2;
    pointer.targetY = (event.clientY / viewportHeight - 0.5) * 2;
  }

  function animate() {
    if (!isPageVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = window.requestAnimationFrame(animate);
    render();
  }

  function handleVisibilityChange() {
    isPageVisible = !document.hidden;

    if (isPageVisible && !animationFrameId) {
      animate();
      return;
    }

    if (!isPageVisible && animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function render() {
    const elapsed = clock.getElapsedTime();
    const reduceMotion = reducedMotionQuery.matches;
    const easing = reduceMotion ? 1 : 0.08;
    const scrollScreens = scrollY / viewportHeight;

    pointer.x += (pointer.targetX - pointer.x) * easing;
    pointer.y += (pointer.targetY - pointer.y) * easing;

    layers.forEach((layer) => {
      if (!layer.isVisible) {
        return;
      }

      const { camera, renderer, scene, cubes, config, world } = layer;
      const scrollCameraShift = scrollScreens * config.scrollFactor * 0.28;

      camera.position.x = pointer.x * config.pointerFactor;
      camera.position.y = -pointer.y * config.pointerFactor * 0.38;
      camera.lookAt(0, scrollCameraShift, -3);

      cubes.forEach((cube) => {
        const { paletteName, xRatio, pageY, z, phase, spinX, spinY } =
          cube.userData;
        const pushedXRatio = getResponsiveXRatio(
          paletteName,
          xRatio,
          pageY
        );
        const mobileHeroLift = getMobileHeroLift(pageY, scrollScreens);
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

  function getResponsiveXRatio(paletteName, xRatio, pageY) {
    if (viewportWidth >= BREAKPOINTS.mobile) {
      return xRatio;
    }

    if (isMobileHeroAccent(paletteName, pageY)) {
      return -0.9;
    }

    return (
      Math.sign(xRatio || 1) *
      (0.88 + Math.min(Math.abs(xRatio), 1.4) * 0.18)
    );
  }

  function getMobileHeroLift(pageY, scrollScreens) {
    if (viewportWidth >= BREAKPOINTS.mobile || scrollScreens >= 0.75) {
      return 0;
    }

    return pageY < 0.7 ? 1.25 : 0;
  }

  function isMobileHeroAccent(paletteName, pageY) {
    return paletteName === "indigo" && pageY < 0.75;
  }
}
