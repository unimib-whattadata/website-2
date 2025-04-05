// Graph Animation Logic
document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.querySelector('.graph-svg');
    const containerRect = graphContainer.getBoundingClientRect();
    const nodeSize = 14;
    const numNodes = 12;
    const maxConnections = 3;
    const connectionThreshold = 200;
    
    // Distribuisci i nodi con velocità iniziale
    const nodes = Array.from({ length: numNodes }, () => ({
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        vx: 1,  // Velocità fissa in orizzontale
        vy: 1,  // Velocità fissa in verticale
        connections: []
    }));

    // Gruppo per gli archi (creato per primo, quindi sotto)
    const edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edgesGroup.setAttribute("class", "edges-group");
    graphContainer.appendChild(edgesGroup);

    // Crea elementi SVG per i nodi
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

    // Funzione per aggiornare le connessioni dinamicamente
    function updateConnections() {
        // Rimuovi tutte le linee esistenti
        while (edgesGroup.firstChild) {
            edgesGroup.removeChild(edgesGroup.firstChild);
        }

        // Crea nuove connessioni basate sulla distanza
        nodes.forEach((node, i) => {
            node.connections = [];
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionThreshold && node.connections.length < maxConnections) {
                        // Crea connessione solo se entrambi i nodi hanno spazio
                        if (otherNode.connections.length < maxConnections) {
                            node.connections.push(otherNode);
                            
                            // Crea linea SVG
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

    // Animazione migliorata per effetto molecolare
    function animate() {
        // Movimento dei nodi
        nodes.forEach(node => {
            // Aggiorna posizione
            node.x += node.vx;
            node.y += node.vy;
            
            // Rimbalzo ai bordi senza perdita di velocità
            const margin = nodeSize / 2;
            if (node.x < margin) {
                node.x = margin;
                node.vx = -node.vx;  // Inverte la direzione senza perdere velocità
            }
            if (node.x > containerRect.width - margin) {
                node.x = containerRect.width - margin;
                node.vx = -node.vx;
            }
            if (node.y < margin) {
                node.y = margin;
                node.vy = -node.vy;
            }
            if (node.y > containerRect.height - margin) {
                node.y = containerRect.height - margin;
                node.vy = -node.vy;
            }
        });

        // Aggiorna connessioni dinamiche
        updateConnections();

        // Aggiorna posizione dei nodi
        nodeElements.forEach((el, i) => {
            el.setAttribute("x", nodes[i].x - nodeSize/2);
            el.setAttribute("y", nodes[i].y - nodeSize/2);
        });

        requestAnimationFrame(animate);
    }

    animate();
}); 