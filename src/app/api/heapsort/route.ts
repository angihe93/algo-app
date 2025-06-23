import { NextResponse } from 'next/server'
import { AlgoStep, HeapSortInput, HeapSortSwapStep } from '@/app/types/types'

export async function POST(req: Request) {
    const { array }: HeapSortInput = await req.json()
    const output: HeapSortSwapStep[] = []
    const stepsOutput: AlgoStep[] = []
    // heapsort algo
    const heapsort = (array: number[]) => {
        let start = Math.floor(array.length / 2) // start at leaves (trivially heaps)
        stepsOutput.push({ line: 1, assignedValue: start })
        let end = array.length
        stepsOutput.push({ line: 2, assignedValue: end })
        // helper functions
        const leftChildIdx = (idx: number) => 2 * idx + 1
        const rightChildIdx = (idx: number) => 2 * idx + 2
        const parentIdx = (idx: number) => Math.floor((idx - 1) / 2)

        while (end > 1) {
            stepsOutput.push({ line: 3 })
            if (start > 0) {
                stepsOutput.push({ line: 4 })
                start = start - 1
                stepsOutput.push({ line: 5, assignedValue: start })
            }

            else {
                stepsOutput.push({ line: 6 })
                end = end - 1
                stepsOutput.push({ line: 7, assignedValue: end })
                // swap
                output.push({ index1: 0, index2: end, inputArr: [...array] })
                const temp = array[end]
                array[end] = array[0]
                array[0] = temp
                stepsOutput.push({ line: 8, transformedValue: [...array] })
            }
            // siftdown
            let root = start
            stepsOutput.push({ line: 9, assignedValue: root })
            while (leftChildIdx(root) < end) {
                stepsOutput.push({ line: 10 })
                let childIdx = leftChildIdx(root)
                stepsOutput.push({ line: 11, assignedValue: childIdx })
                // if there is right child and that is larger
                if (childIdx + 1 < end && array[childIdx] < array[childIdx + 1]) {
                    stepsOutput.push({ line: 12 })
                    childIdx = childIdx + 1
                    stepsOutput.push({ line: 13, assignedValue: childIdx })
                }

                if (array[root] < array[childIdx]) {
                    stepsOutput.push({ line: 14 })
                    // swap
                    output.push({ index1: root, index2: childIdx, inputArr: [...array] })
                    const temp = array[root]
                    array[root] = array[childIdx]
                    array[childIdx] = temp
                    stepsOutput.push({ line: 15, transformedValue: [...array] })
                    root = childIdx // continue sifting down from child
                    stepsOutput.push({ line: 16, assignedValue: root })
                }
                else {
                    stepsOutput.push({ line: 17 })
                    stepsOutput.push({ line: 18 }) // for break
                    break
                }

            }
        }
    }

    heapsort(array)
    return NextResponse.json({ swapSteps: output, steps: stepsOutput })
}