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
    orange: "#ff8c42",
  };
  const sectionAnchor = (
    selector,
    edge = "start",
    offset = 0,
    fallback = 0
  ) => ({ selector, edge, offset, fallback });
  const cubeSpec = (
    paletteName,
    xRatio,
    pageY,
    z,
    size,
    phase,
    motion = {}
  ) => ({
    paletteName,
    xRatio,
    pageY,
    z,
    size,
    phase,
    motion: {
      scrollRate: 1,
      entryX: 0,
      exitX: 0,
      curveX: 0,
      driftX: 0.035,
      driftY: 0.12,
      driftRate: 0.46,
      orbit: 0,
      scalePulse: 0.025,
      spinRate: 1,
      spinDirection: 1,
      ...motion,
    },
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
    orange: {
      color: THEME_COLORS.orange,
      edge: THEME_COLORS.orange,
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
        cubeSpec(
          "lime",
          0.9,
          sectionAnchor(".hero-section", "center", -0.08, 0.42),
          -9.2,
          0.42,
          0.24,
          { scrollRate: 0.62, entryX: 0.18, exitX: -0.1, driftRate: 0.28 }
        ),
        cubeSpec(
          "indigo",
          -0.84,
          sectionAnchor("#servizi", "start", -0.08, 1.02),
          -8.4,
          0.66,
          0.82,
          { scrollRate: 0.76, entryX: -0.14, exitX: 0.12, curveX: 0.08 }
        ),
        cubeSpec(
          "lime",
          0.72,
          sectionAnchor("#chi-siamo", "start", 0.12, 2.7),
          -9.6,
          0.32,
          0.42,
          { scrollRate: 0.5, entryX: 0.08, exitX: -0.18, driftRate: 0.34 }
        ),
        cubeSpec(
          "indigo",
          0.9,
          sectionAnchor("#progetti", "start", -0.14, 4.15),
          -8.7,
          0.74,
          0.34,
          { scrollRate: 0.88, entryX: 0.2, exitX: -0.16, curveX: -0.08 }
        ),
        cubeSpec(
          "lime",
          -0.76,
          sectionAnchor("#clienti", "center", 0.08, 5.55),
          -9.3,
          0.48,
          0.64,
          { scrollRate: 0.58, entryX: -0.16, exitX: 0.18, driftRate: 0.3 }
        ),
        cubeSpec(
          "indigo",
          0.78,
          sectionAnchor("#contatti", "start", 0.12, 7.1),
          -8.8,
          0.38,
          0.52,
          { scrollRate: 0.7, entryX: 0.1, exitX: -0.2, curveX: 0.06 }
        ),
      ],
    },
    middle: {
      cameraZ: 9.2,
      scale: 1,
      scrollFactor: 0.86,
      pointerFactor: 0.34,
      spinFactor: 0.78,
      cubes: [
        cubeSpec(
          "lime",
          0.76,
          sectionAnchor(".hero-section", "start", 0.2, 0.2),
          -4.4,
          1.08,
          0.14,
          { scrollRate: 0.92, entryX: 0.22, exitX: -0.08, curveX: 0.12, orbit: 0.035 }
        ),
        cubeSpec(
          "indigo",
          -0.96,
          sectionAnchor("#servizi", "start", 0.08, 1.18),
          -4.9,
          0.78,
          0.56,
          { scrollRate: 1.18, entryX: -0.22, exitX: 0.16, driftRate: 0.62, spinDirection: -1 }
        ),
        cubeSpec(
          "lime",
          1.28,
          sectionAnchor("#servizi", "end", -0.12, 2.55),
          -4.5,
          1.02,
          0.68,
          { scrollRate: 0.98, entryX: 0.18, exitX: 0.02, curveX: -0.05, driftY: 0.2 }
        ),
        cubeSpec(
          "indigo",
          -0.9,
          sectionAnchor("#chi-siamo", "end", -0.06, 3.8),
          -4.7,
          0.88,
          0.2,
          { scrollRate: 1.28, entryX: -0.24, exitX: 0.2, curveX: 0.1, spinRate: 1.18 }
        ),
        cubeSpec(
          "orange",
          0.86,
          sectionAnchor("#progetti", "start", -0.04, 4.18),
          -4.15,
          1.02,
          0.74,
          { scrollRate: 0.96, entryX: 0.26, exitX: -0.2, curveX: -0.16, driftRate: 0.54, scalePulse: 0.045 }
        ),
        cubeSpec(
          "lime",
          -0.88,
          sectionAnchor("#clienti", "end", -0.12, 6.6),
          -4.6,
          1.14,
          0.48,
          { scrollRate: 0.82, entryX: -0.12, exitX: 0.28, curveX: 0.14, spinDirection: -1 }
        ),
      ],
    },
    front: {
      cameraZ: 7.2,
      scale: 1.28,
      scrollFactor: 1.22,
      pointerFactor: 0.56,
      spinFactor: 1.05,
      cubes: [
        cubeSpec(
          "lime",
          1.36,
          sectionAnchor(".hero-section", "end", -0.12, 0.88),
          -2.45,
          1.66,
          0.28,
          { scrollRate: 1.34, entryX: 0.34, exitX: 0.08, curveX: -0.05, driftY: 0.22, spinRate: 0.82 }
        ),
        cubeSpec(
          "indigo",
          -1.34,
          sectionAnchor("#servizi", "end", -0.08, 2.52),
          -2.65,
          1.44,
          0.78,
          { scrollRate: 0.86, entryX: -0.3, exitX: -0.06, curveX: 0.05, spinDirection: -1, scalePulse: 0.04 }
        ),
        cubeSpec(
          "lime",
          1.32,
          sectionAnchor("#chi-siamo", "end", 0.04, 3.95),
          -2.35,
          1.26,
          0.9,
          { scrollRate: 1.46, entryX: 0.26, exitX: 0.04, curveX: -0.04, driftRate: 0.7, spinRate: 1.2 }
        ),
        cubeSpec(
          "indigo",
          -1.36,
          sectionAnchor("#progetti", "end", 0.06, 5.4),
          -2.7,
          1.52,
          0.38,
          { scrollRate: 1.04, entryX: -0.28, exitX: -0.04, curveX: 0.05, driftY: 0.24 }
        ),
        cubeSpec(
          "lime",
          1.34,
          sectionAnchor("#clienti", "end", -0.1, 6.72),
          -2.4,
          1.3,
          0.72,
          { scrollRate: 0.68, entryX: 0.3, exitX: 0.05, curveX: -0.05, spinDirection: -1 }
        ),
      ],
    },
    overlay: {
      cameraZ: 8.4,
      scale: 0.66,
      scrollFactor: 1,
      pointerFactor: 0.42,
      spinFactor: 0.72,
      cubes: [
        cubeSpec(
          "indigo",
          -0.98,
          sectionAnchor(".hero-section", "center", 0.08, 0.56),
          -3.15,
          0.46,
          0.11,
          { scrollRate: 1.52, entryX: -0.18, exitX: 0.3, curveX: 0.12, driftRate: 0.82, spinRate: 1.35 }
        ),
        cubeSpec(
          "lime",
          1.02,
          sectionAnchor("#chi-siamo", "start", 0.18, 2.95),
          -3.25,
          0.54,
          0.22,
          { scrollRate: 0.78, entryX: 0.22, exitX: -0.28, curveX: -0.18, orbit: 0.06 }
        ),
        cubeSpec(
          "indigo",
          -1.02,
          sectionAnchor("#clienti", "start", -0.14, 5.2),
          -3.1,
          0.4,
          0.61,
          { scrollRate: 1.38, entryX: -0.26, exitX: 0.22, curveX: 0.14, driftRate: 0.76, spinDirection: -1 }
        ),
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
        createCube({ ...spec, index, layerName: name })
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

  function cubeMaterial(paletteName, layerName) {
    const palette = palettes[paletteName];
    const opacity = layerName === "back" ? 0.74 : 1;

    return new THREE.MeshStandardMaterial({
      color: palette.color,
      roughness: 0.34,
      metalness: 0.08,
      transparent: opacity < 1,
      opacity,
    });
  }

  function createCube({
    paletteName,
    xRatio,
    pageY,
    z,
    size,
    phase,
    motion,
    index,
    layerName,
  }) {
    const palette = palettes[paletteName];
    const cube = new THREE.Group();
    const body = new THREE.Mesh(
      cubeGeometry,
      cubeMaterial(paletteName, layerName)
    );
    const edges = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({
        color: palette.edge,
        transparent: layerName === "back",
        opacity: layerName === "back" ? 0.58 : 0.9,
      })
    );
    const baseRotation = {
      x: -0.24 + phase * 0.46,
      y: 0.42 + phase * 0.62,
      z: -0.16 + phase * 0.34,
    };
    const alternateDirection = index % 2 ? -1 : 1;

    cube.add(body, edges);
    cube.scale.setScalar(size);
    cube.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
    cube.userData = {
      paletteName,
      xRatio,
      pageY,
      resolvedPageY: typeof pageY === "number" ? pageY : pageY.fallback,
      z,
      size,
      phase,
      motion,
      baseRotation,
      spinX:
        (0.032 + phase * 0.034) *
        motion.spinRate *
        motion.spinDirection *
        alternateDirection,
      spinY:
        (0.048 + phase * 0.052) *
        motion.spinRate *
        (index % 3 ? 1 : -1),
      spinZ:
        (0.012 + phase * 0.018) *
        motion.spinRate *
        motion.spinDirection,
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
      layer.cubes.forEach((cube) => {
        cube.userData.resolvedPageY = resolvePageY(cube.userData.pageY);
      });
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

  function resolvePageY(pageY) {
    if (typeof pageY === "number") {
      return pageY;
    }

    const target = document.querySelector(pageY.selector);

    if (!target) {
      return pageY.fallback;
    }

    const bounds = target.getBoundingClientRect();
    const documentTop = bounds.top + window.scrollY;
    const edgeOffset =
      pageY.edge === "end"
        ? bounds.height
        : pageY.edge === "center"
          ? bounds.height * 0.5
          : 0;

    return (documentTop + edgeOffset) / viewportHeight + pageY.offset;
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

    if (reduceMotion) {
      pointer.x = 0;
      pointer.y = 0;
    } else {
      pointer.x += (pointer.targetX - pointer.x) * easing;
      pointer.y += (pointer.targetY - pointer.y) * easing;
    }

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
        const {
          paletteName,
          xRatio,
          resolvedPageY,
          z,
          size,
          phase,
          motion,
          baseRotation,
          spinX,
          spinY,
          spinZ,
        } = cube.userData;
        const pushedXRatio = getResponsiveXRatio(
          paletteName,
          xRatio,
          resolvedPageY
        );
        const mobileHeroLift = getMobileHeroLift(
          resolvedPageY,
          scrollScreens
        );
        const scrollRate = reduceMotion ? 0.28 : motion.scrollRate;
        const parallaxY =
          (resolvedPageY - scrollScreens * config.scrollFactor * scrollRate) *
          world.height;
        const pathProgress = THREE.MathUtils.clamp(
          0.5 - parallaxY / (world.height * 2),
          0,
          1
        );
        const easedPath =
          pathProgress * pathProgress * (3 - 2 * pathProgress);
        const pathX = reduceMotion
          ? 0
          : THREE.MathUtils.lerp(
              motion.entryX,
              motion.exitX,
              easedPath
            ) + Math.sin(Math.PI * easedPath) * motion.curveX;
        const driftX = reduceMotion
          ? 0
          : Math.sin(elapsed * motion.driftRate + phase * 11) *
            motion.driftX;
        const driftY = reduceMotion
          ? 0
          : Math.cos(elapsed * motion.driftRate * 0.83 + phase * 9) *
            motion.driftY;
        const orbitX = reduceMotion
          ? 0
          : Math.cos(elapsed * motion.driftRate * 0.72 + phase * 8) *
            motion.orbit;
        const orbitY = reduceMotion
          ? 0
          : Math.sin(elapsed * motion.driftRate * 0.72 + phase * 8) *
            motion.orbit * world.height;
        const scalePulse = reduceMotion
          ? 1
          : 1 +
            Math.sin(elapsed * motion.driftRate * 0.64 + phase * 13) *
              motion.scalePulse;

        cube.position.x =
          (pushedXRatio + pathX + driftX + orbitX) * world.width * 0.5 +
          pointer.x * config.pointerFactor * (2.2 + Math.abs(z) * 0.12);
        cube.position.y =
          parallaxY +
          driftY +
          orbitY +
          mobileHeroLift -
          pointer.y * config.pointerFactor;
        cube.position.z = z;
        cube.scale.setScalar(size * scalePulse);

        if (!reduceMotion) {
          cube.rotation.x =
            baseRotation.x + elapsed * spinX * config.spinFactor;
          cube.rotation.y =
            baseRotation.y + elapsed * spinY * config.spinFactor;
          cube.rotation.z =
            baseRotation.z + elapsed * spinZ * config.spinFactor;
        } else {
          cube.rotation.set(
            baseRotation.x,
            baseRotation.y,
            baseRotation.z
          );
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
