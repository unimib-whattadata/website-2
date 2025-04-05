document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.querySelector('.graph-svg');
    const containerRect = graphContainer.getBoundingClientRect();
    const nodeSize = 14;
    const numNodes = 12;
    const maxConnections = 3;
    const connectionThreshold = 200;
    const constantSpeed = 1; // velocità base (unità per secondo)

    // Distribuisci i nodi con velocità costante in direzioni casuali
    const nodes = Array.from({ length: numNodes }, () => {
        const angle = Math.random() * 2 * Math.PI;
        return {
            x: Math.random() * containerRect.width,
            y: Math.random() * containerRect.height,
            vx: constantSpeed * Math.cos(angle),
            vy: constantSpeed * Math.sin(angle),
            connections: []
        };
    });

    // Crea un gruppo SVG per le linee
    const edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edgesGroup.setAttribute("class", "edges-group");
    graphContainer.appendChild(edgesGroup);

    // Crea gli elementi SVG per i nodi
    const nodeElements = nodes.map(node => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "graph-node");
        rect.setAttribute("width", nodeSize);
        rect.setAttribute("height", nodeSize);
        rect.setAttribute("stroke", "#84cc16");
        rect.setAttribute("stroke-width", "2");
        rect.setAttribute("fill", "rgb(79 70 229)");
        graphContainer.appendChild(rect);
        return rect;
    });

    // Funzione per aggiornare le connessioni
    function updateConnections() {
        while (edgesGroup.firstChild) {
            edgesGroup.removeChild(edgesGroup.firstChild);
        }

        nodes.forEach((node, i) => {
            node.connections = [];
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionThreshold && node.connections.length < maxConnections) {
                        if (otherNode.connections.length < maxConnections) {
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
                    }
                }
            });
        });
    }

    // Animazione con delta time
    let lastTime = performance.now();
    
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        nodes.forEach(node => {
            // Applica movimento in base al tempo trascorso
            node.x += node.vx * (deltaTime / 16.67); // Normalizza per 60 FPS
            node.y += node.vy * (deltaTime / 16.67);
            
            const margin = nodeSize / 2;
            // Gestione rimbalzi
            if (node.x < margin) {
                node.x = margin;
                node.vx = Math.abs(node.vx);
            }
            if (node.x > containerRect.width - margin) {
                node.x = containerRect.width - margin;
                node.vx = -Math.abs(node.vx);
            }
            if (node.y < margin) {
                node.y = margin;
                node.vy = Math.abs(node.vy);
            }
            if (node.y > containerRect.height - margin) {
                node.y = containerRect.height - margin;
                node.vy = -Math.abs(node.vy);
            }
        });

        updateConnections();

        nodeElements.forEach((el, i) => {
            el.setAttribute("x", nodes[i].x - nodeSize / 2);
            el.setAttribute("y", nodes[i].y - nodeSize / 2);
        });

        requestAnimationFrame((timestamp) => animate(timestamp));
    }

    // Avvia animazione
    requestAnimationFrame((timestamp) => animate(timestamp));
});