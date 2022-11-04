const Grafo = {
    aristas: [
        [1, 2],
        [1, 3],
        [2, 3],
        [2, 4],
        [3, 4],
    ],
    vertices: [1, 2, 3, 4],
    pesos: {
        1: {
            2: 3,
            3: 5,
        },
        2: {
            3: 1,
            4: 5,
        },
        3: {
            4: 2,
        }
    },
};

// test

/*
   DIJKSTRA (Grafo G, nodo_fuente s)       
       para u ∈ V[G] hacer
           distancia[u] = INFINITO
           padre[u] = NULL
           visto[u] = false
       distancia[s] = 0
       adicionar (cola, (s, distancia[s]))
       mientras que cola no es vacía hacer
           u = extraer_mínimo(cola)
           visto[u] = true
           para todos v ∈ adyacencia[u] hacer
               si ¬ visto[v]      
                   si distancia[v] > distancia[u] + peso (u, v) hacer
                       distancia[v] = distancia[u] + peso (u, v)
                       padre[v] = u
                       adicionar(cola,(v, distancia[v]))
*/

function peso(G, a, b) {
    if (a > b) {
        const c = a;
        a = b;
        b = c;
    }
    return G.pesos[a][b];
}

function extraerMinimo(cola) {
    // cola ejemplo 
    // [ [1, 0], [2, 4], [3, 1] ]
    let distanciaMinima = Infinity;
    let verticeMinimo = cola[0][0];
    for (let i = 0; i < cola.length; i++) {
        const [vertice, distancia] = cola[i];
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            verticeMinimo = vertice;
        }
    }
    return [cola.filter(([a, b]) => !(a === verticeMinimo && b === distanciaMinima)), verticeMinimo];
}

function adyacencia(G, u) {
    return G.aristas // de las aristas en G
        .filter(([a, b]) => a === u || b === u) // dame las donde un elemento es u
        .map(([a, b]) => a === u ? b : a); // de los que me diste, devuelve el que no es u
}

function dijstra(G, s) {
    const distancia = {};
    const padre = {};
    const visto = {};
    for (let i = 0; i < G.vertices.length; i++) {
        const u = G.vertices[i];
        distancia[u] = Infinity;
        padre[u] = null;
        visto[u] = false;
    }
    distancia[s] = 0;
    let cola = [];
    cola.push([s, distancia[s]]);
    while (cola.length > 0) {
        const [cola2, u] = extraerMinimo(cola);
        cola = cola2;
        visto[u] = true;
        const verticesAdyacentes = adyacencia(G, u);
        for (let i = 0; i < verticesAdyacentes.length; i++) {
            const v = verticesAdyacentes[i];
            if (!visto[v]) {
                if (distancia[v] > (distancia[u] + peso(G, u, v))) {
                    distancia[v] = distancia[u] + peso(G, u, v)
                    padre[v] = u
                    cola.push([v, distancia[v]]);
                }
            }
        }
    }
    return [distancia, padre];
}

var [distancia, padre] = dijstra(Grafo, 1);
console.log("Grafo", Grafo);
console.log("distancia", distancia);
console.log("padre", padre);
