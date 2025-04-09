document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.querySelector('.graph-svg');
    const containerRect = graphContainer.getBoundingClientRect();
    const nodeSize = 14;
    const numNodes = 14;
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

// Logo Graph Animation
function createLogoGraph() {
    const container = document.getElementById('logo-graph-container');
    const svg = container.querySelector('svg');
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Add the defs back
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <filter id="logo-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    `;
    svg.appendChild(defs);
    
    // Define logos
    const logos = [
        { src: 'img/logo/arianne.svg', name: 'Arianne' },
        { src: 'img/logo/esgquest.svg', name: 'ESGquest' },
        { src: 'img/logo/micare.svg', name: 'MiCare' }
    ];
    
    // Create nodes and edges
    const nodes = [];
    const edges = [];
    
    // Create nodes
    logos.forEach((logo, index) => {
        const x = Math.random() * (container.clientWidth - 200) + 100;
        const y = Math.random() * (container.clientHeight - 200) + 100;
        
        const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
        node.setAttribute("class", "logo-node");
        node.setAttribute("transform", `translate(${x}, ${y})`);
        
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttribute("href", logo.src);
        image.setAttribute("width", "120");
        image.setAttribute("height", "40");
        image.setAttribute("x", "-60");
        image.setAttribute("y", "-20");
        
        node.appendChild(image);
        svg.appendChild(node);
        
        nodes.push({ x, y, element: node });
    });
    
    // Create edges
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("class", "logo-line");
            line.setAttribute("x1", nodes[i].x);
            line.setAttribute("y1", nodes[i].y);
            line.setAttribute("x2", nodes[j].x);
            line.setAttribute("y2", nodes[j].y);
            svg.appendChild(line);
            edges.push(line);
        }
    }
    
    // Animation
    let angle = 0;
    function animate() {
        angle += 0.005;
        nodes.forEach((node, index) => {
            const radius = 50 + index * 20;
            const x = node.x + Math.cos(angle + index) * radius;
            const y = node.y + Math.sin(angle + index) * radius;
            node.element.setAttribute("transform", `translate(${x}, ${y})`);
        });
        
        edges.forEach((edge, index) => {
            const node1 = nodes[Math.floor(index / (nodes.length - 1))];
            const node2 = nodes[index % (nodes.length - 1) + 1];
            edge.setAttribute("x1", node1.x);
            edge.setAttribute("y1", node1.y);
            edge.setAttribute("x2", node2.x);
            edge.setAttribute("y2", node2.y);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize logo graph when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createLogoGraph();
    
    // Recreate graph on window resize
    window.addEventListener('resize', function() {
        createLogoGraph();
    });
});