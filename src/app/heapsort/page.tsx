'use client'

import { JSX, useEffect, useState } from "react"
import { AlgoStep, HeapSortInput, HeapSortSwapStep } from "../types/types"
import { heapsortCode } from "../codeStrings"

export default function HeapSortPage() {

    const [swapSteps, setSwapSteps] = useState<HeapSortSwapStep[]>([])
    const [steps, setSteps] = useState<AlgoStep[]>([])
    const [allFrames, setAllFrames] = useState<JSX.Element[]>([])
    const inputArray = [7, 4, 3, 9, 1, 2]

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

    // iterate thru steps, generate frames that stop just before each swap
    const generateFrames = (steps: AlgoStep[]) => {
        const frames: JSX.Element[] = []
        let currFrame: JSX.Element[] = []
        let nextLine = 0

        for (const step of steps) {
            nextLine = nextLine + 1
            // if (nextLine === heapsortCode.length)
            //     nextLine = 2
            console.log("step", step)
            console.log("nextLine", nextLine)
            // console.log("heapsortLine", heapsortLine)
            console.log("currFrame", [...currFrame])
            console.log("frames", [...frames])

            while (step.line > nextLine) { // just add code string if step doesn't go here
                const heapsortLine = heapsortCode.find((i) => i.stepNum === nextLine)
                console.log("heapsortLine", heapsortLine)
                console.log("currFrame push ", heapsortLine?.codeStr)
                currFrame.push(
                    <li key={nextLine} style={{ paddingLeft: `${(heapsortLine?.indents ?? 0) * 20}px` }}>
                        {heapsortLine?.stepNum}{heapsortLine?.codeStr}
                    </li>)
                nextLine = nextLine + 1
            }

            const heapsortLine = heapsortCode.find((i) => i.stepNum === step.line)
            console.log("heapsortLine", heapsortLine)
            if (step.transformedValue && step.transformedValue.length > 0) {
                console.log("frames push", [...currFrame])
                frames.push(
                    <ul key={frames.length}>
                        {[...currFrame]}
                    </ul>
                )
                currFrame = []
                nextLine = 0
            }

            console.log("currFrame push ", heapsortLine?.codeStr, step.assignedValue, step.transformedValue, !step.assignedValue && !step.transformedValue && '•')
            currFrame.push(
                <li key={step.line} style={{ paddingLeft: `${(heapsortLine?.indents ?? 0) * 20}px` }}>
                    {heapsortLine?.stepNum}{heapsortLine?.codeStr}
                    <span className="text-red-500 ml-2">{step.assignedValue}</span>
                    <span className="text-red-500 ml-2">{step.transformedValue?.join(", ")}</span>
                    <span className="text-red-500 ml-2">{!step.assignedValue && !step.transformedValue && '•'}</span>
                </li>
            )

        }
        console.log("Generated frames:", [...frames])
        setAllFrames(frames)
    }

    useEffect(() => {
        fetchHeapSort(inputArray)
    }, [])

    useEffect(() => {
        if (steps.length > 0) {
            generateFrames(steps);
        }
    }, [steps])


    return (
        <div>
            Heap sort page
            <div className="flex gap-2 justify-center text-left">
                <ul>
                    {heapsortCode.map((line, idx) => (
                        <li key={idx} style={{ paddingLeft: `${line.indents * 20}px` }}>
                            {line.codeStr}
                            {/* {steps.find((i) => i.line === 1)?.assignedValue} */}
                        </li>
                    ))}
                    <p className="mt-2 text-sm">(pseudocode from https://en.wikipedia.org/wiki/Heapsort#Standard_implementation)</p>
                </ul>

                <div>
                    <div>input: {inputArray.join(", ")}</div>
                    {allFrames.map((frame, idx) => (
                        <div key={idx}>
                            <h3>Frame {idx + 1}</h3>
                            {frame}
                        </div>
                    ))}
                </div>

                <ul>
                    {steps.map((step, idx) => (
                        <li key={idx}>{JSON.stringify(step)}</li>
                    ))}
                </ul>



            </div>
        </div>
    )
}
