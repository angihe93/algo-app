import { NextResponse } from 'next/server'
import type { AStarHeapNode, AStarScoreMap, AStarPredecessorMap, AStarHeap, AStarAlgoStep, AStarAdjListElement, AStarGraphNode, AStarInputGraph, AStarInput } from '@/app/types/types'
import { addToHeap, removeFromHeap } from '@/app/utils/heapUtils'

export async function POST(req: Request) {
    const { graph, start, goal } = await req.json()
    const output: AStarAlgoStep[] = []

    // default h function that uses straight line distance
    // allow customization later
    const straightLineDist = (node1: AStarGraphNode, node2: AStarGraphNode) => {
        return Math.pow(Math.pow((node1.coordinate.x - node2.coordinate.x), 2) + Math.pow((node1.coordinate.y - node2.coordinate.y), 2), 0.5)
    }
    const h = (input: AStarGraphNode, goal: AStarGraphNode) => {
        return straightLineDist(input, goal)
    }
    // const aStar = (graph: AStarInputGraph, start: string | number, end: string | number) {
    const aStar = (graph: AStarInputGraph, start: AStarGraphNode, goal: AStarGraphNode) => {
        // using straight line distance for h by default
        const openSet: AStarHeap = []
        output.push({ line: 1, assignedValue: [...openSet] })

        const cameFrom: AStarPredecessorMap = {}
        output.push({ line: 2, assignedValue: { ...cameFrom } })

        const gScore: AStarScoreMap = {}
        const fScore: AStarScoreMap = {}


        Object.keys(graph.coordinates).forEach((node) => {
            gScore[node] = Number.MAX_VALUE
            fScore[node] = Number.MAX_VALUE
        })
        output.push({ line: 3, assignedValue: gScore })

        gScore[start.name] = 0
        output.push({ line: 4, assignedValue: gScore[start.name] })

        output.push({ line: 5, assignedValue: fScore })
        fScore[start.name] = h(start, goal)
        output.push({ line: 6, assignedValue: fScore })

        while (openSet.length > 0) {
            output.push({ line: 7 })

            const currNode: AStarHeapNode | undefined = removeFromHeap(openSet)
            output.push({ line: 8, assignedValue: currNode })

            if (currNode && currNode.name === goal.name) {
                output.push({ line: 9 })
                // TODO: return constructed path
                output.push({ line: 10, assignedValue: 0 })
                return 0 // or gScore
            }

            if (!currNode) { // heap is empty and pop returned undefined {
                return Number.MAX_VALUE
            }

            output.push({ line: 11, transformedValue: openSet })
            // for each neighbor of current
            for (const neighbor of graph.edges[currNode.name]) {
                output.push({ line: 12, assignedValue: neighbor })

                let distToNeighbor = null
                for (const n of graph.edges[currNode.name]) {
                    if (n.name === neighbor.name) {
                        distToNeighbor = straightLineDist(n, neighbor)
                        break
                    }
                }
                if (distToNeighbor === null) // if no neighbor
                    return Number.MAX_VALUE

                const tentG = gScore[currNode.name] + distToNeighbor
                output.push({ line: 13, assignedValue: tentG })

                if (tentG < gScore[neighbor.name]) {
                    output.push({ line: 14 })

                    cameFrom[neighbor.name] = currNode.name
                    output.push({ line: 15, assignedValue: cameFrom })

                    gScore[neighbor.name] = tentG
                    output.push({ line: 16, assignedValue: gScore })

                    fScore[neighbor.name] = tentG + h(neighbor, goal)
                    output.push({ line: 17, assignedValue: fScore })

                    const isNeighborInOpenSet = openSet.some((node) => node.name === neighbor.name)
                    if (!isNeighborInOpenSet) {
                        output.push({ line: 18 })
                        addToHeap(openSet, { name: neighbor.name, fScore: fScore[neighbor.name] })
                        output.push({ line: 19, transformedValue: openSet })
                    }
                }
            }
        }
        output.push({ line: 20 })
        return Number.MAX_VALUE
    }

    aStar(graph, start, goal)
    return NextResponse.json({ steps: output })
}