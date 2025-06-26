export type HeapSortInput = {
    array: number[]
}

export type AlgoStep = {
    // code: string, // can store this constant somewhere else
    line: number,
    // assignment, vs action vs comparison
    assignedValue?: number,
    transformedValue?: number[]
}

export type HeapSortSwapStep = {
    index1: number,
    index2: number,
    inputArr: number[],
}

export type CodeLine = {
    stepNum: number,
    indents: number, // how many tabs
    codeStr: string
}


export type AStarHeapNode = {
    name: string | number,
    fScore: number
}

// map could be for cameFrome, gScore, fScore
export type AStarScoreMap = Record<string | number, number>
export type AStarPredecessorMap = Record<string | number, string | number>

// binary min heap represented in array form
// index 0 is min node, index 1 is its left child, index 2 right child
// iLeftChild(i) = 2 * i + 1, iRightChild(i) = 2 * i + 2, iParent(i) = floor((i-1)/2)
export type AStarHeap = AStarHeapNode[]

export type AStarAlgoStep = {
    line: number,
    assignedValue?: number | AStarHeapNode | AStarHeap | AStarScoreMap | AStarPredecessorMap | AStarGraphNode,
    transformedValue?: AStarHeap
}

// export type AStarGraphNode = {
//     name: string | number,
//     dis
// }

// want to be able to input graph as for eg.
// a: (b, 1.5), (c, 2), ie. a is connected to b which is 1.5 distance away, a is connected to c which is 2 distance away
export type AStarAdjListElement = {
    name: string | number,
    dist: number
}
// export type AStarInputGraph = {
//     edges: Record<string | number, AStarAdjListElement[]>
// }
// but may also want to allow user to draw node and edges by clicking and dragging
// can get distances between nodes drawn
// when users input via adj list, can also convert it to a drawing and calculate distances between all nodes

export type Coordinate = {
    x: number,
    y: number
}
export type AStarGraphNode = {
    name: string | number,
    coordinate: Coordinate
}
export type AStarInputGraph = {
    coordinates: Record<string | number, Coordinate>, // node name to (x,y)
    // undirected edges should go both ways ie. appear in adj list of both nodes
    edges: Record<string | number, AStarGraphNode[]>
    // edges: number[][] // list of [node1, node2] where they are connected
}

export type AStarInput = {
    graph: AStarInputGraph,
    start: AStarGraphNode,
    goal: AStarGraphNode,
    // start: string | number,
    // end: string | number,
    // hFn: // not sure how to type this yet, for simplicity use straight line distance by default
}
