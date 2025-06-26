import type { AStarHeap, AStarHeapNode } from "../types/types";

// Add a node to the heap
export function addToHeap(heap: AStarHeap, node: AStarHeapNode): void {
    heap.push(node)
    let index = heap.length - 1

    // bubble up to maintain heap property
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2)
        if (heap[parentIndex].fScore > heap[index].fScore) {
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]]
            index = parentIndex
        } else {
            break
        }
    }
}

export function removeFromHeap(heap: AStarHeap): AStarHeapNode | undefined {
    if (heap.length === 0) return undefined

    // get min node and replace by last element in heap, then maintain heap property
    const minNode = heap[0]
    const lastNode = heap.pop()

    if (heap.length > 0 && lastNode) {
        heap[0] = lastNode

        // bubble down to maintain heap property
        let index = 0
        while (true) {
            const leftChildIndex = 2 * index + 1
            const rightChildIndex = 2 * index + 2
            let smallestIndex = index

            if (
                leftChildIndex < heap.length &&
                heap[leftChildIndex].fScore < heap[smallestIndex].fScore
            ) {
                smallestIndex = leftChildIndex;
            }

            if (
                rightChildIndex < heap.length &&
                heap[rightChildIndex].fScore < heap[smallestIndex].fScore
            ) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== index) {
                [heap[index], heap[smallestIndex]] = [heap[smallestIndex], heap[index]];
                index = smallestIndex;
            } else {
                break;
            }
        }
    }
    return minNode
}
