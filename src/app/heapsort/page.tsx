'use client'

import { useEffect, useState } from "react"
import { AlgoStep, HeapSortInput, HeapSortSwapStep } from "../types/types"

export default function HeapSortPage() {

    const [swapSteps, setSwapSteps] = useState<HeapSortSwapStep[]>([])
    const [steps, setSteps] = useState<AlgoStep[]>([])
    useEffect(() => {
        const fetchHeapSort = async (input: number[]) => {
            const response = await fetch('/api/heapsort', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ array: input })
            })
            const { swapSteps, steps } = await response.json()
            setSwapSteps(swapSteps)
            setSteps(steps)
        }
        fetchHeapSort([7, 4, 3, 9, 1, 2])
    }, [])

    return (
        <div>
            Heap sort page
            <ul>
                {swapSteps.map((step, idx) => (
                    <li key={idx}>{JSON.stringify(step)}</li>
                ))}
            </ul>
            <ul>
                {steps.map((step, idx) => (
                    <li key={idx}>{JSON.stringify(step)}</li>
                ))}
            </ul>
        </div>
    )
}