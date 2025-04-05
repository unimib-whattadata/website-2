document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.querySelector('.graph-svg');
    const containerRect = graphContainer.getBoundingClientRect();
    const nodeSize = 14;
    const numNodes = 12;
    const maxConnections = 3;
    const connectionThreshold = 200;
    const baseSpeed = 0.8;

    // Crea nodi con un nodo speciale
    const nodes = Array.from({ length: numNodes }, (_, index) => {
        const angle = Math.random() * 2 * Math.PI;
        return {
            x: Math.random() * containerRect.width,
            y: Math.random() * containerRect.height,
            vx: baseSpeed * Math.cos(angle),
            vy: baseSpeed * Math.sin(angle),
            connections: [],
            isSpecial: index === 3 // Modifica questo numero per cambiare il nodo speciale
        };
    });

    const edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edgesGroup.setAttribute("class", "edges-group");
    graphContainer.appendChild(edgesGroup);

    // Crea elementi SVG per i nodi
    const nodeElements = nodes.map(node => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "graph-node");
        rect.setAttribute("width", nodeSize);
        rect.setAttribute("height", nodeSize);
        rect.setAttribute("stroke", node.isSpecial ? "#F97316" : "#84cc16");
        rect.setAttribute("stroke-width", "2");
        rect.setAttribute("fill", "rgb(79 70 229)");
        graphContainer.appendChild(rect);
        return rect;
    });

    function updateConnections() {
        while (edgesGroup.firstChild) edgesGroup.removeChild(edgesGroup.firstChild);

        nodes.forEach((node, i) => {
            node.connections = [];
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionThreshold) {
                        if (node.connections.length < maxConnections && otherNode.connections.length < maxConnections) {
                            node.connections.push(otherNode);
                            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                            line.setAttribute("class", "graph-line");
                            line.setAttribute("stroke", "rgb(79, 70, 229)");
                            line.setAttribute("stroke-width", "1.5");
                            line.setAttribute("x1", node.x);
                            line.setAttribute("y1", node.y);
                            line.setAttribute("x2", otherNode.x);
                            line.setAttribute("y2", otherNode.y);
                            edgesGroup.appendChild(line);
                        }

                        // Repulsione tra nodi vicini
                        if (distance < 40) {
                            const repulsion = 0.015;
                            node.vx -= (dx * repulsion);
                            node.vy -= (dy * repulsion);
                            otherNode.vx += (dx * repulsion);
                            otherNode.vy += (dy * repulsion);
                        }
                    }
                }
            });
        });
    }

    let lastTime = performance.now();

    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        nodes.forEach(node => {
            // Aggiorna posizione
            node.x += node.vx * (deltaTime / 16.67);
            node.y += node.vy * (deltaTime / 16.67);

            // Rimbalzi dai bordi
            const margin = nodeSize / 2;
            if (node.x < margin || node.x > containerRect.width - margin) {
                node.vx *= -0.95;
                node.x = Math.max(margin, Math.min(node.x, containerRect.width - margin));
            }
            if (node.y < margin || node.y > containerRect.height - margin) {
                node.vy *= -0.95;
                node.y = Math.max(margin, Math.min(node.y, containerRect.height - margin));
            }

            // Leggero attrito
            node.vx *= 0.999;
            node.vy *= 0.999;
        });

        updateConnections();

        // Aggiorna posizioni SVG
        nodeElements.forEach((el, i) => {
            el.setAttribute("x", nodes[i].x - nodeSize / 2);
            el.setAttribute("y", nodes[i].y - nodeSize / 2);
        });

        requestAnimationFrame(animate);
    }

    // Aggiungi variazione casuale del movimento
    setInterval(() => {
        nodes.forEach(node => {
            node.vx += (Math.random() - 0.5) * 0.008;
            node.vy += (Math.random() - 0.5) * 0.008;
        });
    }, 2000);

    requestAnimationFrame(animate);
});