(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const NODE_SIZE = 14;
  const NODE_COUNT = 14;
  const MAX_CONNECTIONS = 3;
  const BASE_SPEED = 0.8;
  const MAX_SPEED = 1.4;
  const REPULSION_DISTANCE = 40;
  const REPULSION_FORCE = 0.015;
  const RANDOM_DRIFT_INTERVAL = 2000;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.addEventListener("DOMContentLoaded", () => {
    const graphContainer = document.querySelector(".graph-svg");

    if (!(graphContainer instanceof SVGSVGElement)) {
      return;
    }

    let bounds = readBounds(graphContainer);
    const nodes = createNodes(bounds);
    const edgesGroup = createSvgElement("g", { class: "edges-group" });
    const edgeElements = createEdgePool();
    const nodeElements = nodes.map(createNodeElement);

    graphContainer.appendChild(edgesGroup);
    edgeElements.forEach((edge) => edgesGroup.appendChild(edge));
    nodeElements.forEach((node) => graphContainer.appendChild(node));

    renderNodes(nodes, nodeElements);
    renderConnections(nodes, edgeElements, bounds);

    if (prefersReducedMotion.matches) {
      return;
    }

    let animationFrameId = null;
    let lastFrameTime = performance.now();
    const driftIntervalId = window.setInterval(
      () => applyRandomDrift(nodes),
      RANDOM_DRIFT_INTERVAL
    );

    function animate(currentTime) {
      const deltaRatio = Math.min((currentTime - lastFrameTime) / 16.67, 2);
      lastFrameTime = currentTime;

      moveNodes(nodes, bounds, deltaRatio);
      renderConnections(nodes, edgeElements, bounds);
      renderNodes(nodes, nodeElements);

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (animationFrameId) {
        return;
      }

      lastFrameTime = performance.now();
      animationFrameId = window.requestAnimationFrame(animate);
    }

    function stopAnimation() {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function resizeGraph() {
      bounds = readBounds(graphContainer);
      clampNodes(nodes, bounds);
      renderConnections(nodes, edgeElements, bounds);
      renderNodes(nodes, nodeElements);
    }

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(resizeGraph) : null;

    if (resizeObserver) {
      resizeObserver.observe(graphContainer);
    } else {
      window.addEventListener("resize", resizeGraph, { passive: true });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    window.addEventListener(
      "pagehide",
      () => {
        stopAnimation();
        window.clearInterval(driftIntervalId);
        resizeObserver?.disconnect();
      },
      { once: true }
    );

    startAnimation();
  });

  function createSvgElement(tagName, attributes = {}) {
    const element = document.createElementNS(SVG_NS, tagName);

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, String(value));
    });

    return element;
  }

  function readBounds(svg) {
    const rect = svg.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    return { width, height };
  }

  function createNodes(bounds) {
    return Array.from({ length: NODE_COUNT }, (_, index) => {
      const angle = Math.random() * 2 * Math.PI;

      return {
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        vx: BASE_SPEED * Math.cos(angle),
        vy: BASE_SPEED * Math.sin(angle),
        isSpecial: index === 3,
      };
    });
  }

  function createEdgePool() {
    const maxEdges = Math.ceil((NODE_COUNT * MAX_CONNECTIONS) / 2);

    return Array.from({ length: maxEdges }, () =>
      createSvgElement("line", {
        class: "graph-line",
        "stroke-width": 1.5,
      })
    );
  }

  function createNodeElement(node) {
    return createSvgElement("rect", {
      class: "graph-node",
      width: NODE_SIZE,
      height: NODE_SIZE,
      stroke: node.isSpecial ? "#F97316" : "#84cc16",
      "stroke-width": 2,
      fill: "rgb(79 70 229)",
    });
  }

  function getConnectionThreshold(bounds) {
    return Math.min(220, Math.max(bounds.width, bounds.height) * 0.35);
  }

  function renderConnections(nodes, edgeElements, bounds) {
    const connectionCounts = new Array(nodes.length).fill(0);
    const threshold = getConnectionThreshold(bounds);
    let edgeIndex = 0;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const source = nodes[i];
        const target = nodes[j];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.hypot(dx, dy);

        if (distance < REPULSION_DISTANCE && distance > 0) {
          applyRepulsion(source, target, dx, dy);
        }

        if (
          distance >= threshold ||
          connectionCounts[i] >= MAX_CONNECTIONS ||
          connectionCounts[j] >= MAX_CONNECTIONS ||
          edgeIndex >= edgeElements.length
        ) {
          continue;
        }

        const edge = edgeElements[edgeIndex];
        edge.setAttribute("x1", source.x);
        edge.setAttribute("y1", source.y);
        edge.setAttribute("x2", target.x);
        edge.setAttribute("y2", target.y);
        edge.removeAttribute("display");

        connectionCounts[i] += 1;
        connectionCounts[j] += 1;
        edgeIndex += 1;
      }
    }

    for (let i = edgeIndex; i < edgeElements.length; i += 1) {
      edgeElements[i].setAttribute("display", "none");
    }
  }

  function applyRepulsion(source, target, dx, dy) {
    source.vx -= dx * REPULSION_FORCE;
    source.vy -= dy * REPULSION_FORCE;
    target.vx += dx * REPULSION_FORCE;
    target.vy += dy * REPULSION_FORCE;

    clampVelocity(source);
    clampVelocity(target);
  }

  function moveNodes(nodes, bounds, deltaRatio) {
    nodes.forEach((node) => {
      node.x += node.vx * deltaRatio;
      node.y += node.vy * deltaRatio;

      bounceNode(node, bounds);

      node.vx *= 0.999;
      node.vy *= 0.999;
      clampVelocity(node);
    });
  }

  function bounceNode(node, bounds) {
    const margin = NODE_SIZE / 2;

    if (node.x < margin || node.x > bounds.width - margin) {
      node.vx *= -0.95;
      node.x = clamp(node.x, margin, bounds.width - margin);
    }

    if (node.y < margin || node.y > bounds.height - margin) {
      node.vy *= -0.95;
      node.y = clamp(node.y, margin, bounds.height - margin);
    }
  }

  function renderNodes(nodes, nodeElements) {
    nodeElements.forEach((element, index) => {
      element.setAttribute("x", nodes[index].x - NODE_SIZE / 2);
      element.setAttribute("y", nodes[index].y - NODE_SIZE / 2);
    });
  }

  function applyRandomDrift(nodes) {
    nodes.forEach((node) => {
      node.vx += (Math.random() - 0.5) * 0.008;
      node.vy += (Math.random() - 0.5) * 0.008;
      clampVelocity(node);
    });
  }

  function clampNodes(nodes, bounds) {
    const margin = NODE_SIZE / 2;

    nodes.forEach((node) => {
      node.x = clamp(node.x, margin, bounds.width - margin);
      node.y = clamp(node.y, margin, bounds.height - margin);
    });
  }

  function clampVelocity(node) {
    node.vx = clamp(node.vx, -MAX_SPEED, MAX_SPEED);
    node.vy = clamp(node.vy, -MAX_SPEED, MAX_SPEED);
  }

  function clamp(value, min, max) {
    if (max < min) {
      return min;
    }

    return Math.min(Math.max(value, min), max);
  }
})();
